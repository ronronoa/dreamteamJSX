import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { RefreshTokenSchema, SignInSchema, SignUpSchema } from "@/schemas/auth.schema";
import { ValidationError, UnauthorizedError } from "@/shared/errors/app-error";
import { authService } from "@/services/auth.service";

const REFRESH_COOKIE = "refreshToken";
const REFRESH_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

const CookieSchema = z.object({
  [REFRESH_COOKIE]: z.string().optional(),
});

function getRefreshCookie(req: Request): string | undefined {
  const parsed = CookieSchema.safeParse(req.cookies);
  if (!parsed.success) return req.body?.refreshToken;
  return parsed.data[REFRESH_COOKIE] ?? req.body?.refreshToken;
}

function setRefreshCookie(res: Response, token: string) {
  res.cookie(REFRESH_COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env["NODE_ENV"] === "production",
    path: "/api/auth",
    maxAge: REFRESH_MAX_AGE_MS,
  });
}

function getFirstZodIssue(error: z.ZodError): z.ZodIssue {
  const issue = error.issues[0];
  if (!issue) throw new Error("Zod error has no issues");
  return issue;
}

export const authController = {
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

      setRefreshCookie(res, result.refreshToken);

      console.log("Login success")

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
      const token = getRefreshCookie(req);
      const parsed = RefreshTokenSchema.safeParse({ refreshToken: token });

      if (!parsed.success) {
        throw new UnauthorizedError("Refresh token is missing");
      }

      const result = await authService.refresh(parsed.data.refreshToken);

      setRefreshCookie(res, result.refreshToken);

      res.status(200).json({ accessToken: result.accessToken });
    } catch (err) {
      next(err);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const token = getRefreshCookie(req);

      await authService.logout(token);

      res.clearCookie(REFRESH_COOKIE, { path: "/api/auth" });

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
