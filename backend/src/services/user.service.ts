import { prisma } from "@/lib/prisma"
import { ConflictError, NotFoundError } from "@/shared/errors";
import type { CreateUserInput, ResetPasswordInput, UpdateUserInput } from "@/types/user.types";
import { hashPassword, toSafeUser } from "@/utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { listManagedUsers, lockSuperAdminChanges } from "@/sql/manageUsers";
import type { Prisma } from "@/generated/prisma/client";

export const userService = {
    async findAll() {
        return listManagedUsers()
    },

    async findById(userId: string) {
        const user = await prisma.user.findUnique({
            where: { user_id: userId }
        });

        if(!user) throw new NotFoundError("User", userId)
        return toSafeUser(user)
    },

    async findProfile(userId: string) {
        const user = await prisma.user.findUnique({
            where: { user_id: userId },
            include: { team: { select: { team_name: true } } },
        });
        if (!user) throw new NotFoundError("User", userId);
        return {
            ...toSafeUser(user),
            team_name: user.team?.team_name ?? null,
        };
    },

    async updateProfileImage(userId: string, profileImageUrl: string) {
        const user = await prisma.user.update({
            where: { user_id: userId },
            data: { profileImageUrl },
            select: { profileImageUrl: true },
        });
        return user.profileImageUrl;
    },

    async updateOwnProfile(userId: string, data: import("@/types/user.types").UpdateOwnProfileInput) {
        try {
            await prisma.user.update({
                where: { user_id: userId },
                data: {
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    ...(data.phone !== undefined && { phone: data.phone }),
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
                throw new ConflictError("That username or email is already in use.");
            }
            throw error;
        }
        return this.findProfile(userId);
    },

    async create(data: CreateUserInput) {
        const hashedPassword = await hashPassword(data.password)
        if (data.team_id) {
            const team = await prisma.responseTeam.findUnique({ where: { team_id: data.team_id } });
            if (!team) throw new NotFoundError("Response team", data.team_id);
        }

        try {
            const user = await prisma.user.create({
                data: {
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    passwordHash: String(hashedPassword),
                    role: data.role,
                    ...(data.phone !== undefined && { phone: data.phone }),
                    isActive: data.isActive,
                    ...(data.team_id && { team: { connect: { team_id: data.team_id } } }),
                }
            });
            return toSafeUser(user)
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
                throw new ConflictError("Username or email is already in use.")
            }
            throw err;
        }
    },

    async update(userId: string, data: UpdateUserInput, actorId: string) {
        if (data.team_id) {
            const team = await prisma.responseTeam.findUnique({ where: { team_id: data.team_id } });
            if (!team) throw new NotFoundError("Response team", data.team_id);
        }

        try {
            const filteredData = Object.fromEntries(
                Object.entries(data).filter(([, value]) => value !== undefined)
            );

            const user = await prisma.$transaction(async (transaction) => {
                if (data.role !== undefined || data.isActive !== undefined) {
                    await lockSuperAdminChanges(transaction);
                }

                const existing = await transaction.user.findUnique({ where: { user_id: userId } });
                if (!existing) throw new NotFoundError("User", userId);
                if (userId === actorId && data.isActive === false) {
                    throw new ConflictError("You cannot deactivate your own account.");
                }

                const removingActiveSuperAdmin = existing.role === "SUPER_ADMIN" && existing.isActive && (
                    data.role !== undefined && data.role !== "SUPER_ADMIN" || data.isActive === false
                );
                if (removingActiveSuperAdmin) {
                    await this.ensureAnotherActiveSuperAdmin(userId, transaction);
                }

                return transaction.user.update({
                    where: { user_id: userId },
                    data: filteredData,
                });
            });
            return toSafeUser(user)
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
                throw new ConflictError("Username or email is already in use.")
            }
            throw err;
        }
    },

    async resetPassword(userId: string, data: ResetPasswordInput) {
        await this.findById(userId)
        const hashedPassword = await hashPassword(data.newPassword)
        await prisma.user.update({
            where: { user_id: userId },
            data: { passwordHash: String(hashedPassword)}
        });
        await prisma.refreshToken.deleteMany({ where: { userId } });

        return { success: true }
    },

    async deactivate(userId: string, actorId: string) {
        await prisma.$transaction(async (transaction) => {
            await lockSuperAdminChanges(transaction);
            const user = await transaction.user.findUnique({ where: { user_id: userId } });
            if (!user) throw new NotFoundError("User", userId);
            if (userId === actorId) throw new ConflictError("You cannot deactivate your own account.");
            if (user.role === "SUPER_ADMIN" && user.isActive) {
                await this.ensureAnotherActiveSuperAdmin(userId, transaction);
            }
            await transaction.user.update({ where: { user_id: userId }, data: { isActive: false } });
        });
        return { success: true };
    },

    async ensureAnotherActiveSuperAdmin(
        excludedUserId: string,
        database: Pick<Prisma.TransactionClient, "user"> = prisma,
    ) {
        const count = await database.user.count({
            where: { role: "SUPER_ADMIN", isActive: true, user_id: { not: excludedUserId } },
        });
        if (count === 0) throw new ConflictError("At least one active Super Admin account must remain.");
    }
}
