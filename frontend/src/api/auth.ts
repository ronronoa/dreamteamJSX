import { API_URL } from "./config";
import type { UserSession } from "../types/auth";


/*
 * TODO:
 * Change later for backend endpoint
 */
export async function login(username: string, password: string): Promise<UserSession | null>{
  const res = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
    body: JSON.stringify({username, password}),
  });
  if (!res.ok) return null;
  return await res.json();
}


export async function logout(): Promise<void>{
  await fetch(`${API_URL}/auth/logout`, {
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
