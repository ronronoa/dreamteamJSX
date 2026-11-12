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

export async function downloadDatabaseBackup(token: string, password: string): Promise<{ filename: string; checksum: string }> {
  const response = await apiFetch("/settings/database-backup", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  })
  if (!response.ok) {
    const result = await response.json().catch(() => ({}))
    throw new Error(result.message ?? `Request failed (${response.status})`)
  }

  const backupBlob = await response.blob()
  const checksum = response.headers.get("X-Backup-SHA256")
  if (!checksum || !/^[a-f0-9]{64}$/.test(checksum)) {
    throw new Error("The server did not provide a valid SHA-256 checksum. Please try again.")
  }
  const digest = await crypto.subtle.digest("SHA-256", await backupBlob.arrayBuffer())
  const actualChecksum = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")
  if (actualChecksum !== checksum) throw new Error("Backup verification failed. Please download it again.")

  const filename = getBackupFilename(response.headers.get("Content-Disposition"))
  saveDownload(backupBlob, filename)
  return { filename, checksum }
}

export function downloadBackupChecksum(backup: { filename: string; checksum: string }): void {
  const checksumFile = new Blob([`${backup.checksum}  ${backup.filename}\n`], { type: "text/plain" })
  saveDownload(checksumFile, `${backup.filename}.sha256`)
}

function saveDownload(backupBlob: Blob, filename: string): void {
  const objectUrl = URL.createObjectURL(backupBlob)
  const link = document.createElement("a")
  link.href = objectUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000)
}

function getBackupFilename(contentDisposition: string | null): string {
  const filename = contentDisposition?.match(/filename="([^"]+)"/)?.[1]
  return filename ?? "elms-database-backup.dump.enc"
}
