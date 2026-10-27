import "dotenv/config";
import { createHash } from "node:crypto";
import argon2 from "argon2";
import { prisma } from "@/lib/prisma";
import { encryptPin, getPinEncryptionKey } from "@/utils/pin-encryption";
import { getPinLookupHash } from "@/utils/report-pin";

async function main() {
  getPinEncryptionKey();
  const legacyPins = new Map<string, string>();
  for (let number = 0; number < 10000; number += 1) {
    const pin = String(number).padStart(4, "0");
    legacyPins.set(createHash("sha256").update(pin).digest("hex"), pin);
  }
  const users = await prisma.user.findMany({ where: { pinEncrypted: null, pinLookupHash: { not: null } } });
  let converted = 0;
  for (const user of users) {
    const pin = legacyPins.get(user.pinLookupHash!);
    if (!pin || !user.pinHash || !await argon2.verify(user.pinHash, pin)) continue;
    // Guard against an administrator replacing the PIN while this script is running.
    const result = await prisma.user.updateMany({
      where: { user_id: user.user_id, pinEncrypted: null, pinLookupHash: user.pinLookupHash, pinHash: user.pinHash },
      data: { pinEncrypted: encryptPin(pin), pinLookupHash: getPinLookupHash(pin) },
    });
    converted += result.count;
  }
  console.log(`Enabled encrypted recovery for ${converted} existing report PINs. PIN values were preserved.`);
}

main().catch(() => {
  console.error("PIN backfill failed. Check the database connection and REPORT_PIN_ENCRYPTION_KEY.");
  process.exitCode = 1;
}).finally(() => prisma.$disconnect());
