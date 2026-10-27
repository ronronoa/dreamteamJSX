import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword as apiChangePassword, refresh as apiRefresh, login as apiLogin, logout as apiLogout } from "@/api/auth";
import type { UserProfileData } from "@/api/profile";
import type { AppDispatch, RootState } from "@/store";
import { setLoading, setSession, updateProfile } from "@/store/authSlice";
import type { UserSession } from "@/types/auth";

/** Reads and updates authentication state held in the in-memory Redux store. */
export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const session = useSelector((state: RootState) => state.auth.session);
  const loading = useSelector((state: RootState) => state.auth.loading);

  async function login(identifier: string, password: string) {
    const nextSession = await apiLogin(identifier, password);
    if (!nextSession) return false;
    dispatch(setSession(nextSession));
    return true;
  }

  const refresh = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const nextSession = await apiRefresh();
      dispatch(setSession(nextSession));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const logout = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      await apiLogout();
    } finally {
      dispatch(setSession(null));
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  function updateProfileSession(profile: UserProfileData) {
    dispatch(updateProfile(profile));
  }

  async function changePassword(currentPassword: string, newPassword: string) {
    if (!session) throw new Error("You must be signed in to change your password.");
    const accessToken = await apiChangePassword(session.accessToken, currentPassword, newPassword);
    dispatch(setSession({ ...session, accessToken }));
  }

  function setSessionAfterPasswordReset(nextSession: UserSession) {
    dispatch(setSession(nextSession));
  }

  return {
    session,
    loading,
    login,
    refresh,
    logout,
    updateProfileSession,
    changePassword,
    setSessionAfterPasswordReset,
  };
}
