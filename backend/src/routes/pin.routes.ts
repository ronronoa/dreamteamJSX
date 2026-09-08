import { Router } from "express";
import { requireAuth } from "@/middleware/auth.middleware";
import { pinController } from "@/controllers/pin.controller";

export const pinRoutes = Router();

pinRoutes.post("/auth/set-pin", requireAuth, pinController.setPin);
pinRoutes.post("/auth/verify-pin", requireAuth, pinController.verifyPin);
