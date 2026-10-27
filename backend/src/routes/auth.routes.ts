import { Router } from "express";
import rateLimit from "express-rate-limit";
import { authController } from "@/controllers/auth.controller";
import { requireAuth } from "@/middleware/auth.middleware";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 99,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

const signInLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 3,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: (req, res) => {
    const rateLimitInfo = (req as typeof req & {
      rateLimit?: { resetTime?: Date };
    }).rateLimit;
    const resetTime = rateLimitInfo?.resetTime?.getTime();
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil(((resetTime ?? Date.now() + 60 * 1000) - Date.now()) / 1000),
    );

    res.setHeader("Retry-After", String(retryAfterSeconds));
    res.status(429).json({
      message: "Too many sign-in attempts.",
      retryAfterSeconds,
    });
  },
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
authRoutes.post("/auth/signin", signInLimiter, authController.signIn);
authRoutes.post("/auth/password-reset/request", passwordResetRequestLimiter, authController.requestPasswordReset);
authRoutes.post("/auth/password-reset/complete", passwordResetAttemptLimiter, authController.completePasswordReset);
authRoutes.post("/auth/refresh", authLimiter, authController.refresh);
authRoutes.post("/auth/logout", requireAuth, authController.logout);
authRoutes.post("/auth/change-password", requireAuth, authController.changePassword);
