import { describe, expect, it, vi } from "vitest";
vi.mock("@/config/env", () => ({ env: { REPORT_PIN_ENCRYPTION_KEY: "22".repeat(32) } }));

import { encryptPin, decryptPin } from "./pin-encryption";
import { getPinLookupHash } from "./report-pin";
import { createHash } from "node:crypto";

describe("recoverable report PINs", () => {
  it("preserves leading zeros and uses a different nonce for every encryption", () => {
    const first = encryptPin("0048");
    const second = encryptPin("0048");
    expect(first).not.toBe(second);
    expect(decryptPin(first)).toBe("0048");
    expect(decryptPin(second)).toBe("0048");
  });

  it("rejects a modified authentication tag", () => {
    const parts = encryptPin("1234").split(".");
    parts[1] = Buffer.alloc(16).toString("base64");
    expect(() => decryptPin(parts.join("."))).toThrow("could not be opened");
    expect(() => decryptPin("invalid")).toThrow("could not be opened");
  });

  it("uses a keyed lookup instead of an enumerable plain PIN hash", () => {
    expect(getPinLookupHash("0048")).toBe(getPinLookupHash("0048"));
    expect(getPinLookupHash("0048")).not.toBe(createHash("sha256").update("0048").digest("hex"));
  });
});
