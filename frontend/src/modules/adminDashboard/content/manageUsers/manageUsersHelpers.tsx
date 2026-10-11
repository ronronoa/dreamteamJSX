import { Search } from "lucide-react";
import type { InputBaseProps } from "@/components/base/input/input";
import type { ManagedUser, Role } from "@/types/auth";

export const SearchInputIcon: NonNullable<InputBaseProps["icon"]> = ({ className }) => (
  <Search size={14} className={className} />
);

export const roleLabels: Record<Role, string> = {
  SUPER_ADMIN: "Super Admin",
  DEPARTMENT_HEAD: "Department Head",
  DEPUTY: "Deputy",
  TEAM_LEADER: "Team Leader",
  MEMBER: "Member",
};

export function getDeactivationBlockReason(
  user: ManagedUser,
  currentUserId: string | undefined,
  activeSuperAdminCount: number,
) {
  if (user.id === currentUserId) return "You cannot deactivate your own account.";
  if (user.role === "SUPER_ADMIN" && activeSuperAdminCount <= 1) {
    return "At least one active Super Admin account must remain.";
  }
  return null;
}
