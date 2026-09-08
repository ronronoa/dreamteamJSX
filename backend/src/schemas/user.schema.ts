import { z } from "zod"

const RoleEnum = z.enum(["SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY", "TEAM_LEADER", "MEMBER"]);

export const CreateUserSchema = z.object({
    name: z.string().min(1).max(50),
    username: z.string().min(1).max(50),
    password: z.string().min(8).max(64),
    role: RoleEnum.default("MEMBER")
})

export const UpdateUserSchema = z.object({
    name: z.string().min(1).max(50).optional(),
    username: z.string().min(1).max(50).optional(),
    role: RoleEnum.optional()
})

export const ResetPasswordSchema = z.object({
    newPassword: z.string().min(8).max(64)
})

export const UserIdParamSchema = z.object({
    id: z.string().uuid()
})