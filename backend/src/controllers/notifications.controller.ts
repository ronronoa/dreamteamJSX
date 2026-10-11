import type { NextFunction, Request, Response } from "express"
import { UnauthorizedError } from "@/shared/errors/app-error"
import { notificationsService } from "@/services/notifications.service"
import { openNotificationStream } from "@/services/notificationHub"

function getUserId(req: Request) {
  if (!req.user) throw new UnauthorizedError("Authentication required")
  return req.user.userId
}

export const notificationsController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try { res.json(await notificationsService.list(getUserId(req))) } catch (error) { next(error) }
  },
  async markAllRead(req: Request, res: Response, next: NextFunction) {
    try { res.json(await notificationsService.markAllRead(getUserId(req))) } catch (error) { next(error) }
  },
  stream(req: Request, res: Response, next: NextFunction) {
    try { openNotificationStream(getUserId(req), res) } catch (error) { next(error) }
  },
}
