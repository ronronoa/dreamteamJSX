import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { env } from "@/config/env";
import { InternalError } from "@/shared/errors";

export function getPinEncryptionKey() {
  if (!env.REPORT_PIN_ENCRYPTION_KEY) {
    throw new InternalError("Set REPORT_PIN_ENCRYPTION_KEY before assigning or viewing report PINs.");
  }
  return Buffer.from(env.REPORT_PIN_ENCRYPTION_KEY, "hex");
}

export function encryptPin(pin: string) {
  const nonce = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getPinEncryptionKey(), nonce);
  const encrypted = Buffer.concat([cipher.update(pin, "utf8"), cipher.final()]);
  return [nonce, cipher.getAuthTag(), encrypted].map((part) => part.toString("base64")).join(".");
}

export function decryptPin(value: string) {
  try {
    const parts = value.split(".");
    if (parts.length !== 3) throw new Error("Invalid encrypted PIN");
    const [nonce, tag, encrypted] = parts.map((part) => Buffer.from(part, "base64"));
    const decipher = createDecipheriv("aes-256-gcm", getPinEncryptionKey(), nonce!);
    decipher.setAuthTag(tag!);
    return Buffer.concat([decipher.update(encrypted!), decipher.final()]).toString("utf8");
  } catch {
    throw new InternalError("The saved PIN could not be opened. Check the PIN encryption key or assign a new PIN.");
  }
}
