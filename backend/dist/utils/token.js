import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { env } from "@/config/env";
const AccessTokenPayloadSchema = z.object({
    userId: z.string().uuid(),
    role: z.enum(["SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY", "TEAM_LEADER", "MEMBER"]),
});
const RefreshTokenPayloadSchema = z.object({
    userId: z.string().uuid(),
    jti: z.string().uuid(),
});
export function generateAccessToken(payload) {
    return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}
export function generateRefreshToken(payload) {
    return jwt.sign({ ...payload, jti: randomUUID() }, env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}
export function parseAccessToken(token) {
    try {
        const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
        const parsed = AccessTokenPayloadSchema.safeParse(decoded);
        return parsed.success
            ? { success: true, data: parsed.data }
            : { success: false, error: new Error("Invalid access token payload") };
    }
    catch {
        return { success: false, error: new Error("Invalid or expired access token") };
    }
}
export function parseRefreshToken(token) {
    try {
        const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET);
        const parsed = RefreshTokenPayloadSchema.safeParse(decoded);
        return parsed.success
            ? { success: true, data: parsed.data }
            : { success: false, error: new Error("Invalid refresh token payload") };
    }
    catch {
        return { success: false, error: new Error("Invalid or expired refresh token") };
    }
}
//# sourceMappingURL=token.js.map