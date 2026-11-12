import { readFile } from "node:fs/promises";
import { decryptBackup, hashBackup } from "../src/utils/backup-encryption";

async function main() {
  const [source, destination, checksumFile] = process.argv.slice(2);
  const password = process.env["BACKUP_PASSWORD"];
  delete process.env["BACKUP_PASSWORD"];
  if (!source || !destination || !password) {
    throw new Error("Set BACKUP_PASSWORD, then run: npx tsx scripts/decrypt-backup.ts <backup.dump.enc> <output.dump> [backup.dump.enc.sha256]");
  }
  if (checksumFile) {
    const checksumText = await readFile(checksumFile, "utf8");
    const expectedChecksum = checksumText.trim().split(/\s+/)[0];
    const actualChecksum = await hashBackup(source);
    if (!expectedChecksum || !/^[a-f0-9]{64}$/i.test(expectedChecksum) || actualChecksum !== expectedChecksum.toLowerCase()) {
      throw new Error("SHA-256 verification failed. The backup may be corrupted or altered.");
    }
  }
  await decryptBackup(source, destination, password);
  console.info(`Backup decrypted: ${destination}. Inspect it with pg_restore --list before restoring.`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Could not decrypt the backup.");
  process.exitCode = 1;
});
