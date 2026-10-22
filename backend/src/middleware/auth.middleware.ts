import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError, ForbiddenError } from "@/shared/errors/app-error";
import { parseAccessToken } from "@/utils/token";
import { prisma } from "@/lib/prisma";
import type { Role } from "@/generated/prisma/client";

const ACTIVE_USER_HEARTBEAT_INTERVAL_MS = 60_000;

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; role: Role };
    }
  }
}

export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Missing or malformed authorization header"));
  }

  const token = header.slice(7);
  const result = parseAccessToken(token);

  if (!result.success) {
    return next(new UnauthorizedError(result.error.message));
  }

  try {
    const user = await prisma.user.findUnique({
      where: { user_id: result.data.userId },
      select: { user_id: true, role: true, isActive: true, last_active_at: true },
    });
    if (!user || !user.isActive) {
      return next(new UnauthorizedError("This account is inactive or no longer exists"));
    }

    const now = new Date();
    const lastActiveAt = user.last_active_at?.getTime() ?? 0;
    if (now.getTime() - lastActiveAt >= ACTIVE_USER_HEARTBEAT_INTERVAL_MS) {
      await prisma.user.update({
        where: { user_id: user.user_id },
        data: { last_active_at: now },
      });
    }

    req.user = { userId: user.user_id, role: user.role };
    next();
  } catch (error) {
    next(error);
  }
}

export async function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;
  if (!authorization?.startsWith("Bearer ")) {
    return next();
  }

  const result = parseAccessToken(authorization.slice(7));
  if (!result.success) {
    return next();
  }

  try {
    const user = await prisma.user.findUnique({
      where: { user_id: result.data.userId },
      select: { user_id: true, role: true, isActive: true },
    });
    if (user?.isActive) {
      req.user = { userId: user.user_id, role: user.role };
    }
    next();
  } catch (error) {
    next(error);
  }
}

export function requireRole(...allowedRoles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError("Authentication required"));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ForbiddenError("Insufficient permissions"));
    }

    next();
  };
}
