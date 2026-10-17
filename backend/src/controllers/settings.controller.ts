import type { NextFunction, Request, Response } from "express"
import { SetGlobalPinSchema, UpdateUserPreferencesSchema, UpdateWorkspaceSettingsSchema } from "@/schemas/settings.schema"
import { settingsService } from "@/services/settings.service"
import { pinService } from "@/services/pin.service"
import { UnauthorizedError, ValidationError } from "@/shared/errors/app-error"
import { z } from "zod"

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
}
