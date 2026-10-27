import { spawn } from "node:child_process";
import type { ChildProcessWithoutNullStreams } from "node:child_process";
import { env } from "@/config/env";

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

  return spawn("pg_dump", ["--format=custom", "--no-password"], {
    env: processEnvironment,
    stdio: ["pipe", "pipe", "pipe"],
  });
}
