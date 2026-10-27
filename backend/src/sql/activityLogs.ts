import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type { ActivityLogInput, ActivityLogsQuery } from "@/types/activityLogs.types";

const ACTIVITY_TIME_ZONE = "Asia/Manila";

export interface ActivityLogRow {
  id: string;
  date: Date;
  user: string;
  userId: string;
  role: string;
  module: string;
  action: string;
  recordId: string | null;
  status: "Success" | "Failed" | "Warning";
  details: string;
  pinType: string | null;
  pinOwnerId: string | null;
  pinOwnerName: string | null;
  pinOwnerRole: string | null;
}

export interface ActivityOverview {
  totalCount: number;
  todayCount: number;
  currentActiveCount: number;
  loggedInTodayCount: number;
  importantActionCount: number;
}

function buildActivityLogConditions(query: ActivityLogsQuery) {
  const conditions: Prisma.Sql[] = [
    Prisma.sql`log."archivedAt" IS NULL`,
    Prisma.sql`log."actor_name" <> 'Unauthenticated user'`,
  ];

  if (query.search) {
    const searchPattern = `%${query.search}%`;
    const searchableFields = [
      Prisma.sql`log."activity_code" ILIKE ${searchPattern}`,
      Prisma.sql`log."actor_name" ILIKE ${searchPattern}`,
      Prisma.sql`COALESCE(log."actor_username", '') ILIKE ${searchPattern}`,
      Prisma.sql`COALESCE(log."actor_id"::text, '') ILIKE ${searchPattern}`,
      Prisma.sql`COALESCE(log."actor_role"::text, '') ILIKE ${searchPattern}`,
      Prisma.sql`log."module" ILIKE ${searchPattern}`,
      Prisma.sql`log."action" ILIKE ${searchPattern}`,
      Prisma.sql`COALESCE(log."record_id", '') ILIKE ${searchPattern}`,
      Prisma.sql`log."status" ILIKE ${searchPattern}`,
      Prisma.sql`COALESCE(log."details", '') ILIKE ${searchPattern}`,
      Prisma.sql`COALESCE(log."pin_type"::text, '') ILIKE ${searchPattern}`,
      Prisma.sql`COALESCE(log."pin_owner_id", '') ILIKE ${searchPattern}`,
      Prisma.sql`COALESCE(log."pin_owner_name", '') ILIKE ${searchPattern}`,
      Prisma.sql`COALESCE(log."pin_owner_role", '') ILIKE ${searchPattern}`,
    ];
    conditions.push(Prisma.sql`(${Prisma.join(searchableFields, " OR ")})`);
  }

  if (query.module) conditions.push(Prisma.sql`log."module" = ${query.module}`);
  if (query.role) conditions.push(Prisma.sql`COALESCE(log."actor_role"::text, 'Unknown') = ${query.role}`);
  if (query.status) conditions.push(Prisma.sql`log."status" = ${query.status}`);
  if (query.from) {
    conditions.push(Prisma.sql`log."createdAt" >= (${query.from}::date::timestamp AT TIME ZONE ${ACTIVITY_TIME_ZONE})`);
  }
  if (query.to) {
    conditions.push(Prisma.sql`log."createdAt" < ((${query.to}::date + 1)::timestamp AT TIME ZONE ${ACTIVITY_TIME_ZONE})`);
  }

  return Prisma.join(conditions, " AND ");
}

async function getNextActivityCode() {
  const rows = await prisma.$queryRaw<Array<{ sequence_value: string }>>(Prisma.sql`
    SELECT nextval('"ActivityLogCode_seq"')::text AS sequence_value
  `);
  const sequenceValue = rows[0]?.sequence_value;
  if (!sequenceValue) throw new Error("Could not generate an activity log code.");
  return `ACT-${sequenceValue.padStart(6, "0")}`;
}

export async function createActivityLog(data: ActivityLogInput) {
  const activityCode = await getNextActivityCode();
  const actor = data.actorId
    ? await prisma.user.findUnique({
        where: { user_id: data.actorId },
        select: { user_id: true, name: true, username: true, role: true },
      })
    : null;

  return prisma.activityLog.create({
    data: {
      activity_code: activityCode,
      actor_id: actor?.user_id ?? null,
      actor_name: actor?.name ?? data.actorName ?? "Unauthenticated user",
      actor_username: actor?.username ?? null,
      actor_role: actor?.role ?? null,
      module: data.module,
      action: data.action,
      record_id: data.recordId,
      status: data.status,
      details: data.details,
      pin_type: data.pinType ?? null,
      pin_owner_id: data.pinOwnerId ?? null,
      pin_owner_name: data.pinOwnerName ?? null,
      pin_owner_role: data.pinOwnerRole ?? null,
    },
  });
}

export async function listActivityLogs(query: ActivityLogsQuery) {
  const offset = (query.page - 1) * query.pageSize;
  const filteredConditions = buildActivityLogConditions(query);
  const [rows, statsRows, matchingRows] = await Promise.all([
    prisma.$queryRaw<ActivityLogRow[]>`
      SELECT
        log."activity_code" AS id,
        log."createdAt" AS date,
        log."actor_name" AS "user",
        COALESCE(log."actor_username", log."actor_id", '—') AS "userId",
        COALESCE(log."actor_role"::text, 'Unknown') AS role,
        log."module",
        log."action",
        log."record_id" AS "recordId",
        log."status",
        COALESCE(log."details", '') AS details,
        log."pin_type" AS "pinType",
        log."pin_owner_id" AS "pinOwnerId",
        log."pin_owner_name" AS "pinOwnerName",
        log."pin_owner_role" AS "pinOwnerRole"
      FROM "ActivityLog" AS log
      WHERE ${filteredConditions}
      ORDER BY log."createdAt" DESC, log."activity_id" DESC
      LIMIT ${query.pageSize}
      OFFSET ${offset}
    `,
    prisma.$queryRaw<ActivityOverview[]>`
      WITH local_day AS (
        SELECT (CURRENT_TIMESTAMP AT TIME ZONE ${ACTIVITY_TIME_ZONE})::date AS day
      ), utc_day_bounds AS (
        SELECT
          (day::timestamp AT TIME ZONE ${ACTIVITY_TIME_ZONE}) AT TIME ZONE 'UTC' AS starts_at,
          ((day + 1)::timestamp AT TIME ZONE ${ACTIVITY_TIME_ZONE}) AT TIME ZONE 'UTC' AS ends_at
        FROM local_day
      )
      SELECT
        COUNT(*)::int AS "totalCount",
        COUNT(*) FILTER (
          WHERE log."createdAt" >= bounds.starts_at
            AND log."createdAt" < bounds.ends_at
        )::int AS "todayCount",
        COUNT(DISTINCT log."actor_id") FILTER (
          WHERE log."createdAt" >= bounds.starts_at
            AND log."createdAt" < bounds.ends_at
            AND log."module" = 'Authentication'
            AND log."action" IN ('Signed in', 'Created account')
        )::int AS "loggedInTodayCount",
        COUNT(DISTINCT log."actor_id") FILTER (
          WHERE log."createdAt" >= bounds.starts_at
            AND log."createdAt" < bounds.ends_at
            AND log."module" = 'Authentication'
            AND log."action" IN ('Signed in', 'Created account')
            AND users."isActive" = true
            AND users."last_active_at" >= (CURRENT_TIMESTAMP AT TIME ZONE 'UTC') - INTERVAL '30 minutes'
        )::int AS "currentActiveCount",
        COUNT(*) FILTER (
          WHERE log."createdAt" >= bounds.starts_at
            AND log."createdAt" < bounds.ends_at
            AND log."module" IN ('Users', 'Authentication')
        )::int AS "importantActionCount"
      FROM "ActivityLog" AS log
      LEFT JOIN "User" AS users ON users."user_id" = log."actor_id"
      CROSS JOIN utc_day_bounds AS bounds
      WHERE log."archivedAt" IS NULL
        AND log."actor_name" <> 'Unauthenticated user'
    `,
    prisma.$queryRaw<Array<{ count: number }>>`
      SELECT COUNT(*)::int AS count
      FROM "ActivityLog" AS log
      WHERE ${filteredConditions}
    `,
  ]);

  return {
    logs: rows,
    stats: statsRows[0] ?? {
      totalCount: 0,
      todayCount: 0,
      currentActiveCount: 0,
      loggedInTodayCount: 0,
      importantActionCount: 0,
    },
    page: query.page,
    pageSize: query.pageSize,
    totalMatchingCount: matchingRows[0]?.count ?? 0,
  };
}

export async function archiveActivityLogs(actorId: string) {
  return prisma.$transaction(async (transaction) => {
    const archived = await transaction.activityLog.updateMany({
      where: { archivedAt: null },
      data: { archivedAt: new Date(), archived_by: actorId },
    });

    if (archived.count > 0) {
      const codeRows = await transaction.$queryRaw<Array<{ sequence_value: string }>>(Prisma.sql`
        SELECT nextval('"ActivityLogCode_seq"')::text AS sequence_value
      `);
      const sequenceValue = codeRows[0]?.sequence_value;
      if (!sequenceValue) throw new Error("Could not generate an activity log code.");

      const actor = await transaction.user.findUnique({
        where: { user_id: actorId },
        select: { user_id: true, name: true, username: true, role: true },
      });
      await transaction.activityLog.create({
        data: {
          activity_code: `ACT-${sequenceValue.padStart(6, "0")}`,
          actor_id: actor?.user_id ?? null,
          actor_name: actor?.name ?? "System",
          actor_username: actor?.username ?? null,
          actor_role: actor?.role ?? null,
          module: "System",
          action: "Archived activity ledger",
          status: "Success",
          details: `Archived ${archived.count} activity log entries.`,
        },
      });
    }

    return archived;
  });
}

export async function exportActivityLogs() {
  return prisma.$queryRaw<ActivityLogRow[]>`
    SELECT
      log."activity_code" AS id,
      log."createdAt" AS date,
      log."actor_name" AS "user",
      COALESCE(log."actor_username", log."actor_id", '—') AS "userId",
      COALESCE(log."actor_role"::text, 'Unknown') AS role,
      log."module",
      log."action",
      log."record_id" AS "recordId",
      log."status",
      COALESCE(log."details", '') AS details,
      log."pin_type" AS "pinType",
      log."pin_owner_id" AS "pinOwnerId",
      log."pin_owner_name" AS "pinOwnerName",
      log."pin_owner_role" AS "pinOwnerRole"
    FROM "ActivityLog" AS log
    WHERE log."archivedAt" IS NULL
      AND log."actor_name" <> 'Unauthenticated user'
    ORDER BY log."createdAt" DESC, log."activity_id" DESC
  `;
}
