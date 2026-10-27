import { createActivityLog } from "@/sql/activityLogs";
import type { ActivityLogInput, ActivityStatus, ReportPinType } from "@/types/activityLogs.types";
import { notificationsService } from "@/services/notifications.service";

const UUID_PATTERN = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

function getModule(path: string) {
  if (path.startsWith("/report-forms/operations")) return "Operations";
  if (path.startsWith("/report-forms/patients")) return "Patients";
  if (path.startsWith("/report-forms/vehicular-dispatches")) return "Dispatch";
  if (path.startsWith("/vehicular-dispatches")) return "Dispatch";
  if (path.startsWith("/auth")) return "Authentication";
  if (path.startsWith("/users")) return "Users";
  if (path.startsWith("/operations") || path.startsWith("/teams")) return "Operations";
  if (path.startsWith("/inventory")) return "Inventory";
  if (path.startsWith("/patients")) return "Patients";
  if (path.startsWith("/vehicles") || path.startsWith("/dispatch")) return "Dispatch";
  return "System";
}

function getAction(method: string, path: string, module: string) {
  const normalizedPath = path.toLowerCase();
  if (method === "POST" && normalizedPath === "/report-forms/operations") return "Submitted operation report";
  if (method === "POST" && normalizedPath === "/report-forms/patients") return "Submitted patient report";
  if (method === "POST" && normalizedPath === "/report-forms/vehicular-dispatches") return "Submitted vehicle dispatch report";
  if (normalizedPath.includes("/login") || normalizedPath.includes("/signin")) return "Signed in";
  if (normalizedPath.includes("/signup")) return "Created account";
  if (normalizedPath.includes("/logout")) return "Signed out";
  if (normalizedPath.includes("/session") || normalizedPath.includes("/refresh")) return "Refreshed session";
  if (normalizedPath.includes("/change-password")) return "Changed password";
  if (normalizedPath.includes("/validate")) return "Validated operation";
  if (normalizedPath.includes("/reject")) return "Rejected operation";
  if (normalizedPath.includes("/authorize")) return "Authorized operation";
  if (normalizedPath.includes("/submit")) return "Submitted report";
  if (normalizedPath.includes("/stock-in")) return "Stocked in inventory";
  if (normalizedPath.includes("/adjust")) return "Adjusted inventory";
  if (normalizedPath.includes("/reset-password")) return "Reset user password";
  if (normalizedPath.includes("/archive")) return "Archived records";

  if (method === "POST") return `Created ${module.toLowerCase()} record`;
  if (method === "PATCH" || method === "PUT") return `Updated ${module.toLowerCase()} record`;
  if (method === "DELETE") return `Deleted ${module.toLowerCase()} record`;
  return `Changed ${module.toLowerCase()} record`;
}

export const activityLogsService = {
  async recordRequest(input: {
    actorId?: string;
    actorName?: string;
    recordId?: string;
      pinType?: ReportPinType;
      pinOwnerId?: string;
      pinOwnerName?: string;
      pinOwnerRole?: string;
    method: string;
    path: string;
    statusCode: number;
  }) {
    const module = getModule(input.path);
    const status: ActivityStatus = input.statusCode >= 500
      ? "Failed"
      : input.statusCode >= 400
        ? "Warning"
        : "Success";
    const recordId = input.recordId ?? input.path.match(UUID_PATTERN)?.[0] ?? null;
    const action = getAction(input.method, input.path, module);
    const details = `${input.method} ${input.path} · HTTP ${input.statusCode}`;

    const activity: ActivityLogInput = {
      ...(input.actorId ? { actorId: input.actorId } : {}),
      ...(input.actorName ? { actorName: input.actorName } : {}),
      ...(input.pinType ? { pinType: input.pinType } : {}),
      ...(input.pinOwnerId ? { pinOwnerId: input.pinOwnerId } : {}),
      ...(input.pinOwnerName ? { pinOwnerName: input.pinOwnerName } : {}),
      ...(input.pinOwnerRole ? { pinOwnerRole: input.pinOwnerRole } : {}),
      module,
      action,
      recordId,
      status,
      details,
    };

    const result = await createActivityLog(activity);
    if (status === "Success" && action.startsWith("Submitted ")) {
      await notificationsService.createApprovalNotifications(result)
    }
    if (status === "Success" && module === "Inventory") {
      await notificationsService.syncLowStockNotifications()
    }
    return result;
  },
};
