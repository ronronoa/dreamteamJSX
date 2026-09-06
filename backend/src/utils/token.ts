import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { env } from "@/config/env";
import type { Role } from "@/generated/prisma/client";

const AccessTokenPayloadSchema = z.object({
  userId: z.string().uuid(),
  role: z.enum(["SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY", "TEAM_LEADER", "MEMBER"]),
});

const RefreshTokenPayloadSchema = z.object({
  userId: z.string().uuid(),
  jti: z.string().uuid(),
});

export type AccessTokenPayload = z.infer<typeof AccessTokenPayloadSchema>;
export type RefreshTokenPayload = z.infer<typeof RefreshTokenPayloadSchema>;

export function generateAccessToken(payload: { userId: string; role: Role }): string {
  return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

export function generateRefreshToken(payload: { userId: string }): string {
  return jwt.sign({ ...payload, jti: randomUUID() }, env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

export function parseAccessToken(token: string): { success: true; data: AccessTokenPayload } | { success: false; error: Error } {
  try {
    const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
    const parsed = AccessTokenPayloadSchema.safeParse(decoded);
    return parsed.success
      ? { success: true, data: parsed.data }
      : { success: false, error: new Error("Invalid access token payload") };
  } catch {
    return { success: false, error: new Error("Invalid or expired access token") };
  }
}

export function parseRefreshToken(token: string): { success: true; data: RefreshTokenPayload } | { success: false; error: Error } {
  try {
    const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET);
    const parsed = RefreshTokenPayloadSchema.safeParse(decoded);
    return parsed.success
      ? { success: true, data: parsed.data }
      : { success: false, error: new Error("Invalid refresh token payload") };
  } catch {
    return { success: false, error: new Error("Invalid or expired refresh token") };
  }
}