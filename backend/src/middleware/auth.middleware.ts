import type { Role } from "@/generated/prisma/enums";
import { ForbiddenError, UnauthorizedError } from "@/shared/errors";
import { parseAccessToken } from "@/utils";
import type { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: { userId: string; role: Role }
        }
    }
};

export function requireAuth(req: Request, _res: Response, next: NextFunction ) {
    const header = req.headers.authorization

    if(!header?.startsWith("Bearer ")) return next(new UnauthorizedError("Missing or malformed authorization header"))

    const token = header.slice(7)
    const result = parseAccessToken(token)

    if (!result.success) return next(new UnauthorizedError(result.error.message))

    req.user = result.data
    next()
}

export function requireRole(...allowedRoles: Role[]) {
    return (req: Request, _res: Response, next: NextFunction ) => {
        if(!req.user) return next(new UnauthorizedError("Authentication required"))
        if(!allowedRoles.includes(req.user.role)) return next(new ForbiddenError("Insufficient permissions"))
        
        next()
    };
}
