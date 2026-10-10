import {
  Archive,
  ClipboardList,
  FileText,
  HeartPulse,
  LayoutDashboard,
  Package,
  Settings,
  Truck,
  User,
  Users,
  RotateCwFadingClock
} from "lucide-react";

import type { DashboardSidebarSection } from "../../components/common/layout/CommonDashboardSidebar";
import type { Role } from "../../types/auth";
import { ROUTES } from "../../routes";

const D = ROUTES.DASHBOARD;

const dashboardItem = { label: "TODO:Dashboard", href: D.ROOT, icon: LayoutDashboard };

const operationItems = [
  { label: "TODO:Operation Log Records", href: D.OPERATIONS, icon: ClipboardList },
  { label: "TODO:Patient Log Records",   href: D.PATIENTS,   icon: HeartPulse },
  { label: "TODO:Vehicle Log Records",   href: D.VEHICLES,   icon: Truck },
  { label: "TODO:Inventory",             href: D.INVENTORY,  icon: Package },
];

const archiveItem  = { label: "TODO:Archived Logs", href: D.ARCHIVES, icon: Archive };
const profileItem  = { label: "User Profile",  href: D.PROFILE,  icon: User };
const activityItem  = { label: "TODO:Activity Logs",  href: D.ACTIVITYLOGS,  icon: RotateCwFadingClock };
const reportsItem  = { label: "TODO:Reports",       href: D.REPORTS,  icon: FileText };
const settingsItem = { label: "TODO:Settings",      href: D.SETTINGS, icon: Settings };
const usersItem    = { label: "Manage Users",  href: D.MANAGEUSERS,    icon: Users };

const defaultSections: DashboardSidebarSection[] = [];

const superAdminSections: DashboardSidebarSection[] = [
  { label: "Main", items: [dashboardItem] },
  {
    label: "Administration",
    items: [usersItem, profileItem, settingsItem],
  },
];

const departmentHeadSections: DashboardSidebarSection[] = [
  { label: "Main", items: [dashboardItem] },
  { label: "Operations", items: operationItems },
  { label: "Archives", items: [archiveItem] },
  {
    label: "Administration",
    items: [activityItem, profileItem, reportsItem, settingsItem],
  },
];

const departmentDeputySections: DashboardSidebarSection[] = [
  { label: "Main", items: [dashboardItem] },
  { label: "Operations", items: operationItems },
  {
    label: "Administration",
    items: [profileItem, reportsItem, settingsItem],
  },
];

const teamLeadSections: DashboardSidebarSection[] = [
  {
    label: "Operations",
    items: [
      { label: "Operation Log Records", href: D.OPERATIONS, icon: ClipboardList },
      { label: "Patient Log Records",   href: D.PATIENTS,   icon: HeartPulse },
      { label: "Vehicle Log Records",   href: D.VEHICLES,   icon: Truck },
    ],
  },
  { label: "Administration", items: [profileItem] },
];

export const dashboardSectionsByRole: Record<Role, DashboardSidebarSection[]> = {
  SUPER_ADMIN: superAdminSections,
  DEPARTMENT_HEAD: departmentHeadSections,
  DEPUTY: departmentDeputySections,
  TEAM_LEADER: teamLeadSections,
  MEMBER: defaultSections,
};

/**
 * Resolve a pathname to its sidebar label — used by the header breadcrumb.
 * Falls back to "Dashboard" if the path isn't in the current role's nav.
 */
export function getNavLabel(role: Role, pathname: string): string {
  for (const section of dashboardSectionsByRole[role]) {
    const item = section.items.find((i) => i.href === pathname);
    if (item)
      return item.label;
  }
  return "Dashboard";
}
