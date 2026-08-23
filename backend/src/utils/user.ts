import { User } from "../generated/prisma/client";

export function toSafeUser(user: User) {
    return {
        id: user.user_id,
        name: user.name,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}