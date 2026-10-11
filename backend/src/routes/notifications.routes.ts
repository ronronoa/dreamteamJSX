import { Router } from "express"
import { notificationsController } from "@/controllers/notifications.controller"
import { requireAuth } from "@/middleware/auth.middleware"

export const notificationsRoutes = Router()
notificationsRoutes.get("/notifications", requireAuth, notificationsController.list)
notificationsRoutes.post("/notifications/read", requireAuth, notificationsController.markAllRead)
notificationsRoutes.get("/notifications/stream", requireAuth, notificationsController.stream)
