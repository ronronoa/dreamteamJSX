import "dotenv/config";
import { app } from "./app";
import { env } from "@/config/env";
import { ensureSuperAdminAccount } from "@/services/bootstrap.service";

async function startServer() {
  await ensureSuperAdminAccount();

  const server = app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
  });

  process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down gracefully");
    server.close(() => {
      console.log("Process terminated");
      process.exit(0);
    });
  });

  process.on("SIGINT", () => {
    console.log("SIGINT received, shutting down gracefully");
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
