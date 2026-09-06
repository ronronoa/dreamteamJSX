import { Navigate } from "react-router";
import LoadingScreen from "../components/common/LoadingScreen";
import { useAuth } from "../context/AuthContext"
import { ROUTES } from "../routes";

/**
 * Page to check user's session and navigate them according to their current session
 **/
export default function Home(){
  const { session, loading } = useAuth();


  if (loading) return <LoadingScreen/>
  if (session?.role == 'DEPARTMENT_HEAD') return <Navigate to={ROUTES.ADMIN_DASHBOARD}/>
  // if (session?.role == 'DEPUTY') return <Navigate to={ROUTES.ADMIN_DASHBOARD}/>
  // if (session?.role == 'TEAM_LEADER') return <Navigate to={ROUTES.CHOOSE_FORM}/>
  // if (session?.role == 'MEMBER') return <Navigate to={ROUTES.CHOOSE_FORM}/>
  return <Navigate to={ROUTES.LOGIN}/>
}
