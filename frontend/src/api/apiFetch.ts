import { API_URL } from "./config";

type RefreshResponse = { accessToken?: string };
let refreshInFlight: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  if (!refreshInFlight) {
    refreshInFlight = (async () => {
      try {
        const response = await fetch(`${API_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });
        if (!response.ok) return null;

        const session = await response.json().catch(() => null) as RefreshResponse | null;
        return session?.accessToken ?? null;
      } catch {
        return null;
      }
    })();
  }

  try {
    return await refreshInFlight;
  } finally {
    refreshInFlight = null;
  }
}

/** Fetch an API endpoint and retry once after refreshing an expired access token. */
export async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const url = `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const headers = new Headers(options.headers);
  const opts: RequestInit = { ...options, headers, credentials: "include" };

  let response = await fetch(url, opts);
  if (response.status !== 401 || path === "/auth/refresh") return response;

  const accessToken = await refreshAccessToken();
  if (!accessToken) return response;

  headers.set("Authorization", `Bearer ${accessToken}`);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("auth:access-token-refreshed", {
      detail: { accessToken },
    }));
  }
  return fetch(url, opts);
}
