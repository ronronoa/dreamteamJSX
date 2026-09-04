import { Router } from "express";
import rateLimit from "express-rate-limit";
import { authController } from "@/controllers/auth.controller";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

export const authRoutes = Router();

authRoutes.post("/auth/signup", authLimiter, authController.signUp);
authRoutes.post("/auth/signin", authLimiter, authController.signIn);
authRoutes.post("/auth/refresh", authLimiter, authController.refresh);
authRoutes.post("/auth/logout", authController.logout);