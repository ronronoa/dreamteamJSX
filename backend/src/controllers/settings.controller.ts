import type { NextFunction, Request, Response } from "express"
import { SetGlobalPinSchema, UpdateUserPreferencesSchema, UpdateWorkspaceSettingsSchema } from "@/schemas/settings.schema"
import { settingsService } from "@/services/settings.service"
import { pinService } from "@/services/pin.service"
import { UnauthorizedError, ValidationError } from "@/shared/errors/app-error"
import { z } from "zod"
import { startDatabaseDump } from "@/services/databaseBackup.service"
import { InternalError } from "@/shared/errors/app-error"

function parseBody<T>(schema: z.ZodType<T>, body: unknown): T {
  const result = schema.safeParse(body)
  if (result.success) return result.data
  const issue = result.error.issues[0]
  throw new ValidationError(issue?.message ?? "Invalid settings.", issue ? { [issue.path.join(".")]: [issue.message] } : {})
}

function getUserId(req: Request) {
  if (!req.user) throw new UnauthorizedError("Authentication required")
  return req.user.userId
}

export const settingsController = {
  async get(req: Request, res: Response, next: NextFunction) {
    try { res.json(await settingsService.get(getUserId(req))) } catch (error) { next(error) }
  },
  async updateWorkspace(req: Request, res: Response, next: NextFunction) {
    try {
      const input = parseBody(UpdateWorkspaceSettingsSchema, req.body)
      res.json(await settingsService.updateWorkspace(getUserId(req), input))
    } catch (error) { next(error) }
  },
  async updatePreferences(req: Request, res: Response, next: NextFunction) {
    try {
      const input = parseBody(UpdateUserPreferencesSchema, req.body)
      res.json(await settingsService.updatePreferences(getUserId(req), input))
    } catch (error) { next(error) }
  },
  async setGlobalPin(req: Request, res: Response, next: NextFunction) {
    try {
      const input = parseBody(SetGlobalPinSchema, req.body)
      res.json(await pinService.setGlobalPin(getUserId(req), input.pin))
    } catch (error) { next(error) }
  },
  async downloadDatabaseBackup(_req: Request, res: Response, next: NextFunction) {
    let dumpProcess: ReturnType<typeof startDatabaseDump>;
    try {
      dumpProcess = startDatabaseDump();
      dumpProcess.stdin.end();
    } catch {
      next(new InternalError("Could not start the database backup."));
      return;
    }

    const date = new Date().toISOString().slice(0, 10);
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="elms-database-backup-${date}.dump"`);
    res.setHeader("Cache-Control", "no-store");
    dumpProcess.stderr.resume();
    let processErrorHandled = false;

    dumpProcess.stdout.on("data", (chunk: Buffer) => {
      if (res.write(chunk)) return;
      dumpProcess.stdout.pause();
      res.once("drain", () => dumpProcess.stdout.resume());
    });

    dumpProcess.on("error", () => {
      processErrorHandled = true;
      if (res.headersSent) {
        res.destroy();
        return;
      }
      next(new InternalError("The pg_dump utility is unavailable on the server."));
    });

    dumpProcess.on("close", (exitCode) => {
      if (processErrorHandled || res.destroyed || res.writableEnded) return;
      if (exitCode === 0) {
        res.end();
        return;
      }
      if (!res.headersSent) {
        next(new InternalError("The database backup failed."));
        return;
      }
      res.destroy();
    });

    res.on("close", () => {
      if (!res.writableEnded) dumpProcess.kill();
    });
  },
}
