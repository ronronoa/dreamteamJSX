import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type { ActivityLogInput, ActivityLogsQuery } from "@/types/activityLogs.types";

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
}

export interface ActivityOverview {
  totalCount: number;
  todayCount: number;
  activeUserCount: number;
  importantActionCount: number;
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
      actor_name: actor?.name ?? "Unauthenticated user",
      actor_username: actor?.username ?? null,
      actor_role: actor?.role ?? null,
      module: data.module,
      action: data.action,
      record_id: data.recordId,
      status: data.status,
      details: data.details,
    },
  });
}

export async function listActivityLogs(query: ActivityLogsQuery) {
  const offset = (query.page - 1) * query.pageSize;
  const [rows, statsRows] = await Promise.all([
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
        COALESCE(log."details", '') AS details
      FROM "ActivityLog" AS log
      WHERE log."archivedAt" IS NULL
      ORDER BY log."createdAt" DESC, log."activity_id" DESC
      LIMIT ${query.pageSize}
      OFFSET ${offset}
    `,
    prisma.$queryRaw<ActivityOverview[]>`
      SELECT
        COUNT(*)::int AS "totalCount",
        COUNT(*) FILTER (
          WHERE log."createdAt" >= date_trunc('day', CURRENT_TIMESTAMP)
        )::int AS "todayCount",
        COUNT(DISTINCT log."actor_id") FILTER (
          WHERE log."createdAt" >= date_trunc('day', CURRENT_TIMESTAMP)
            AND users."isActive" = true
        )::int AS "activeUserCount",
        COUNT(*) FILTER (
          WHERE log."createdAt" >= date_trunc('day', CURRENT_TIMESTAMP)
            AND log."module" IN ('Users', 'Authentication')
        )::int AS "importantActionCount"
      FROM "ActivityLog" AS log
      LEFT JOIN "User" AS users ON users."user_id" = log."actor_id"
      WHERE log."archivedAt" IS NULL
    `,
  ]);

  return {
    logs: rows,
    stats: statsRows[0] ?? {
      totalCount: 0,
      todayCount: 0,
      activeUserCount: 0,
      importantActionCount: 0,
    },
    page: query.page,
    pageSize: query.pageSize,
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
      COALESCE(log."details", '') AS details
    FROM "ActivityLog" AS log
    WHERE log."archivedAt" IS NULL
    ORDER BY log."createdAt" DESC, log."activity_id" DESC
  `;
}
