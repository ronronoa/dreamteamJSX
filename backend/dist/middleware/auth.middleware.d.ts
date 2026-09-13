import type { Request, Response, NextFunction } from "express";
import type { Role } from "@/generated/prisma/client";
declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                role: Role;
            };
        }
    }
}
export declare function requireAuth(req: Request, _res: Response, next: NextFunction): void;
export declare function requireRole(...allowedRoles: Role[]): (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map