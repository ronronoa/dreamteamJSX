import { createContext, useContext, useEffect, useState} from "react";
import type { ReactNode } from "react";
import { checkSession, logout as apiLogout} from "../api/auth";
import type { UserSession } from "../types/auth";


/** Authentication state and actions shared throughout the app. */
interface AuthContextType {
  session: UserSession | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}

/**
 * Shares the current signed-in session and authentication actions.
 *
 * Usually, use {@link useAuth} instead of consuming this context directly.
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provides authentication state to its child components.
 *
 * Wrap the application once, usually at the root:
 * ```tsx
 * <AuthProvider><App /></AuthProvider>
 * ```
 */
export function AuthProvider({children}: {children: ReactNode}){
  const [session, setSession] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  async function refresh(){
    const data = await checkSession();
    setSession(data);
  }

  useEffect(() => {
    (async () => {
      await refresh();
      setLoading(false);
    })();
  }, [])

  async function logout(){
    await apiLogout();
    setSession(null);
  }

  return (
    <AuthContext.Provider value={{session, loading, refresh, logout}}>
      {children}
    </AuthContext.Provider>

  )
}

/**
 * Gets the current authentication state and actions.
 *
 * Must be called inside an {@link AuthProvider}.
 * ```tsx
 * const { session, loading, logout } = useAuth();
 * ```
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
