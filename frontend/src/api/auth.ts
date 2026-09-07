import { API_URL } from "../api/config";


// temporary stuff
export interface Session {
  userId: string;
  username: string;
}

/*
 * TODO:
 * Change later for backend endpoint
 */
export async function login(email: string, password: string): Promise<Session | null>{
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

export async function checkSession(): Promise<Session | null> {
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
