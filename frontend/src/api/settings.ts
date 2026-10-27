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
  sessionTimeout: "1-min" | "15-min" | "30-min" | "1-hour" | "2-hours"
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

export async function downloadDatabaseBackup(token: string): Promise<void> {
  const response = await apiFetch("/settings/database-backup", {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) {
    const result = await response.json().catch(() => ({}))
    throw new Error(result.message ?? `Request failed (${response.status})`)
  }

  const backupBlob = await response.blob()
  const objectUrl = URL.createObjectURL(backupBlob)
  const link = document.createElement("a")
  link.href = objectUrl
  link.download = getBackupFilename(response.headers.get("Content-Disposition"))
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000)
}

function getBackupFilename(contentDisposition: string | null): string {
  const filename = contentDisposition?.match(/filename="([^"]+)"/)?.[1]
  return filename ?? "elms-database-backup.dump"
}
