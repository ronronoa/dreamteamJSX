import { API_URL } from "./config";
import { apiFetch } from "./apiFetch";
import type { UserSession } from "../types/auth";


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


export async function logout(): Promise<void>{
  await apiFetch("/auth/logout", {
    method: "POST",
    credentials: "include"
  });
}

export async function refresh(): Promise<UserSession | null> {
  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) return null;

    return await res.json();
  } catch {
    return null;
  }
}
