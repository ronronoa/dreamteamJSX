import type { CreateUserSchema, ResetPasswordSchema, UpdateOwnProfileSchema, UpdateUserSchema, UserIdParamSchema } from "@/schemas/user.schema"
import type { z } from "zod"

export type CreateUserInput = z.infer<typeof CreateUserSchema>
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>
export type UpdateOwnProfileInput = z.infer<typeof UpdateOwnProfileSchema>
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>
export type UserIdParam = z.infer<typeof UserIdParamSchema>
