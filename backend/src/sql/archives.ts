import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { ConflictError, NotFoundError } from "@/shared/errors";
import type { ArchiveQuery, ArchiveRestoreParams } from "@/types/archives.types";

export interface ArchiveRow {
  id: string;
  archiveId: string;
  sourceId: string;
  archivedDate: Date;
  type: string;
  archivedBy: string;
  record: string;
  details: string;
  sourceType: string;
}

export interface ArchiveCountRow {
  totalCount: number;
  operationCount: number;
  patientCount: number;
  vehicleCount: number;
  inventoryCount: number;
  activityCount: number;
}

const ARCHIVE_RECORDS_SQL = Prisma.sql`
  WITH archived_records AS (
    SELECT
      operation."operation_id" AS id,
      operationArchive."archive_id" AS "archiveId",
      operation."operation_id" AS "sourceId",
      operationArchive."archivedAt" AS "archivedDate",
      'Operation Log'::text AS type,
      archiver."name" AS "archivedBy",
      COALESCE(operation."nature_of_operation", 'Operation report') AS record,
      COALESCE(operation."event_description", '') AS details,
      'operation'::text AS "sourceType"
    FROM "OperationLogArchive" AS operationArchive
    JOIN "OperationLog" AS operation ON operation."operation_id" = operationArchive."operation_id"
    JOIN "User" AS archiver ON archiver."user_id" = operationArchive."archived_by"

    UNION ALL

    SELECT
      patientLog."patient_log_id",
      patientArchive."archive_id",
      patientLog."patient_log_id",
      patientArchive."archivedAt",
      'Patient Log'::text,
      archiver."name",
      patient."full_name" || ' — ' || REPLACE(patientLog."type_of_request"::text, '_', ' '),
      COALESCE(patientLog."medical_assessment", ''),
      'patient'::text
    FROM "PatientLogArchive" AS patientArchive
    JOIN "PatientLog" AS patientLog ON patientLog."patient_log_id" = patientArchive."patient_log_id"
    JOIN "Patient" AS patient ON patient."patient_id" = patientLog."patient_id"
    JOIN "User" AS archiver ON archiver."user_id" = patientArchive."archived_by"

    UNION ALL

    SELECT
      dispatch."dispatch_id",
      dispatchArchive."archive_id",
      dispatch."dispatch_id",
      dispatchArchive."archivedAt",
      'Vehicle Log'::text,
      archiver."name",
      COALESCE(vehicle."vehicle_name", 'Vehicle dispatch') ||
        COALESCE(' — ' || dispatch."from_location" || ' to ' || dispatch."to_location", ''),
      COALESCE(dispatch."dispatch_type"::text, 'Dispatch'),
      'vehicle'::text
    FROM "VehicularDispatchArchive" AS dispatchArchive
    JOIN "VehicularDispatch" AS dispatch ON dispatch."dispatch_id" = dispatchArchive."dispatch_id"
    LEFT JOIN "Vehicle" AS vehicle ON vehicle."vehicle_id" = dispatch."vehicle_id"
    JOIN "User" AS archiver ON archiver."user_id" = dispatchArchive."archived_by"

    UNION ALL

    SELECT
      item."item_code",
      inventoryArchive."archive_id",
      item."item_id",
      inventoryArchive."archivedAt",
      'Inventory Item'::text,
      archiver."name",
      item."item_name",
      item."item_code" || ' · ' || item."category" || ' · ' || item."stock_quantity"::text || ' ' || item."unit",
      'inventory'::text
    FROM "InventoryArchive" AS inventoryArchive
    JOIN "InventoryItem" AS item ON item."item_id" = inventoryArchive."item_id"
    JOIN "User" AS archiver ON archiver."user_id" = inventoryArchive."archived_by"

    UNION ALL

    SELECT
      activity."activity_code",
      activity."activity_id",
      activity."activity_id",
      activity."archivedAt",
      'Activity Log'::text,
      COALESCE(archiver."name", 'Unknown user'),
      activity."action",
      COALESCE(activity."details", activity."module"),
      'activity'::text
    FROM "ActivityLog" AS activity
    LEFT JOIN "User" AS archiver ON archiver."user_id" = activity."archived_by"
    WHERE activity."archivedAt" IS NOT NULL
  )
`;

export async function listArchivedRecords(query: ArchiveQuery) {
  const offset = (query.page - 1) * query.pageSize;
  const search = `%${query.search}%`;

  const [records, counts, matchingCounts] = await Promise.all([
    prisma.$queryRaw<ArchiveRow[]>(Prisma.sql`
      ${ARCHIVE_RECORDS_SQL}
      SELECT *
      FROM archived_records
      WHERE (
        ${query.search} = ''
        OR id ILIKE ${search}
        OR type ILIKE ${search}
        OR "archivedBy" ILIKE ${search}
        OR record ILIKE ${search}
        OR details ILIKE ${search}
      )
        AND (${query.sourceType} = 'all' OR "sourceType" = ${query.sourceType})
      ORDER BY "archivedDate" DESC, id DESC
      LIMIT ${query.pageSize}
      OFFSET ${offset}
    `),
    prisma.$queryRaw<ArchiveCountRow[]>(Prisma.sql`
      ${ARCHIVE_RECORDS_SQL}
      SELECT
        COUNT(*)::int AS "totalCount",
        COUNT(*) FILTER (WHERE type = 'Operation Log')::int AS "operationCount",
        COUNT(*) FILTER (WHERE type = 'Patient Log')::int AS "patientCount",
        COUNT(*) FILTER (WHERE type = 'Vehicle Log')::int AS "vehicleCount",
        COUNT(*) FILTER (WHERE type = 'Inventory Item')::int AS "inventoryCount",
        COUNT(*) FILTER (WHERE type = 'Activity Log')::int AS "activityCount"
      FROM archived_records
    `),
    prisma.$queryRaw<Array<{ count: number }>>(Prisma.sql`
      ${ARCHIVE_RECORDS_SQL}
      SELECT COUNT(*)::int AS count
      FROM archived_records
      WHERE (
        ${query.search} = ''
        OR id ILIKE ${search}
        OR type ILIKE ${search}
        OR "archivedBy" ILIKE ${search}
        OR record ILIKE ${search}
        OR details ILIKE ${search}
      )
        AND (${query.sourceType} = 'all' OR "sourceType" = ${query.sourceType})
    `),
  ]);

  return {
    records,
    totalMatching: matchingCounts[0]?.count ?? 0,
    stats: counts[0] ?? {
      totalCount: 0,
      operationCount: 0,
      patientCount: 0,
      vehicleCount: 0,
      inventoryCount: 0,
      activityCount: 0,
    },
    page: query.page,
    pageSize: query.pageSize,
  };
}

export async function restoreArchivedRecord({ type, id }: ArchiveRestoreParams) {
  switch (type) {
    case "operation": {
      const result = await prisma.operationLogArchive.deleteMany({ where: { operation_id: id } });
      if (result.count === 0) throw new NotFoundError("Archived operation", id);
      return;
    }
    case "patient": {
      const result = await prisma.patientLogArchive.deleteMany({ where: { patient_log_id: id } });
      if (result.count === 0) throw new NotFoundError("Archived patient log", id);
      return;
    }
    case "vehicle": {
      const result = await prisma.vehicularDispatchArchive.deleteMany({ where: { dispatch_id: id } });
      if (result.count === 0) throw new NotFoundError("Archived vehicle log", id);
      return;
    }
    case "inventory": {
      const result = await prisma.inventoryArchive.deleteMany({ where: { item_id: id } });
      if (result.count === 0) throw new NotFoundError("Archived inventory item", id);
      return;
    }
    case "activity": {
      const result = await prisma.activityLog.updateMany({
        where: { activity_id: id, archivedAt: { not: null } },
        data: { archivedAt: null, archived_by: null },
      });
      if (result.count === 0) throw new NotFoundError("Archived activity log", id);
      return;
    }
  }
}

export async function archiveRecord({ type, id }: ArchiveRestoreParams, actorId: string) {
  switch (type) {
    case "operation": {
      const existing = await prisma.operationLog.findUnique({
        where: { operation_id: id },
        select: { operation_id: true, archive: { select: { archive_id: true } } },
      });
      if (!existing) throw new NotFoundError("Operation log", id);
      if (existing.archive) throw new ConflictError("This operation log is already archived.");
      await prisma.operationLogArchive.create({
        data: { operation_id: id, archived_by: actorId },
      });
      return;
    }
    case "patient": {
      const existing = await prisma.patientLog.findUnique({
        where: { patient_log_id: id },
        select: { patient_log_id: true, archive: { select: { archive_id: true } } },
      });
      if (!existing) throw new NotFoundError("Patient log", id);
      if (existing.archive) throw new ConflictError("This patient log is already archived.");
      await prisma.patientLogArchive.create({
        data: { patient_log_id: id, archived_by: actorId },
      });
      return;
    }
    case "vehicle": {
      const existing = await prisma.vehicularDispatch.findUnique({
        where: { dispatch_id: id },
        select: { dispatch_id: true, archive: { select: { archive_id: true } } },
      });
      if (!existing) throw new NotFoundError("Vehicle dispatch", id);
      if (existing.archive) throw new ConflictError("This vehicle dispatch is already archived.");
      await prisma.vehicularDispatchArchive.create({
        data: { dispatch_id: id, archived_by: actorId },
      });
      return;
    }
    case "inventory": {
      const existing = await prisma.inventoryItem.findUnique({
        where: { item_id: id },
        select: { item_id: true, archive: { select: { archive_id: true } } },
      });
      if (!existing) throw new NotFoundError("Inventory item", id);
      if (existing.archive) throw new ConflictError("This inventory item is already archived.");
      await prisma.inventoryArchive.create({
        data: { item_id: id, archived_by: actorId },
      });
      return;
    }
    case "activity": {
      const result = await prisma.activityLog.updateMany({
        where: { activity_id: id, archivedAt: null },
        data: { archivedAt: new Date(), archived_by: actorId },
      });
      if (result.count === 0) throw new NotFoundError("Activity log", id);
    }
  }
}
