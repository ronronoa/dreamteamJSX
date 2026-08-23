import { z } from "zod"

export const SignUpSchema = z.object({
    name: z.string().min(1).max(50),
    username: z.string(),
    password: z.string().min(8).max(64),
})

export const SignInSchema = z.object({
    username: z.string().min(1).max(50),
    password: z.string().min(8).max(64),
})

export const RefreshTokenSchema = z.object({
    refreshToken: z.string().min(1)
})