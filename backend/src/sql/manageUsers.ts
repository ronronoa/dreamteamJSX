import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

/** User directory query: include the account's assigned team in one database round trip. */
export async function listManagedUsers() {
  return prisma.$queryRaw<Array<{
    id: string;
    name: string;
    username: string;
    email: string | null;
    role: string;
    phone: string | null;
    isActive: boolean;
    team_id: string | null;
    team_name: string | null;
    createdAt: Date;
    updatedAt: Date;
  }>>(Prisma.sql`
    SELECT
      u."user_id" AS id,
      u."name",
      u."username",
      u."email",
      u."role"::text AS role,
      u."phone",
      u."isActive",
      u."team_id",
      t."team_name",
      u."createdAt",
      u."updatedAt"
    FROM "User" u
    LEFT JOIN "ResponseTeam" t ON t."team_id" = u."team_id"
    ORDER BY u."createdAt" DESC, u."name" ASC
  `);
}
