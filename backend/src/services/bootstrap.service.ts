import { PrismaClientKnownRequestError } from "@/generated/prisma/internal/prismaNamespace";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/utils/password";

const ROOT_USERNAME = "root";
const ROOT_PASSWORD = "root";

/** Create the requested bootstrap account only when no Super Admin exists. */
export async function ensureSuperAdminAccount() {
  const existingSuperAdmin = await prisma.user.findFirst({
    where: { role: "SUPER_ADMIN" },
    select: { user_id: true },
  });
  if (existingSuperAdmin) return;

  const passwordHash = String(await hashPassword(ROOT_PASSWORD));

  try {
    const existingRootUser = await prisma.user.findUnique({
      where: { username: ROOT_USERNAME },
      select: { user_id: true },
    });

    if (existingRootUser) {
      await prisma.user.update({
        where: { user_id: existingRootUser.user_id },
        data: {
          name: ROOT_USERNAME,
          passwordHash,
          role: "SUPER_ADMIN",
          isActive: true,
        },
      });
      console.info("Promoted the existing root account to SUPER_ADMIN.");
      return;
    }

    await prisma.user.create({
      data: {
        name: ROOT_USERNAME,
        username: ROOT_USERNAME,
        passwordHash,
        role: "SUPER_ADMIN",
        isActive: true,
      },
    });
    console.info('Created the initial SUPER_ADMIN account "root".');
  } catch (error) {
    // A second server process may have bootstrapped the account at the same time.
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
      const superAdminCreatedByAnotherProcess = await prisma.user.findFirst({
        where: { role: "SUPER_ADMIN" },
        select: { user_id: true },
      });
      if (superAdminCreatedByAnotherProcess) return;
    }
    throw error;
  }
}
