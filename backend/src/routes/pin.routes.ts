import { pinController } from "@/controllers/pin.controller";
import { requireAuth } from "@/middleware/auth.middleware";
import { Router } from "express";

export const pinRoutes = Router()

pinRoutes.post("/auth/set-pin", requireAuth, pinController.setPin)
pinRoutes.post("/auth/verify-pin", requireAuth, pinController.verifyPin)