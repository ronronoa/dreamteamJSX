import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

import { useAuth } from "@/context/AuthContext";
import { dashboardSectionsByRole } from "@/modules/adminDashboard/DashboardNav";

export default function RoleGuard({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const { pathname } = useLocation();

  const role = session?.user?.role ?? "MEMBER";

  const allowedPaths = dashboardSectionsByRole[role]
    .flatMap((section) => section.items.map((item) => item.href))
    .filter((href): href is string => Boolean(href));

  if (!allowedPaths.includes(pathname)) {
    // Send them to the first page their role can actually see.
    // Falls back to /login if the config has nothing (i.e. MEMBER).
    return <Navigate to={allowedPaths[0] ?? "/login"} replace />;
  }

  return <>{children}</>;
}
