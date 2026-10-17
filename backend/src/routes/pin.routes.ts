import { Router } from "express";
import { requireAuth, requireRole } from "@/middleware/auth.middleware";
import { pinController } from "@/controllers/pin.controller";
import rateLimit from "express-rate-limit";

const pinLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: "draft-8",
    legacyHeaders: false
})

export const pinRoutes = Router();

pinRoutes.post("/auth/set-pin", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY", "TEAM_LEADER"), pinLimiter, pinController.setPin);
pinRoutes.post("/auth/verify-pin", requireAuth, pinLimiter ,pinController.verifyPin);
