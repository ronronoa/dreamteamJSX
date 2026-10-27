import axios from "axios";
import { API_URL } from "./config";
import type { UserSession } from "@/types/auth";

let refreshInFlight: Promise<UserSession | null> | null = null;

/** Rotates the HttpOnly refresh cookie and returns an access token for memory. */
export function refreshSession(): Promise<UserSession | null> {
  if (!refreshInFlight) {
    refreshInFlight = (async () => {
      try {
        const response = await axios.post<UserSession>(`${API_URL}/auth/refresh`, undefined, {
          headers: { "X-Requested-With": "XMLHttpRequest" },
          withCredentials: true,
        });
        return response.data;
      } catch {
        return null;
      }
    })();
  }

  const currentRefresh = refreshInFlight;
  return currentRefresh.finally(() => {
    if (refreshInFlight === currentRefresh) refreshInFlight = null;
  });
}
