import { Router } from "express"
import rateLimit from "express-rate-limit"
import { settingsController } from "@/controllers/settings.controller"
import { requireAuth, requireRole } from "@/middleware/auth.middleware"

const globalPinLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: "draft-8", legacyHeaders: false })
export const settingsRoutes = Router()

settingsRoutes.get("/settings", requireAuth, settingsController.get)
settingsRoutes.patch("/settings/workspace", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY"), settingsController.updateWorkspace)
settingsRoutes.patch("/settings/preferences", requireAuth, settingsController.updatePreferences)
settingsRoutes.put("/settings/global-pin", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY"), globalPinLimiter, settingsController.setGlobalPin)
