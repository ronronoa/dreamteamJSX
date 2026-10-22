import {
  archiveActivityLogs,
  exportActivityLogs,
  listActivityLogs,
} from "@/sql/activityLogs";
import type { ActivityLogsQuery } from "@/types/activityLogs.types";

export const activityLedgerService = {
  list(query: ActivityLogsQuery) {
    return listActivityLogs(query);
  },

  async archive(actorId: string) {
    const result = await archiveActivityLogs(actorId);
    return { archivedCount: result.count };
  },

  export() {
    return exportActivityLogs();
  },
};
