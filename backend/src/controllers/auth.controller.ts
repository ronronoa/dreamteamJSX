import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { ChangePasswordSchema, CompletePasswordResetSchema, RefreshTokenSchema, RequestPasswordResetSchema, SignInSchema, SignUpSchema } from "@/schemas/auth.schema";
import { ValidationError, UnauthorizedError } from "@/shared/errors/app-error";
import { authService } from "@/services/auth.service";
import { env } from "@/config/env";
import { passwordResetService } from "@/services/passwordReset.service";

const REFRESH_COOKIE = "refreshToken";
const LEGACY_REFRESH_COOKIE = "refresh_token";
const LEGACY_REFRESH_COOKIE_PATHS = ["/", "/api", "/api/auth"];
const REFRESH_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const isProduction = env.NODE_ENV === "production";
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: isProduction ? "none" as const : "lax" as const,
  secure: isProduction,
  partitioned: isProduction,
};

function getRefreshCookie(req: Request): string | undefined {
  const token = req.cookies?.[REFRESH_COOKIE];
  return typeof token === "string" ? token : undefined;
}

const ALLOWED_REFRESH_ORIGINS = new Set([
  "http://localhost:5173",
  "https://dreamteamjsx.web.app",
]);

function requireTrustedRefreshRequest(req: Request) {
  const origin = req.get("origin");
  const requestedWith = req.get("x-requested-with");

  if (!origin || !ALLOWED_REFRESH_ORIGINS.has(origin) || requestedWith !== "XMLHttpRequest") {
    throw new UnauthorizedError("Refresh request is not allowed");
  }
}

function setRefreshCookie(res: Response, token: string) {
  clearLegacyRefreshCookies(res);

  // Clear the old narrower path so clients do not send duplicate cookies after upgrading.
  // Deletion cookies need the same cross-site attributes as the cookie being replaced.
  res.clearCookie(REFRESH_COOKIE, {
    ...REFRESH_COOKIE_OPTIONS,
    path: "/api/auth",
  });
  res.cookie(REFRESH_COOKIE, token, {
    // The frontend and API use different sites. Partitioned cookies must be Secure
    // and use SameSite=None to work in that cross-site context.
    ...REFRESH_COOKIE_OPTIONS,
    path: "/api",
    maxAge: REFRESH_MAX_AGE_MS,
  });
}

function clearRefreshCookie(res: Response) {
  res.clearCookie(REFRESH_COOKIE, {
    ...REFRESH_COOKIE_OPTIONS,
    path: "/api",
  });
  res.clearCookie(REFRESH_COOKIE, {
    ...REFRESH_COOKIE_OPTIONS,
    path: "/api/auth",
  });
  clearLegacyRefreshCookies(res);
}

function clearLegacyRefreshCookies(res: Response) {
  for (const path of LEGACY_REFRESH_COOKIE_PATHS) {
    res.clearCookie(LEGACY_REFRESH_COOKIE, {
      ...REFRESH_COOKIE_OPTIONS,
      path,
    });
  }
}

function getFirstZodIssue(error: z.ZodError): z.ZodIssue {
  const issue = error.issues[0];
  if (!issue) throw new Error("Zod error has no issues");
  return issue;
}

export const authController = {
  async requestPasswordReset(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = RequestPasswordResetSchema.safeParse(req.body);
      if (!parsed.success) {
        const issue = getFirstZodIssue(parsed.error);
        throw new ValidationError(issue.message, { [issue.path.join(".")]: [issue.message] });
      }
      const result = await passwordResetService.requestCode(parsed.data.email);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async completePasswordReset(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = CompletePasswordResetSchema.safeParse(req.body);
      if (!parsed.success) {
        const issue = getFirstZodIssue(parsed.error);
        throw new ValidationError(issue.message, { [issue.path.join(".")]: [issue.message] });
      }
      const result = await passwordResetService.resetPassword(
        parsed.data.email,
        parsed.data.code,
        parsed.data.newPassword,
      );
      res.locals["activityActorId"] = result.user.id;
      setRefreshCookie(res, result.refreshToken);
      res.status(200).json({ user: result.user, accessToken: result.accessToken });
    } catch (error) {
      next(error);
    }
  },

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = SignUpSchema.safeParse(req.body);

      if (!parsed.success) {
        const firstIssue = getFirstZodIssue(parsed.error);
        throw new ValidationError(firstIssue.message, {
          [firstIssue.path.join(".")]: [firstIssue.message],
        });
      }

      const result = await authService.signUp(parsed.data);
      res.locals["activityActorId"] = result.user.id;

      setRefreshCookie(res, result.refreshToken);

      res.status(201).json({
        user: result.user,
        accessToken: result.accessToken,
      });
    } catch (error) {
      next(error);
    }
  },

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = SignInSchema.safeParse(req.body);

      if (!parsed.success) {
        const firstIssue = getFirstZodIssue(parsed.error);
        throw new ValidationError(firstIssue.message, {
          [firstIssue.path.join(".")]: [firstIssue.message],
        });
      }

      const result = await authService.signIn(parsed.data);
      res.locals["activityActorId"] = result.user.id;

      setRefreshCookie(res, result.refreshToken);

      res.status(200).json({
        user: result.user,
        accessToken: result.accessToken,
      });
    } catch (err) {
      next(err);
    }
  },

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      requireTrustedRefreshRequest(req);
      const token = getRefreshCookie(req);
      const parsed = RefreshTokenSchema.safeParse({ refreshToken: token });

      if (!parsed.success) {
        throw new UnauthorizedError("Refresh token is missing");
      }

      const result = await authService.refresh(parsed.data.refreshToken);
      res.locals["activityActorId"] = result.user.id;

      setRefreshCookie(res, result.refreshToken);

      res.status(200).json({ 
        user: result.user, // added because whenever webiste gets refreshed theres no other way to get user: {...} other than signIn() or signUp()
        accessToken: result.accessToken });
    } catch (err) {
      next(err);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const token = getRefreshCookie(req);

      await authService.logout(token);

      clearRefreshCookie(res);

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = ChangePasswordSchema.safeParse(req.body);
      if (!parsed.success) {
        const firstIssue = getFirstZodIssue(parsed.error);
        throw new ValidationError(firstIssue.message, {
          [firstIssue.path.join(".")]: [firstIssue.message],
        });
      }
      if (!req.user) throw new UnauthorizedError("Authentication required");

      const result = await authService.changePassword(req.user.userId, parsed.data);
      setRefreshCookie(res, result.refreshToken);
      res.status(200).json({ accessToken: result.accessToken });
    } catch (error) {
      next(error);
    }
  },
};
