import { apiFetch } from "./apiFetch";
import type { ManagedUser, Role } from "@/types/auth";

export interface ManagedUserInput {
  pin?: string;
  password?: string;
  name: string;
  firstName?: string | null;
  lastName?: string | null;
  middleInitial?: string | null;
  suffix?: string | null;
  username: string;
  email: string | null;
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

export async function createTeam(accessToken: string, teamName: string) {
  return request<{ team: TeamOption; restored: boolean }>("/teams", accessToken, {
    method: "POST",
    body: JSON.stringify({ team_name: teamName }),
  });
}

export async function updateTeam(accessToken: string, teamId: string, teamName: string) {
  return request<{ team: TeamOption }>(`/teams/${teamId}`, accessToken, {
    method: "PATCH",
    body: JSON.stringify({ team_name: teamName }),
  });
}

export async function deleteTeam(accessToken: string, teamId: string) {
  return request<{ success: boolean }>(`/teams/${teamId}`, accessToken, { method: "DELETE" });
}

export async function createManagedUser(accessToken: string, input: ManagedUserInput) {
  return request<{ user: ManagedUser; generatedPin: string }>("/users", accessToken, {
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

export async function revealManagedUserPin(accessToken: string, id: string) {
  return request<{ pin: string }>(`/users/${id}/reveal-pin`, accessToken, { method: "POST" });
}
