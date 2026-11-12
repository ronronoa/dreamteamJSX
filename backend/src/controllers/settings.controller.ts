import type { NextFunction, Request, Response } from "express"
import { DatabaseBackupSchema, SetGlobalPinSchema, UpdateUserPreferencesSchema, UpdateWorkspaceSettingsSchema } from "@/schemas/settings.schema"
import { settingsService } from "@/services/settings.service"
import { pinService } from "@/services/pin.service"
import { UnauthorizedError, ValidationError } from "@/shared/errors/app-error"
import { z } from "zod"
import { prepareEncryptedDatabaseBackup } from "@/services/encryptedDatabaseBackup.service"
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
  async downloadDatabaseBackup(req: Request, res: Response, next: NextFunction) {
    const cancellation = new AbortController();
    const cancelBackup = () => cancellation.abort();
    res.once("close", cancelBackup);
    res.setHeader("Cache-Control", "no-store");
    try {
      const { password } = parseBody(DatabaseBackupSchema, req.body);
      const backup = await prepareEncryptedDatabaseBackup(password, cancellation.signal);
      const date = new Date().toISOString().slice(0, 10);
      res.setHeader("X-Backup-SHA256", backup.checksum);
      res.download(backup.filePath, `elms-database-backup-${date}.dump.enc`, (error) => {
        res.off("close", cancelBackup);
        void backup.cleanup().catch(() => console.error("Could not remove temporary encrypted backup."));
        if (!error) return;
        if (res.headersSent) {
          res.destroy();
          return;
        }
        next(error);
      });
    } catch (error) {
      res.off("close", cancelBackup);
      if (res.destroyed) return;
      if (error instanceof ValidationError) {
        next(error);
        return;
      }
      next(new InternalError("Could not create the encrypted backup. Check the server's pg_dump configuration."));
    }
  },
}
