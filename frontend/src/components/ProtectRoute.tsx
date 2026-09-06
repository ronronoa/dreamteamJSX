import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";
import LoadingScreen from "./common/LoadingScreen";
import { ROUTES } from "../routes";


interface ProtectedRouteProps {
  skip: boolean;
  children: ReactNode;
}

/**
 * Checks auth session first before showing page
 **/
export default function ProtectedRoute({skip = false, children}: ProtectedRouteProps) {
  const { session, loading } = useAuth();


  if (loading && !skip) return <LoadingScreen/>;
  if (!session && !skip) return <Navigate to={ROUTES.LOGIN} replace />;
  return <>{children}</>;
}
