import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Request, Response } from "express";
import { ChangePasswordSchema } from "@/schemas/auth.schema";

const mocks = vi.hoisted(() => ({
  findUnique: vi.fn(), update: vi.fn(), deleteTokens: vi.fn(), createToken: vi.fn(),
  transaction: vi.fn(), verifyPassword: vi.fn(), hashPassword: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({ prisma: {
  user: { findUnique: mocks.findUnique, update: mocks.update },
  $transaction: mocks.transaction,
} }));
vi.mock("@/utils/password", () => ({ verifyPassword: mocks.verifyPassword, hashPassword: mocks.hashPassword }));
vi.mock("@/utils/refresh-token", () => ({ hashRefreshToken: vi.fn().mockResolvedValue("refresh-hash") }));
vi.mock("@/utils/token", () => ({
  generateAccessToken: vi.fn().mockReturnValue("new-access-token"),
  generateRefreshToken: vi.fn().mockReturnValue("new-refresh-token"),
  parseAccessToken: vi.fn().mockReturnValue({ success: true, data: { userId: "user-id" } }),
  parseRefreshToken: vi.fn(),
}));

import { authService } from "./auth.service";
import { requireAuth, optionalAuth } from "@/middleware/auth.middleware";

beforeEach(() => {
  vi.clearAllMocks();
  mocks.findUnique.mockResolvedValue({
    user_id: "user-id", role: "TEAM_LEADER", isActive: true,
    passwordHash: "default-hash", mustChangePassword: true, last_active_at: new Date(),
  });
  mocks.verifyPassword.mockResolvedValue(true);
  mocks.hashPassword.mockResolvedValue("new-password-hash");
  mocks.transaction.mockImplementation((callback) => callback({
    user: { update: mocks.update },
    refreshToken: { deleteMany: mocks.deleteTokens, create: mocks.createToken },
  }));
});

describe("first login password change", () => {
  it("rejects short or unchanged replacement passwords", () => {
    expect(ChangePasswordSchema.safeParse({ currentPassword: "LI", newPassword: "1234567" }).success).toBe(false);
    expect(ChangePasswordSchema.safeParse({ currentPassword: "SAMEPASSWORD", newPassword: "SAMEPASSWORD" }).success).toBe(false);
    expect(ChangePasswordSchema.safeParse({ currentPassword: "LI", newPassword: "12345678" }).success).toBe(true);
  });

  it("clears the requirement with the new hash and rotates sessions in one transaction", async () => {
    const result = await authService.changePassword("user-id", { currentPassword: "LI", newPassword: "new-password" });
    expect(mocks.update).toHaveBeenCalledWith({
      where: { user_id: "user-id" }, data: { passwordHash: "new-password-hash", mustChangePassword: false },
    });
    expect(mocks.deleteTokens).toHaveBeenCalledWith({ where: { userId: "user-id" } });
    expect(mocks.createToken).toHaveBeenCalledOnce();
    expect(result.accessToken).toBe("new-access-token");
  });

  it("keeps the requirement when the current password is incorrect", async () => {
    mocks.verifyPassword.mockResolvedValue(false);
    await expect(authService.changePassword("user-id", { currentPassword: "wrong", newPassword: "new-password" }))
      .rejects.toThrow("Current password is incorrect");
    expect(mocks.transaction).not.toHaveBeenCalled();
  });

  it.each(["/users", "/teams", "/users/me", "/auth/set-pin"])("blocks %s until the password changes", async (path) => {
    const next = vi.fn();
    const request = { headers: { authorization: "Bearer token" }, path } as Request;
    await requireAuth(request, {} as Response, next);
    expect(next.mock.calls[0]![0]).toMatchObject({ statusCode: 403 });
  });

  it.each(["/auth/change-password", "/auth/logout"])("allows %s while the password change is pending", async (path) => {
    const next = vi.fn();
    const request = { headers: { authorization: "Bearer token" }, path } as Request;
    await requireAuth(request, {} as Response, next);
    expect(next).toHaveBeenCalledWith();
  });

  it("also restricts optional authenticated requests", async () => {
    const next = vi.fn();
    const request = { headers: { authorization: "Bearer token" }, path: "/report-forms" } as Request;
    await optionalAuth(request, {} as Response, next);
    expect(next.mock.calls[0]![0]).toMatchObject({ statusCode: 403 });
  });

  it("allows normal access once the requirement is cleared", async () => {
    mocks.findUnique.mockResolvedValue({
      user_id: "user-id", role: "TEAM_LEADER", isActive: true,
      passwordHash: "new-hash", mustChangePassword: false, last_active_at: new Date(),
    });
    const next = vi.fn();
    const request = { headers: { authorization: "Bearer token" }, path: "/teams" } as Request;
    await requireAuth(request, {} as Response, next);
    expect(next).toHaveBeenCalledWith();
  });
});
