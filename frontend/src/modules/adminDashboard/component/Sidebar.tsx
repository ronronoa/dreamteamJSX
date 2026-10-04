import CommonDashboardSidebar from "../../../components/common/layout/CommonDashboardSidebar";
import type { Role } from "../../../types/auth";
import { dashboardSectionsByRole } from "../DashboardNav";

interface SidebarProps {
  role: Role;
  activeHref?: string;
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function Sidebar({
  role,
  activeHref,
  open,
  onClose,
  onLogout,
}: SidebarProps) {
  return (
    <CommonDashboardSidebar
      sections={dashboardSectionsByRole[role]}
      activeHref={activeHref}
      open={open}
      onClose={onClose}
      onNavigate={onClose}
      onLogout={onLogout}
    />
  );
}
