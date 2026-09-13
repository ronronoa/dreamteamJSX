import { isAppError, handleError } from "@/shared/errors/app-error";
export function notFoundHandler(_req, res) {
    res.status(404).json({ code: "NOT_FOUND", message: "Route not found" });
}
export function errorHandler(err, _req, res, _next) {
    const { status, body } = handleError(err);
    res.status(status).json(body);
}
//# sourceMappingURL=error.middleware.js.map