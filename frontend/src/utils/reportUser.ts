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

export function formatReportUser(user: ReportUser | null | undefined, fallback: string): string {
  if (!user) return fallback;

  const role = ROLE_LABELS[user.role] ?? user.role.replaceAll("_", " ");
  return `${user.name} (@${user.username}) · ${role}`;
}
