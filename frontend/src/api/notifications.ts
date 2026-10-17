import { apiFetch } from "./apiFetch"

export interface NotificationItem {
  id: string
  title: string
  message: string
  category: "approval" | "inventory"
  createdAt: string
  read: boolean
  target: "operations" | "patients" | "vehicles" | "inventory"
}

export interface NotificationResponse {
  notifications: NotificationItem[]
  unreadCount: number
}

async function parseResponse<T>(response: Response): Promise<T> {
  const result = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(result.message ?? `Request failed (${response.status})`)
  return result as T
}

export async function fetchNotifications(accessToken: string) {
  const response = await apiFetch("/notifications", { headers: { Authorization: `Bearer ${accessToken}` } })
  return parseResponse<NotificationResponse>(response)
}

export async function markNotificationsRead(accessToken: string) {
  const response = await apiFetch("/notifications/read", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return parseResponse<{ readAt: string }>(response)
}
