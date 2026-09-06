import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";
import { ROUTES } from "../routes";

/**
 */
export default function PublicRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();


  if (!session || loading) return <>{children}</>
  if (session) return <Navigate to={ROUTES.ROOT} replace />;
}
