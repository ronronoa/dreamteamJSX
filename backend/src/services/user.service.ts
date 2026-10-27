import { pinService } from "./pin.service";
import { prisma } from "@/lib/prisma"
import { ConflictError, ForbiddenError, NotFoundError, ValidationError } from "@/shared/errors";
import type { CreateUserInput, ResetPasswordInput, UpdateUserInput } from "@/types/user.types";
import { hashPassword, toSafeUser } from "@/utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { listManagedUsers, lockSuperAdminChanges } from "@/sql/manageUsers";
import type { Prisma, Role } from "@/generated/prisma/client";

const MAX_PIN_ASSIGNMENT_ATTEMPTS = 5;

export function isPinCollision(error: unknown): boolean {
    if (!(error instanceof PrismaClientKnownRequestError) || error.code !== "P2002") return false;
    const target = error.meta?.["target"];
    if (Array.isArray(target) && target.includes("pinLookupHash")) return true;
    if (typeof target === "string" && target.includes("pinLookupHash")) return true;

    // The PostgreSQL adapter reports constraint fields instead of Prisma's target array.
    const adapterError = error.meta?.["driverAdapterError"] as {
        cause?: { constraint?: { fields?: unknown } };
    } | undefined;
    const fields = adapterError?.cause?.constraint?.fields;
    return Array.isArray(fields) && fields.some((field) =>
        typeof field === "string" && field.replaceAll('"', "") === "pinLookupHash"
    );
}

export const userService = {
    async findAll(actorRole: Role) {
        return listManagedUsers(actorRole)
    },

    async findById(userId: string, actorRole: Role) {
        const user = await prisma.user.findFirst({
            where: {
                user_id: userId,
                ...(actorRole === "DEPARTMENT_HEAD" && { role: { not: "SUPER_ADMIN" } }),
            },
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
        const currentProfile = await this.findProfile(userId);
        const nameChanged = currentProfile.name !== data.name;
        try {
            await prisma.user.update({
                where: { user_id: userId },
                data: {
                    name: data.name,
                    // The profile's full-name editor cannot reliably split a renamed person into parts.
                    ...(nameChanged ? { firstName: null, lastName: null, middleInitial: null, suffix: null } : {}),
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

    async create(data: CreateUserInput, actorRole: Role) {
        if (actorRole === "DEPARTMENT_HEAD" && data.role === "SUPER_ADMIN") {
            throw new ForbiddenError("Department Heads cannot create Super Admin accounts.");
        }

        const lastName = data.lastName.trim();
        if (!lastName) throw new ValidationError("Last name is required to create the default password.");
        const hashedPassword = await hashPassword(lastName.toUpperCase());
        if (data.team_id) {
            const team = await prisma.responseTeam.findFirst({ where: { team_id: data.team_id, isArchived: false } });
            if (!team) throw new NotFoundError("Response team", data.team_id);
        }

        for (let attempt = 0; attempt < MAX_PIN_ASSIGNMENT_ATTEMPTS; attempt += 1) {
          const generatedPin = data.role === "MEMBER" ? null : await pinService.generatePin();
          const pinCredentials = generatedPin ? await pinService.preparePin(generatedPin) : {};
          try {
            const user = await prisma.user.create({
                data: {
                    name: data.firstName ? [data.firstName, data.middleInitial ? `${data.middleInitial}.` : "", data.lastName, data.suffix].filter(Boolean).join(" ") : data.name,
                    ...(data.firstName !== undefined && { firstName: data.firstName }),
                    ...(data.lastName !== undefined && { lastName: data.lastName }),
                    ...(data.middleInitial !== undefined && { middleInitial: data.middleInitial }),
                    ...(data.suffix !== undefined && { suffix: data.suffix }),
                    username: data.username,
                    email: data.email ?? null,
                    passwordHash: hashedPassword,
                    mustChangePassword: true,
                    ...pinCredentials,
                    role: data.role,
                    ...(data.phone !== undefined && { phone: data.phone }),
                    isActive: data.isActive,
                    ...(data.team_id && { team: { connect: { team_id: data.team_id } } }),
                }
            });
            return { user: toSafeUser(user), generatedPin };
          } catch (err) {
            if (isPinCollision(err)) continue;
            if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
                throw new ConflictError("Username or email is already in use.");
            }
            throw err;
          }
        }
        throw new ConflictError("Could not assign a unique PIN because another request claimed it. Try again.");
    },

    async update(userId: string, data: UpdateUserInput, actorId: string, actorRole: Role) {
        if (data.team_id) {
            const team = await prisma.responseTeam.findFirst({ where: { team_id: data.team_id, isArchived: false } });
            if (!team) throw new NotFoundError("Response team", data.team_id);
        }

        try {
            const { pin, password, ...userData } = data;
            const filteredData = Object.fromEntries(
                Object.entries(userData).filter(([, value]) => value !== undefined)
            );

            const user = await prisma.$transaction(async (transaction) => {
                if (data.role !== undefined || data.isActive !== undefined) {
                    await lockSuperAdminChanges(transaction);
                }

                const existing = await transaction.user.findUnique({ where: { user_id: userId } });
                if (!existing) throw new NotFoundError("User", userId);
                if (actorRole === "DEPARTMENT_HEAD" && (
                    existing.role === "SUPER_ADMIN" || data.role === "SUPER_ADMIN"
                )) {
                    throw new ForbiddenError("Department Heads cannot edit or promote Super Admin accounts.");
                }
                if (userId === actorId && data.isActive === false) {
                    throw new ConflictError("You cannot deactivate your own account.");
                }

                const removingActiveSuperAdmin = existing.role === "SUPER_ADMIN" && existing.isActive && (
                    data.role !== undefined && data.role !== "SUPER_ADMIN" || data.isActive === false
                );
                if (removingActiveSuperAdmin) {
                    await this.ensureAnotherActiveSuperAdmin(userId, transaction);
                }

                const nextRole = data.role ?? existing.role;
                if (nextRole === "MEMBER" && pin) {
                    throw new ValidationError("Members do not have report PINs.");
                }
                const needsGeneratedPin = nextRole !== "MEMBER" && existing.role === "MEMBER";
                const nextPin = needsGeneratedPin ? await pinService.generatePin() : pin;
                const pinCredentials = nextRole === "MEMBER"
                    ? { pinHash: null, pinLookupHash: null, pinEncrypted: null, pinFailedAttempts: 0, pinLockedUntil: null }
                    : nextPin ? await pinService.preparePin(nextPin) : {};
                if (data.firstName !== undefined || data.lastName !== undefined || data.middleInitial !== undefined || data.suffix !== undefined) {
                    const firstName = data.firstName ?? existing.firstName ?? existing.name;
                    const lastName = data.lastName ?? existing.lastName ?? "";
                    const middleInitial = data.middleInitial ?? existing.middleInitial ?? "";
                    const suffix = data.suffix ?? existing.suffix ?? "";
                    filteredData["name"] = [firstName, middleInitial ? `${middleInitial}.` : "", lastName, suffix].filter(Boolean).join(" ");
                }
                const needsPassword = nextRole !== "MEMBER" && !existing.passwordHash;
                if (needsPassword && !password) throw new ValidationError("Set a password when promoting a member to a portal role.");
                const passwordHash = password ? await hashPassword(password) : existing.passwordHash;
                if (passwordHash !== existing.passwordHash) {
                    await transaction.refreshToken.deleteMany({ where: { userId } });
                }
                return transaction.user.update({
                    where: { user_id: userId },
                    data: { ...filteredData, ...pinCredentials, passwordHash },
                });
            });
            return toSafeUser(user)
        } catch (err) {
            if (isPinCollision(err)) throw new ConflictError("This PIN is already assigned to another user. Choose a different four-digit PIN.");
            if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
                throw new ConflictError("Username or email is already in use.")
            }
            throw err;
        }
    },

    async resetPassword(userId: string, data: ResetPasswordInput, actorRole: Role) {
        const targetUser = await prisma.user.findUnique({ where: { user_id: userId } });
        if (!targetUser) throw new NotFoundError("User", userId);
        if (!targetUser.passwordHash) throw new ValidationError("This member has no portal account. Assign a portal role and password first.");
        if (actorRole === "DEPARTMENT_HEAD" && targetUser.role === "SUPER_ADMIN") {
            throw new ForbiddenError("Department Heads cannot edit Super Admin accounts.");
        }
        const hashedPassword = await hashPassword(data.newPassword)
        await prisma.user.update({
            where: { user_id: userId },
            data: { passwordHash: String(hashedPassword)}
        });
        await prisma.refreshToken.deleteMany({ where: { userId } });

        return { success: true }
    },

    async deactivate(userId: string, actorId: string, actorRole: Role) {
        await prisma.$transaction(async (transaction) => {
            await lockSuperAdminChanges(transaction);
            const user = await transaction.user.findUnique({ where: { user_id: userId } });
            if (!user) throw new NotFoundError("User", userId);
            if (actorRole === "DEPARTMENT_HEAD" && user.role === "SUPER_ADMIN") {
                throw new ForbiddenError("Department Heads cannot edit Super Admin accounts.");
            }
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
