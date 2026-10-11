import { API_URL } from "./config";
import { apiFetch } from "./apiFetch";
import type { UserSession } from "../types/auth";

let sessionCheckInFlight: Promise<UserSession | null> | null = null;

export async function login(identifier: string, password: string): Promise<UserSession | null>{
  const res = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
    body: JSON.stringify({identifier, password}),
  });
  if (!res.ok) return null;
  return await res.json();
}

export async function changePassword(accessToken: string, currentPassword: string, newPassword: string): Promise<string> {
  const response = await apiFetch("/auth/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.message ?? `Request failed (${response.status})`);
  }
  return result.accessToken as string;
}

export async function setPin(accessToken: string, pin: string) {
  const response = await apiFetch("/auth/set-pin", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ pin }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message ?? `Request failed (${response.status})`);
  return result as { success: boolean };
}


export async function logout(): Promise<void>{
  await apiFetch("/auth/logout", {
    method: "POST",
    credentials: "include"
  });
}

export async function refresh(accessToken?: string): Promise<UserSession | null> {
  if (sessionCheckInFlight) return sessionCheckInFlight;

  const headers = new Headers();
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

  sessionCheckInFlight = (async () => {
    try {
      const response = await fetch(`${API_URL}/auth/checksession`, {
        method: "GET",
        headers,
        credentials: "include",
      });

      if (!response.ok) return null;
      return await response.json() as UserSession;
    } catch {
      return null;
    }
  })();

  try {
    return await sessionCheckInFlight;
  } finally {
    sessionCheckInFlight = null;
  }
}
