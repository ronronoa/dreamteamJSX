import { activityLogsService } from "@/services/activityLogs.service";
import type { ReportPinType } from "@/types/activityLogs.types";
import type { RequestHandler } from "express";

const REPORT_PIN_TYPES = new Set<ReportPinType>(["GLOBAL", "USER", "TEAM_LEADER", "DEPARTMENT_HEAD"]);

function getReportPinType(value: unknown): ReportPinType | undefined {
  if (typeof value !== "string" || !REPORT_PIN_TYPES.has(value as ReportPinType)) return undefined;
  return value as ReportPinType;
}

const IGNORED_PATHS = [
  "/operations/debug-submit",
  "/activity-logs/archive",
  "/auth/logout",
  "/auth/refresh",
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
    const actorId = typeof responseActorId === "string" ? responseActorId : req.user?.userId;
    const responseActorName = res.locals["activityActorName"];
    const actorName = typeof responseActorName === "string" ? responseActorName : undefined;
    const responseRecordId = res.locals["activityRecordId"];
    const recordId = typeof responseRecordId === "string" ? responseRecordId : undefined;
    const responseErrorMessage = res.locals["activityErrorMessage"];
    const errorMessage = typeof responseErrorMessage === "string" ? responseErrorMessage : undefined;
    const pinType = getReportPinType(res.locals["activityPinType"]);
    const pinOwnerId = res.locals["activityPinOwnerId"];
    const pinOwnerName = res.locals["activityPinOwnerName"];
    const pinOwnerRole = res.locals["activityPinOwnerRole"];
    const isSignInAttempt = method === "POST" && apiPath === "/auth/signin";
    if (!actorId && !actorName) return;
    if (!actorId && res.statusCode >= 400 && !isSignInAttempt) return;

    void activityLogsService.recordRequest({
      ...(actorId ? { actorId } : {}),
      ...(actorName ? { actorName } : {}),
      ...(recordId ? { recordId } : {}),
      ...(errorMessage ? { errorMessage } : {}),
      ...(pinType ? { pinType } : {}),
      ...(typeof pinOwnerId === "string" ? { pinOwnerId } : {}),
      ...(typeof pinOwnerName === "string" ? { pinOwnerName } : {}),
      ...(typeof pinOwnerRole === "string" ? { pinOwnerRole } : {}),
      method,
      path: apiPath,
      statusCode: res.statusCode,
    }).catch((error: unknown) => {
      console.error("Could not write activity log:", error);
    });
  });

  next();
};
