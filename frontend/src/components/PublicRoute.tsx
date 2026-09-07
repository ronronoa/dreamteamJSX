import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";
import LoadingScreen from "./common/LoadingScreen";
import { ROUTES } from "../routes";

/**
 */
export default function PublicRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();


  if (loading) return <LoadingScreen/>;
  if (session) return <Navigate to={ROUTES.ROOT} replace />;
  return <>{children}</>;
}
