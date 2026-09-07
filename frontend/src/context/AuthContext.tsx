import { createContext, useContext, useEffect, useState} from "react";
import type { ReactNode } from "react";
import { refresh as apiRefresh,login as apiLogin, logout as apiLogout} from "../api/auth";
import type { UserSession } from "../types/auth";


/** Authentication state and actions shared throughout the app. */
interface AuthContextType {
  session: UserSession | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
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

  async function login(username: string, password: string) {
    const data = await apiLogin(username, password);
    if (!data) return false;
    setSession(data);
    return true;
  }

  async function refresh(){
    const data = await apiRefresh();
    if (!data) return;
    setSession(data);
  }

  useEffect(() => {
    (async () => {
      await refresh();
      setLoading(false);
    })();
  }, [])

  async function logout(){
    setLoading(true);
    await apiLogout();
    setSession(null);
    setLoading(false);
  }

  return (
    <AuthContext.Provider value={{session, loading, login, refresh, logout}}>
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
