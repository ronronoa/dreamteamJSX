import { API_URL } from "./config";
import { apiFetch } from "./apiFetch";
import type { Role } from "@/types/auth";

export interface UserProfileData {
  id: string;
  name: string;
  username: string;
  email: string | null;
  role: Role;
  phone: string | null;
  profileImageUrl: string | null;
  isActive: boolean;
  team_id: string | null;
  team_name: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileInput {
  name: string;
  username: string;
  email: string;
  phone: string | null;
}

async function request<T>(path: string, accessToken: string, options: RequestInit = {}): Promise<T> {
  const response = await apiFetch(path, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    },
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.message ?? `Request failed (${response.status})`);
  }
  return result as T;
}

export async function fetchUserProfile(accessToken: string) {
  const result = await request<{ user: UserProfileData }>("/users/me", accessToken);
  return result.user;
}

export async function updateUserProfile(accessToken: string, input: UpdateProfileInput) {
  const result = await request<{ user: UserProfileData }>("/users/me", accessToken, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
  return result.user;
}

export async function uploadProfilePhoto(accessToken: string, file: File) {
  const formData = new FormData();
  formData.append("image", file);
  const response = await apiFetch("/users/me/avatar", {
    method: "POST",
    credentials: "include",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message ?? `Upload failed (${response.status})`);
  return (result as { user: UserProfileData }).user;
}

export function getProfilePhotoSource(imageUrl: string | null) {
  if (!imageUrl) return undefined;
  const apiOrigin = API_URL.replace(/\/api\/?$/, "");
  return `${apiOrigin}${imageUrl}`;
}
