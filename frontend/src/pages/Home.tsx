import { Navigate } from "react-router";
import LoadingScreen from "../components/common/LoadingScreen";
import { useAuth } from "../context/AuthContext"
import { ROUTES } from "../routes";

/**
 * Page to check user's session and navigate them according to their current session
 **/
export default function Home() {
  const { session, loading } = useAuth();
  if (loading) return <LoadingScreen/>;

  if (!session) return <Navigate to={ROUTES.LOGIN} replace/>;

  const role = session.user?.role;
  if (role === 'DEPARTMENT_HEAD' || role === 'DEPUTY' || role === 'TEAM_LEADER') {
    return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace/>;
  }
  if (role === 'MEMBER') {
    return <Navigate to={ROUTES.CHOOSE_FORM} replace/>;
  }

  // session exists but role matches nothing known — never send this case to LOGIN,
  // session already exists so PublicRoute would just bounce it right back
  return <Navigate to={ROUTES.CHOOSE_FORM} replace/>;
}
