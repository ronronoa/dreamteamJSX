import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateUserSchema, UpdateUserSchema } from "@/schemas/user.schema";
import { SignInSchema } from "@/schemas/auth.schema";
import { PrismaClientKnownRequestError } from "@/generated/prisma/internal/prismaNamespace";

const mocks = vi.hoisted(() => ({
  create: vi.fn(), findUnique: vi.fn(), update: vi.fn(), deleteTokens: vi.fn(),
  preparePin: vi.fn(), generatePin: vi.fn(), hashPassword: vi.fn(),
  transaction: vi.fn(),
  findTeam: vi.fn(),
}));
vi.mock("@/lib/prisma", () => ({ prisma: {
  user: { create: mocks.create, findUnique: mocks.findUnique, update: mocks.update },
  refreshToken: { deleteMany: mocks.deleteTokens },
  responseTeam: { findFirst: mocks.findTeam },
  $transaction: mocks.transaction,
} }));
vi.mock("./pin.service", () => ({ pinService: { preparePin: mocks.preparePin, generatePin: mocks.generatePin } }));
vi.mock("@/utils", () => ({ hashPassword: mocks.hashPassword, toSafeUser: (user: unknown) => user }));
vi.mock("@/sql/manageUsers", () => ({ listManagedUsers: vi.fn(), lockSuperAdminChanges: vi.fn() }));

import { userService } from "./user.service";

const member = {
  name: "Ana Santos", firstName: "Ana", lastName: "Santos", username: "newmember", role: "MEMBER" as const,
  team_id: "00000000-0000-4000-8000-000000000001",
};

beforeEach(() => {
  vi.resetAllMocks();
  mocks.generatePin.mockResolvedValue("0482");
  mocks.preparePin.mockResolvedValue({ pinHash: "pin-hash", pinLookupHash: "lookup" });
  mocks.hashPassword.mockResolvedValue("password-hash");
  mocks.findTeam.mockResolvedValue({ team_id: member.team_id });
  mocks.transaction.mockImplementation((callback) => callback({
    user: { findUnique: mocks.findUnique, update: mocks.update },
    refreshToken: { deleteMany: mocks.deleteTokens },
  }));
});

describe("managed account passwords", () => {
  it("accepts a member without a password, including an empty form value", () => {
    expect(CreateUserSchema.safeParse(member).success).toBe(true);
    expect(CreateUserSchema.safeParse({ ...member, password: "" }).success).toBe(true);
  });

  it.each(["SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY", "TEAM_LEADER", "MEMBER"])("uses the uppercase surname password for %s", async (role) => {
    const input = CreateUserSchema.parse({ ...member, role });
    await userService.create(input, "SUPER_ADMIN");
    expect(mocks.hashPassword).toHaveBeenCalledWith("SANTOS");
    expect(mocks.create.mock.calls[0]![0].data.passwordHash).toBe("password-hash");
    expect(mocks.create.mock.calls[0]![0].data.mustChangePassword).toBe(true);
  });

  it("uses the surname even if a client supplies a different password", async () => {
    const input = CreateUserSchema.parse({ ...member, password: "ignored-password" });
    await userService.create(input, "SUPER_ADMIN");
    expect(mocks.hashPassword).toHaveBeenCalledWith("SANTOS");
    expect(mocks.create.mock.calls[0]![0].data).toMatchObject({ role: "MEMBER", passwordHash: "password-hash" });
    expect(mocks.generatePin).not.toHaveBeenCalled();
    expect(mocks.preparePin).not.toHaveBeenCalled();
    expect(mocks.create.mock.calls[0]![0].data.pinHash).toBeUndefined();
  });

  it("requires a nonempty surname", () => {
    expect(CreateUserSchema.safeParse({ ...member, lastName: "   " }).success).toBe(false);
    expect(CreateUserSchema.safeParse({ ...member, lastName: undefined }).success).toBe(false);
  });

  it("supports short surnames at creation and sign-in", async () => {
    await userService.create(CreateUserSchema.parse({ ...member, lastName: "  Li  " }), "SUPER_ADMIN");
    expect(mocks.hashPassword).toHaveBeenCalledWith("LI");
    expect(SignInSchema.safeParse({ identifier: member.username, password: "LI" }).success).toBe(true);
  });

  it("preserves a member password during edits and promotion", async () => {
    mocks.findUnique.mockResolvedValue({ role: "MEMBER", passwordHash: "existing-hash", lastName: "Santos" });
    await userService.update("member-id", UpdateUserSchema.parse({ lastName: "Reyes" }), "admin-id", "SUPER_ADMIN");
    expect(mocks.update.mock.calls[0]![0].data.passwordHash).toBe("existing-hash");
    await userService.update("member-id", UpdateUserSchema.parse({ role: "TEAM_LEADER" }), "admin-id", "SUPER_ADMIN");
    expect(mocks.update.mock.calls[1]![0].data.passwordHash).toBe("existing-hash");
    expect(mocks.update.mock.calls[1]![0].data.pinHash).toBe("pin-hash");
    expect(mocks.hashPassword).not.toHaveBeenCalled();
  });

  it("generates another PIN when a concurrent request claims the first one", async () => {
    const collision = new PrismaClientKnownRequestError("PIN collision", {
      code: "P2002", clientVersion: "7.9.1", meta: { target: ["pinLookupHash"] },
    });
    mocks.generatePin.mockResolvedValueOnce("0482").mockResolvedValueOnce("9361");
    mocks.create.mockRejectedValueOnce(collision).mockResolvedValueOnce({ name: "Member" });
    const result = await userService.create(CreateUserSchema.parse({ ...member, role: "TEAM_LEADER" }), "SUPER_ADMIN");
    expect(result.generatedPin).toBe("9361");
    expect(mocks.create).toHaveBeenCalledTimes(2);
  });

  it("does not retry a duplicate username as if it were a PIN collision", async () => {
    const duplicate = new PrismaClientKnownRequestError("Username exists", {
      code: "P2002", clientVersion: "7.9.1", meta: { target: ["username"] },
    });
    mocks.create.mockRejectedValueOnce(duplicate);
    await expect(userService.create(CreateUserSchema.parse(member), "SUPER_ADMIN")).rejects.toThrow("Username or email");
    expect(mocks.create).toHaveBeenCalledTimes(1);
  });

  it("retries the PostgreSQL adapter's constraint-field collision format", async () => {
    const collision = new PrismaClientKnownRequestError("PIN collision", {
      code: "P2002", clientVersion: "7.9.1",
      meta: { driverAdapterError: { cause: { constraint: { fields: ['"pinLookupHash"'] } } } },
    });
    mocks.generatePin.mockResolvedValueOnce("0482").mockResolvedValueOnce("9361");
    mocks.create.mockRejectedValueOnce(collision).mockResolvedValueOnce({ name: "Member" });
    const result = await userService.create(CreateUserSchema.parse({ ...member, role: "TEAM_LEADER" }), "SUPER_ADMIN");
    expect(result.generatedPin).toBe("9361");
  });

  it("requires a password when promoting a member", async () => {
    mocks.findUnique.mockResolvedValue({ role: "MEMBER", passwordHash: null, team_id: member.team_id });
    await expect(userService.update("member-id", UpdateUserSchema.parse({ role: "TEAM_LEADER" }), "admin-id", "SUPER_ADMIN"))
      .rejects.toThrow("Set a password");
    expect(mocks.update).not.toHaveBeenCalled();
  });

  it("sets a password atomically during promotion", async () => {
    mocks.findUnique.mockResolvedValue({ role: "MEMBER", passwordHash: null, team_id: member.team_id });
    await userService.update("member-id", UpdateUserSchema.parse({ role: "TEAM_LEADER", password: "valid-password" }), "admin-id", "SUPER_ADMIN");
    expect(mocks.update).toHaveBeenCalledWith({
      where: { user_id: "member-id" }, data: { role: "TEAM_LEADER", passwordHash: "password-hash", pinHash: "pin-hash", pinLookupHash: "lookup" },
    });
    expect(mocks.deleteTokens).toHaveBeenCalledWith({ where: { userId: "member-id" } });
  });

  it("removes PIN credentials when changing an account to Member", async () => {
    mocks.findUnique.mockResolvedValue({ role: "TEAM_LEADER", passwordHash: "existing-hash" });
    await userService.update("user-id", UpdateUserSchema.parse({ role: "MEMBER" }), "admin-id", "SUPER_ADMIN");
    expect(mocks.update.mock.calls[0]![0].data).toMatchObject({
      pinHash: null, pinLookupHash: null, pinEncrypted: null, passwordHash: "existing-hash",
    });
  });
});
