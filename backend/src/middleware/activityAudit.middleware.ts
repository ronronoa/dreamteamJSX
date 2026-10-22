import { activityLogsService } from "@/services/activityLogs.service";
import type { RequestHandler } from "express";

const IGNORED_PATHS = [
  "/operations/debug-submit",
  "/activity-logs/archive",
  "/auth/logout",
  "/report-forms/operations/latest",
  "/notifications",
  "/notifications/read ",
  "/notifications/stream",
];
const INVENTORY_TRANSACTION_PATHS = ["/inventory/stock-in", "/inventory/adjust"];

export const activityAuditMiddleware: RequestHandler = (req, res, next) => {
  const method = req.method.toUpperCase();
  if (["GET", "HEAD", "OPTIONS"].includes(method)) {
    next();
    return;
  }

  const requestPath = req.originalUrl.split("?")[0] ?? req.path;
  const apiPath = requestPath.replace(/^\/api/, "") || "/";
  if (IGNORED_PATHS.some((ignoredPath) => apiPath.startsWith(ignoredPath))) {
    next();
    return;
  }

  res.on("finish", () => {
    const hasInventoryTransaction = INVENTORY_TRANSACTION_PATHS.includes(apiPath);
    if (hasInventoryTransaction && res.statusCode < 400) return;

    const responseActorId = res.locals["activityActorId"];
    const actorId = req.user?.userId ?? (typeof responseActorId === "string" ? responseActorId : undefined);
    const responseActorName = res.locals["activityActorName"];
    const actorName = typeof responseActorName === "string" ? responseActorName : undefined;
    const responseRecordId = res.locals["activityRecordId"];
    const recordId = typeof responseRecordId === "string" ? responseRecordId : undefined;
    if (!actorId && !actorName) return;
    if (!actorId && res.statusCode >= 400) return;

    void activityLogsService.recordRequest({
      ...(actorId ? { actorId } : {}),
      ...(actorName ? { actorName } : {}),
      ...(recordId ? { recordId } : {}),
      method,
      path: apiPath,
      statusCode: res.statusCode,
    }).catch((error: unknown) => {
      console.error("Could not write activity log:", error);
    });
  });

  next();
};
