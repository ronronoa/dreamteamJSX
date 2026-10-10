import { apiFetch } from "./apiFetch";
import type { ManagedUser, Role } from "@/types/auth";

export interface ManagedUserInput {
  name: string;
  username: string;
  email: string;
  role: Role;
  phone: string | null;
  isActive: boolean;
  team_id: string | null;
}

export interface TeamOption {
  team_id: string;
  team_name: string;
}

async function request<T>(path: string, accessToken: string, options: RequestInit = {}): Promise<T> {
  const response = await apiFetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message ?? `Request failed (${response.status})`);
  }
  return data as T;
}

export async function fetchManagedUsers(accessToken: string) {
  const result = await request<{ users: ManagedUser[] }>("/users", accessToken);
  return result.users;
}

export async function fetchTeams(accessToken: string) {
  const result = await request<{ teams: TeamOption[] }>("/teams", accessToken);
  return result.teams;
}

export async function createManagedUser(accessToken: string, input: ManagedUserInput & { password: string }) {
  return request<{ user: ManagedUser }>("/users", accessToken, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateManagedUser(accessToken: string, id: string, input: ManagedUserInput) {
  return request<{ user: ManagedUser }>(`/users/${id}`, accessToken, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export async function deactivateManagedUser(accessToken: string, id: string) {
  return request<{ success: boolean }>(`/users/${id}`, accessToken, { method: "DELETE" });
}

export async function resetManagedUserPassword(accessToken: string, id: string, newPassword: string) {
  return request<{ success: boolean }>(`/users/${id}/reset-password`, accessToken, {
    method: "POST",
    body: JSON.stringify({ newPassword }),
  });
}
