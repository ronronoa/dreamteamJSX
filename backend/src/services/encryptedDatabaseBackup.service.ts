import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { startDatabaseDump } from "./databaseBackup.service";
import { encryptBackup, hashBackup } from "@/utils/backup-encryption";

const BACKUP_TIMEOUT_MS = 10 * 60 * 1000;

export async function prepareEncryptedDatabaseBackup(password: string, signal: AbortSignal) {
  const directory = await mkdtemp(path.join(tmpdir(), "elms-backup-"));
  const filePath = path.join(directory, "database.dump.enc");
  const cleanup = () => rm(directory, { recursive: true, force: true });
  let dumpProcess: ReturnType<typeof startDatabaseDump> | undefined;
  let processClosed: Promise<number | null> | undefined;
  let timer: NodeJS.Timeout | undefined;

  function cancelBackup() {
    dumpProcess?.kill();
    dumpProcess?.stdout.destroy(new Error("Database backup cancelled or timed out."));
  }

  try {
    signal.throwIfAborted();
    dumpProcess = startDatabaseDump();
    processClosed = new Promise((resolve) => {
      dumpProcess!.once("close", (code) => resolve(code));
    });
    dumpProcess.on("error", (error) => dumpProcess?.stdout.destroy(error));
    dumpProcess.stderr.resume();
    dumpProcess.stdin.end();
    signal.addEventListener("abort", cancelBackup, { once: true });
    timer = setTimeout(cancelBackup, BACKUP_TIMEOUT_MS);

    await encryptBackup(dumpProcess.stdout, filePath, password);
    const exitCode = await processClosed;
    if (exitCode !== 0) throw new Error("pg_dump did not complete successfully.");
    signal.throwIfAborted();
    const checksum = await hashBackup(filePath);
    signal.throwIfAborted();
    return { filePath, checksum, cleanup };
  } catch (error) {
    dumpProcess?.kill();
    await processClosed;
    await cleanup();
    throw error;
  } finally {
    clearTimeout(timer);
    signal.removeEventListener("abort", cancelBackup);
  }
}
