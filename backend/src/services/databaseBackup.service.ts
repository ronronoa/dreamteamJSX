import { spawn } from "node:child_process";
import type { ChildProcessWithoutNullStreams } from "node:child_process";
import { createWriteStream } from "node:fs";
import { access, link, mkdir, open, rm, unlink } from "node:fs/promises";
import type { FileHandle } from "node:fs/promises";
import { constants } from "node:fs";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";
import { env } from "@/config/env";

const BACKUP_DIRECTORY = fileURLToPath(new URL("../../backups/", import.meta.url));
const SYSTEM_DATE_CHECK_INTERVAL_MS = 10800_000; // 3 hours

export function startDatabaseDump(): ChildProcessWithoutNullStreams {
  const databaseUrl = new URL(env.DATABASE_URL);
  const processEnvironment: NodeJS.ProcessEnv = {
    ...process.env,
    PGHOST: databaseUrl.hostname,
    PGPORT: databaseUrl.port || "5432",
    PGUSER: decodeURIComponent(databaseUrl.username),
    PGPASSWORD: decodeURIComponent(databaseUrl.password),
    PGDATABASE: decodeURIComponent(databaseUrl.pathname.slice(1)),
  };
  const sslMode = databaseUrl.searchParams.get("sslmode");
  if (sslMode) processEnvironment["PGSSLMODE"] = sslMode;

  return spawn(env.PG_DUMP_PATH ?? "pg_dump", ["--format=custom", "--no-password"], {
    env: processEnvironment,
    stdio: ["pipe", "pipe", "pipe"],
    windowsHide: true,
  });
}

export async function createDailyDatabaseBackup(): Promise<void> {
  const backupDate = getLocalDateStamp(new Date());
  const backupPath = `${BACKUP_DIRECTORY}/database-${backupDate}.dump`;
  const temporaryPath = `${backupPath}.${randomUUID()}.tmp`;

  await mkdir(BACKUP_DIRECTORY, { recursive: true, mode: 0o700 });
  console.log("Creating daily database...")
  try {
    await access(backupPath, constants.F_OK);
    console.info(`Daily database backup already exists: ${backupPath}`);
    return;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }

  const backupFile: FileHandle = await open(
    temporaryPath,
    constants.O_CREAT | constants.O_EXCL | constants.O_WRONLY,
    0o600,
  );

  let dumpProcess: ChildProcessWithoutNullStreams | null = null;
  let closePromise: Promise<{ exitCode: number | null; signal: NodeJS.Signals | null }> | null = null;
  try {
    dumpProcess = startDatabaseDump();
    const processClosed = new Promise<{ exitCode: number | null; signal: NodeJS.Signals | null }>((resolve) => {
      dumpProcess?.once("close", (exitCode, signal) => resolve({ exitCode, signal }));
    });
    closePromise = processClosed;
    dumpProcess.stdin.end();
    dumpProcess.stderr.setEncoding("utf8");

    let errorOutput = "";
    dumpProcess.stderr.on("data", (chunk: string) => {
      errorOutput = `${errorOutput}${chunk}`.slice(-4000);
    });

    await pipeline(
      dumpProcess.stdout,
      createWriteStream(temporaryPath, { fd: backupFile.fd, autoClose: true }),
    );
    const { exitCode, signal } = await processClosed;
    if (exitCode !== 0) {
      throw new Error(errorOutput.trim() || `pg_dump exited with ${signal ?? `code ${exitCode}`}.`);
    }
    let createdBackup = true;
    try {
      await link(temporaryPath, backupPath);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      createdBackup = false;
      console.info(`Daily database backup already exists: ${backupPath}`);
    }
    await unlink(temporaryPath);
    if (createdBackup) console.info(`Daily database backup created: ${backupPath}`);
  } catch (error) {
    dumpProcess?.kill();
    await closePromise;
    await backupFile.close().catch(() => undefined);
    await rm(temporaryPath, { force: true });
    throw error;
  }
}

export function startDailyDatabaseBackupScheduler(): () => void {
  let timer: NodeJS.Timeout | undefined;
  let isStopped = false;
  let backupInProgress = false;
  let lastObservedDate = getLocalDateStamp(new Date());

  async function runBackup() {
    if (isStopped || backupInProgress) return;

    backupInProgress = true;
    try {
      await createDailyDatabaseBackup();
    } catch (error) {
      console.error("Daily database backup failed:", error);
    } finally {
      backupInProgress = false;
    }
  }

  // Attempt today's backup at startup; the date-stamped destination avoids duplicates.
  void runBackup();
  timer = setInterval(() => {
    const currentDate = getLocalDateStamp(new Date());
    if (currentDate === lastObservedDate) return;

    lastObservedDate = currentDate;
    void runBackup();
  }, SYSTEM_DATE_CHECK_INTERVAL_MS);

  return () => {
    isStopped = true;
    if (timer) clearInterval(timer);
  };
}

function getLocalDateStamp(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
