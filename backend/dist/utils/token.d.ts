import { z } from "zod";
import type { Role } from "@/generated/prisma/client";
declare const AccessTokenPayloadSchema: z.ZodObject<{
    userId: z.ZodString;
    role: z.ZodEnum<{
        DEPARTMENT_HEAD: "DEPARTMENT_HEAD";
        DEPUTY: "DEPUTY";
        MEMBER: "MEMBER";
        SUPER_ADMIN: "SUPER_ADMIN";
        TEAM_LEADER: "TEAM_LEADER";
    }>;
}, z.core.$strip>;
declare const RefreshTokenPayloadSchema: z.ZodObject<{
    userId: z.ZodString;
    jti: z.ZodString;
}, z.core.$strip>;
export type AccessTokenPayload = z.infer<typeof AccessTokenPayloadSchema>;
export type RefreshTokenPayload = z.infer<typeof RefreshTokenPayloadSchema>;
export declare function generateAccessToken(payload: {
    userId: string;
    role: Role;
}): string;
export declare function generateRefreshToken(payload: {
    userId: string;
}): string;
export declare function parseAccessToken(token: string): {
    success: true;
    data: AccessTokenPayload;
} | {
    success: false;
    error: Error;
};
export declare function parseRefreshToken(token: string): {
    success: true;
    data: RefreshTokenPayload;
} | {
    success: false;
    error: Error;
};
export {};
//# sourceMappingURL=token.d.ts.map