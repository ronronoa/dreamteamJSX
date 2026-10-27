import type { ActivityLogsQuerySchema } from "@/schemas/activityLogs.schema";
import type { z } from "zod";

export type ActivityLogsQuery = z.infer<typeof ActivityLogsQuerySchema>;
export type ActivityStatus = "Success" | "Failed" | "Warning";
export type ReportPinType = "GLOBAL" | "USER" | "TEAM_LEADER" | "DEPARTMENT_HEAD";

export interface ActivityLogInput {
  actorId?: string;
  actorName?: string;
  module: string;
  action: string;
  recordId: string | null;
  status: ActivityStatus;
  details: string;
  pinType?: ReportPinType;
  pinOwnerId?: string | null;
  pinOwnerName?: string | null;
  pinOwnerRole?: string | null;
}
