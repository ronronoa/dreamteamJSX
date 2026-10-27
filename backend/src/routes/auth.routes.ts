import { Router } from "express";
import rateLimit from "express-rate-limit";
import { authController } from "@/controllers/auth.controller";
import { requireAuth } from "@/middleware/auth.middleware";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 999,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

const passwordResetRequestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many reset code requests. Try again in 15 minutes." },
});

const passwordResetAttemptLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many password reset attempts. Try again in 15 minutes." },
});

export const authRoutes = Router();

authRoutes.post("/auth/signup", authLimiter, authController.signUp);
authRoutes.post("/auth/signin", authLimiter, authController.signIn);
authRoutes.post("/auth/password-reset/request", passwordResetRequestLimiter, authController.requestPasswordReset);
authRoutes.post("/auth/password-reset/complete", passwordResetAttemptLimiter, authController.completePasswordReset);
authRoutes.post("/auth/refresh", authLimiter, authController.refresh);
authRoutes.post("/auth/logout", requireAuth, authController.logout);
authRoutes.post("/auth/change-password", requireAuth, authController.changePassword);
