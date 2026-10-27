import { z } from "zod"

export const SignUpSchema = z.object({
    name: z.string().trim().min(1).max(50),
    username: z.string().trim().min(3).max(50).regex(/^[a-zA-Z0-9._-]+$/),
    email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()).optional(),
    password: z.string().min(8).max(64),
})

export const SignInSchema = z.object({
    identifier: z.string().trim().min(1).max(254),
    // Default passwords follow the surname, which can be shorter than eight characters.
    password: z.string().min(1).max(200),
})

export const RefreshTokenSchema = z.object({
    refreshToken: z.string().min(1)
});

export const ChangePasswordSchema = z.object({
    currentPassword: z.string().min(1).max(200),
    newPassword: z.string().min(8).max(64),
}).refine((data) => data.currentPassword !== data.newPassword, {
    path: ["newPassword"],
    message: "New password must be different from the current password",
});

export const RequestPasswordResetSchema = z.object({
    email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()),
});

export const CompletePasswordResetSchema = z.object({
    email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()),
    code: z.string().trim().regex(/^\d{6}$/, "Enter the 6-digit verification code."),
    newPassword: z.string().min(8, "Password must be at least 8 characters.").max(64),
    confirmPassword: z.string().min(1, "Confirm your new password."),
}).refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
});
