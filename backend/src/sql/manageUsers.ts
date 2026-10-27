import { Prisma, type Role } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

/** User directory query: include the account's assigned team in one database round trip. */
export async function listManagedUsers(actorRole: Role) {
  return prisma.$queryRaw<Array<{
    id: string;
    name: string;
    firstName: string | null;
    lastName: string | null;
    middleInitial: string | null;
    suffix: string | null;
    username: string;
    profileImageUrl: string | null;
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
      u."firstName",
      u."lastName",
      u."middleInitial",
      u."suffix",
      u."username",
      u."profileImageUrl",
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
    WHERE ${actorRole !== "DEPARTMENT_HEAD"} OR u."role" <> 'SUPER_ADMIN'::"Role"
    ORDER BY u."createdAt" DESC, u."name" ASC
  `);
}

/** Lock active Super Admin rows while role or account-status changes are checked. */
export async function lockSuperAdminChanges(transaction: Prisma.TransactionClient) {
  await transaction.$queryRaw<Array<{ user_id: string }>>(Prisma.sql`
    SELECT "user_id"::text AS user_id
    FROM "User"
    WHERE "role" = 'SUPER_ADMIN'::"Role"
      AND "isActive" = true
    ORDER BY "user_id"
    FOR UPDATE
  `);
}
