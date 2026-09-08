import { prisma } from "@/lib/prisma"
import { ConflictError, NotFoundError } from "@/shared/errors";
import type { CreateUserInput, ResetPasswordInput, UpdateUserInput } from "@/types/user.types";
import { hashPassword, toSafeUser } from "@/utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

export const userService = {
    async findAll() {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "desc"}
        });

        return users.map(toSafeUser)
    },

    async findById(userId: string) {
        const user = await prisma.user.findUnique({
            where: { user_id: userId }
        });

        if(!user) throw new NotFoundError("User", userId)
        return toSafeUser(user)
    },

    async create(data: CreateUserInput) {
        const hashedPassword = await hashPassword(data.password)

        try {
            const user = await prisma.user.create({
                data: {
                    name: data.name,
                    username: data.username,
                    passwordHash: String(hashedPassword),
                    role: data.role
                }
            });
            return toSafeUser(user)
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
                throw new ConflictError(`Username ${data.username} already exists.`)
            }
            throw err;
        }
    },

    async update(userId: string, data: UpdateUserInput) {
        await this.findById(userId)

        try {
            const filteredData = Object.fromEntries(
                Object.entries(data).filter(([, value]) => value !== undefined)
            );

            const user = await prisma.user.update({
                where: { user_id: userId },
                data: filteredData
            })
            return toSafeUser(user)
        } catch (err) {
            
        }
    },

    async resetPassword(userId: string, data: ResetPasswordInput) {
        await this.findById(userId)
        const hashedPassword = await hashPassword(data.newPassword)
        await prisma.user.update({
            where: { user_id: userId },
            data: { passwordHash: String(hashedPassword)}
        });

        return { success: true }
    },

    async delete(userId: string) {
        await this.findById(userId)
        await prisma.user.delete({
            where: { user_id: userId }
        })

        return { success: true }
    }
}