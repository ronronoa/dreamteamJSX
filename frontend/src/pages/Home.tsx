import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../routes";

const ADMIN_ROLES = [
  "SUPER_ADMIN",
  "DEPARTMENT_HEAD",
  "DEPUTY",
  "TEAM_LEADER",
];

/**
 * Redirects users based on their authentication status and role.
 */
export default function Home() {
  const { session, loading } = useAuth();

  if (loading) return

  if (!session) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  const { role } = session.user;

  if (ADMIN_ROLES.includes(role)) {
    return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
  }

  return <Navigate to={ROUTES.CHOOSE_FORM} replace />;
}
