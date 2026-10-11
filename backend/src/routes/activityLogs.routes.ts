import { activityLogsController } from "@/controllers/activityLogs.controller";
import { requireAuth, requireRole } from "@/middleware/auth.middleware";
import { Router } from "express";

export const activityLogsRoutes = Router();
const auditManagers = [requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD")];

activityLogsRoutes.get("/activity-logs", ...auditManagers, activityLogsController.list);
activityLogsRoutes.get("/activity-logs/export", ...auditManagers, activityLogsController.export);
activityLogsRoutes.post("/activity-logs/archive", ...auditManagers, activityLogsController.archive);
