import { createHmac } from "node:crypto";
import { getPinEncryptionKey } from "./pin-encryption";

export function getPinLookupHash(pin: string) {
  return createHmac("sha256", getPinEncryptionKey()).update(pin).digest("hex");
}
