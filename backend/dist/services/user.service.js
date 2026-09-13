import { prisma } from "@/lib/prisma";
import { ConflictError, NotFoundError } from "@/shared/errors";
import { hashPassword, toSafeUser } from "@/utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
export const userService = {
    async findAll() {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "desc" }
        });
        return users.map(toSafeUser);
    },
    async findById(userId) {
        const user = await prisma.user.findUnique({
            where: { user_id: userId }
        });
        if (!user)
            throw new NotFoundError("User", userId);
        return toSafeUser(user);
    },
    async create(data) {
        const hashedPassword = await hashPassword(data.password);
        try {
            const user = await prisma.user.create({
                data: {
                    name: data.name,
                    username: data.username,
                    passwordHash: String(hashedPassword),
                    role: data.role
                }
            });
            return toSafeUser(user);
        }
        catch (err) {
            if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
                throw new ConflictError(`Username ${data.username} already exists.`);
            }
            throw err;
        }
    },
    async update(userId, data) {
        await this.findById(userId);
        try {
            const filteredData = Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined));
            const user = await prisma.user.update({
                where: { user_id: userId },
                data: filteredData
            });
            return toSafeUser(user);
        }
        catch (err) {
            if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
                throw new ConflictError(`Username ${data.username} already exists.`);
            }
            throw err;
        }
    },
    async resetPassword(userId, data) {
        await this.findById(userId);
        const hashedPassword = await hashPassword(data.newPassword);
        await prisma.user.update({
            where: { user_id: userId },
            data: { passwordHash: String(hashedPassword) }
        });
        return { success: true };
    },
    async delete(userId) {
        await this.findById(userId);
        await prisma.user.delete({
            where: { user_id: userId }
        });
        return { success: true };
    }
};
//# sourceMappingURL=user.service.js.map