import { API_URL } from "./config";
import type { UserSession } from "../types/auth";


/*
 * TODO:
 * Change later for backend endpoint
 */
export async function login(email: string, password: string): Promise<UserSession | null>{
  const res = await fetch(`${API_URL}/accounts/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
    body: JSON.stringify({email, password}),
  });
  if (!res.ok) return null;
  return await res.json();
}


export async function logout(): Promise<void>{
  await fetch(`${API_URL}/accounts/logout`, {
    method: "POST",
    credentials: "include"
  });
}

export async function checkSession(): Promise<UserSession | null> {
  try {
    const res = await fetch(`${API_URL}/accounts/check-session`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) return null;

    return await res.json();
  } catch {
    return null;
  }
}
