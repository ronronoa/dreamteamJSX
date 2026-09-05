import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";
import LoadingScreen from "./common/LoadingScreen";
import { ROUTES } from "../routes";

/**
 * Checks auth session first before showing page
 **/
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();


  if (loading) return <LoadingScreen/>;
  if (!session) return <Navigate to={ROUTES.CHOOSE_FORM} replace />;
  // return <>{children}</>;
  return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
}
