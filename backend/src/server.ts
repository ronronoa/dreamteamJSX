import "dotenv/config";
import { app } from "./app";
import { env } from "@/config/env";
import { ensureSuperAdminAccount } from "@/services/bootstrap.service";
import { startDailyDatabaseBackupScheduler } from "@/services/databaseBackup.service";

function getOption(name: string): string | undefined {
  const optionIndex = process.argv.indexOf(`--${name}`);
  if (optionIndex === -1) return undefined;

  return process.argv[optionIndex + 1];
}

async function startServer() {
  await ensureSuperAdminAccount();

  const port = Number(getOption("port") ?? env.PORT);
  const host = getOption("host") ?? "0.0.0.0";
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid server port: ${port}`);
  }

  const server = app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port} in ${env.NODE_ENV} mode`);
  });
  const stopDatabaseBackupScheduler = startDailyDatabaseBackupScheduler();

  process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down gracefully");
    stopDatabaseBackupScheduler();
    server.close(() => {
      console.log("Process terminated");
      process.exit(0);
    });
  });

  process.on("SIGINT", () => {
    console.log("SIGINT received, shutting down gracefully");
    stopDatabaseBackupScheduler();
    server.close(() => {
      console.log("Process terminated");
      process.exit(0);
    });
  });
}

startServer().catch((error: unknown) => {
  console.error("Could not initialize the server:", error);
  process.exit(1);
});
