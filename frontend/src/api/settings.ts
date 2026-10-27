import { apiFetch } from "./apiFetch"

export interface WorkspaceSettings {
  systemName: string
  officeName: string
  officeHotline: string
  archiveRetention: string
}

export interface UserPreferences {
  lowStockAlerts: boolean
  approvalNotifications: boolean
  sessionTimeout: "15-min" | "30-min" | "1-hour" | "2-hours"
}

export interface SettingsResponse {
  workspace: WorkspaceSettings
  preferences: UserPreferences
  globalPinConfigured: boolean
}

async function request<T>(path: string, accessToken: string, method = "GET", body?: unknown): Promise<T> {
  const response = await apiFetch(path, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })
  const result = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(result.message ?? `Request failed (${response.status})`)
  return result as T
}

export const fetchSettings = (token: string) => request<SettingsResponse>("/settings", token)
export const updateWorkspaceSettings = (token: string, settings: Partial<WorkspaceSettings>) =>
  request<SettingsResponse>("/settings/workspace", token, "PATCH", settings)
export const updateUserPreferences = (token: string, preferences: Partial<UserPreferences>) =>
  request<SettingsResponse>("/settings/preferences", token, "PATCH", preferences)
export const setGlobalPin = (token: string, pin: string) =>
  request<{ success: boolean }>("/settings/global-pin", token, "PUT", { pin })
