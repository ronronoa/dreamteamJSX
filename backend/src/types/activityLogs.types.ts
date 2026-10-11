import type { ActivityLogsQuerySchema } from "@/schemas/activityLogs.schema";
import type { z } from "zod";

export type ActivityLogsQuery = z.infer<typeof ActivityLogsQuerySchema>;
export type ActivityStatus = "Success" | "Failed" | "Warning";

export interface ActivityLogInput {
  actorId?: string;
  module: string;
  action: string;
  recordId: string | null;
  status: ActivityStatus;
  details: string;
}
