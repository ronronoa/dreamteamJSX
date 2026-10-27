import { apiFetch } from "./apiFetch";

export interface ActivityLogRecord {
  id: string;
  date: Date;
  user: string;
  userId: string;
  role: string;
  module: string;
  action: string;
  recordId: string | null;
  status: "Success" | "Failed" | "Warning";
  details: string;
  pinType: string | null;
  pinOwnerId: string | null;
  pinOwnerName: string | null;
  pinOwnerRole: string | null;
}

export interface ActivityLogStats {
  totalCount: number;
  todayCount: number;
  currentActiveCount: number;
  loggedInTodayCount: number;
  importantActionCount: number;
}

export interface ActivityLogPage {
  logs: ActivityLogRecord[];
  stats: ActivityLogStats;
  page: number;
  pageSize: number;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.message ?? `Request failed (${response.status})`);
  }
  return result as T;
}

export async function fetchActivityLogs(
  accessToken: string,
  page: number,
  pageSize: number,
): Promise<ActivityLogPage> {
  const response = await apiFetch(`/activity-logs?page=${page}&pageSize=${pageSize}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const result = await parseResponse<Omit<ActivityLogPage, "logs"> & {
    logs: Array<Omit<ActivityLogRecord, "date"> & { date: string }>;
  }>(response);

  return {
    ...result,
    logs: result.logs.map((log) => ({ ...log, date: new Date(log.date) })),
  };
}

export async function archiveActivityLogs(accessToken: string) {
  const response = await apiFetch("/activity-logs/archive", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return parseResponse<{ archivedCount: number }>(response);
}

export async function exportActivityLogs(accessToken: string) {
  const response = await apiFetch("/activity-logs/export", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new Error(result.message ?? `Request failed (${response.status})`);
  }
  return response.blob();
}
