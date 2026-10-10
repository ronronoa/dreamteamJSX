import { z } from "zod"

export const SignUpSchema = z.object({
    name: z.string().trim().min(1).max(50),
    username: z.string().trim().min(3).max(50).regex(/^[a-zA-Z0-9._-]+$/),
    email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()).optional(),
    password: z.string().min(8).max(64),
})

export const SignInSchema = z.object({
    identifier: z.string().trim().min(1).max(254),
    password: z.string().min(1).max(64),
}).superRefine(({ identifier, password }, context) => {
    const isBootstrapCredential = identifier.toLowerCase() === "root" && password === "root";
    if (password.length < 8 && !isBootstrapCredential) {
        context.addIssue({
            code: "custom",
            path: ["password"],
            message: "Password must be at least 8 characters",
        });
    }
})

export const RefreshTokenSchema = z.object({
    refreshToken: z.string().min(1)
});

export const ChangePasswordSchema = z.object({
    currentPassword: z.string().min(1).max(64),
    newPassword: z.string().min(8).max(64),
}).refine((data) => data.currentPassword !== data.newPassword, {
    path: ["newPassword"],
    message: "New password must be different from the current password",
});
