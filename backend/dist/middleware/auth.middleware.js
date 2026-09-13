import { UnauthorizedError, ForbiddenError } from "@/shared/errors/app-error";
import { parseAccessToken } from "@/utils/token";
export function requireAuth(req, _res, next) {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        return next(new UnauthorizedError("Missing or malformed authorization header"));
    }
    const token = header.slice(7);
    const result = parseAccessToken(token);
    if (!result.success) {
        return next(new UnauthorizedError(result.error.message));
    }
    req.user = result.data;
    next();
}
export function requireRole(...allowedRoles) {
    return (req, _res, next) => {
        if (!req.user) {
            return next(new UnauthorizedError("Authentication required"));
        }
        if (!allowedRoles.includes(req.user.role)) {
            return next(new ForbiddenError("Insufficient permissions"));
        }
        next();
    };
}
//# sourceMappingURL=auth.middleware.js.map