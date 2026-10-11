import type { ActivityLogStats } from "@/api/activityLogs";

export const PAGE_SIZE = 10;

export const EMPTY_STATS: ActivityLogStats = {
  totalCount: 0,
  todayCount: 0,
  currentActiveCount: 0,
  loggedInTodayCount: 0,
  importantActionCount: 0,
};

export const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  DEPARTMENT_HEAD: "Department Head",
  DEPUTY: "Deputy",
  TEAM_LEADER: "Team Leader",
  MEMBER: "Member",
};

export const STATUS_VARIANTS = {
  Success: "success",
  Failed: "failed",
  Warning: "warning",
} as const;
