const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  DEPARTMENT_HEAD: "Department Head",
  DEPUTY: "Deputy",
  TEAM_LEADER: "Team Leader",
  MEMBER: "Member",
};

export interface ReportUser {
  name: string;
  username: string;
  role: string;
}

export function formatUserRole(role: string): string {
  return ROLE_LABELS[role] ?? role.replaceAll("_", " ");
}

export function formatReportUser(user: ReportUser | null | undefined, fallback: string): string {
  if (!user) return fallback;

  return `${user.name} (@${user.username}) · ${formatUserRole(user.role)}`;
}
