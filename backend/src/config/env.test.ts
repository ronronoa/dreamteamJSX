import { afterAll, describe, expect, it, vi } from "vitest";

const coreSettings = {
  NODE_ENV: "development",
  DATABASE_URL: "postgresql://localhost/elms_test",
  ACCESS_TOKEN_SECRET: "a".repeat(32),
  REFRESH_TOKEN_SECRET: "b".repeat(32),
};

for (const [name, value] of Object.entries(coreSettings)) {
  vi.stubEnv(name, value);
}
vi.stubEnv("OCR_BACKEND_URL", undefined);
vi.stubEnv("FORGET_PASS_EMAIL", undefined);
vi.stubEnv("FORGET_PASS_EMAIL_APP_PASS", undefined);

const { EnvSchema } = await import("./env");
afterAll(() => vi.unstubAllEnvs());

describe("integration environment settings", () => {
  it("allows local startup without OCR or email credentials", () => {
    expect(EnvSchema.safeParse(coreSettings).success).toBe(true);
  });

  it("still requires core database and authentication settings", () => {
    expect(EnvSchema.safeParse({ NODE_ENV: "development" }).success).toBe(false);
  });

  it("rejects malformed integration settings when supplied", () => {
    expect(EnvSchema.safeParse({ ...coreSettings, OCR_BACKEND_URL: "invalid" }).success).toBe(false);
    expect(EnvSchema.safeParse({ ...coreSettings, FORGET_PASS_EMAIL: "invalid" }).success).toBe(false);
  });

  it("requires all integration settings in production", () => {
    expect(EnvSchema.safeParse({ ...coreSettings, NODE_ENV: "production" }).success).toBe(false);
    expect(EnvSchema.safeParse({
      ...coreSettings,
      NODE_ENV: "production",
      OCR_BACKEND_URL: "http://localhost:8000/scan",
      FORGET_PASS_EMAIL: "test@example.com",
      FORGET_PASS_EMAIL_APP_PASS: "test-password",
    }).success).toBe(true);
  });
});
