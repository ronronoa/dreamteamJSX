import { useCallback, useEffect, useRef, useState } from "react"
import { apiFetch } from "@/api/apiFetch"
import { fetchNotifications, markNotificationsRead, type NotificationItem } from "@/api/notifications"

const RECONNECT_DELAY_MS = 3000

export function useNotifications(accessToken: string | undefined) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const notificationIds = useRef(new Set<string>())

  const refresh = useCallback(async (): Promise<boolean> => {
    if (!accessToken) return false
    setLoading(true)
    try {
      const result = await fetchNotifications(accessToken)
      setNotifications(result.notifications)
      setUnreadCount(result.unreadCount)
      notificationIds.current = new Set(result.notifications.map((notification) => notification.id))
      setError("")
      return true
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not load notifications.")
      return false
    } finally {
      setLoading(false)
    }
  }, [accessToken])

  useEffect(() => {
    let stopped = false
    if (!accessToken) {
      void (async () => {
        await Promise.resolve()
        if (stopped) return
        setNotifications([])
        setUnreadCount(0)
        notificationIds.current.clear()
        setError("")
        setLoading(false)
      })()
      return () => { stopped = true }
    }
    void (async () => {
      await Promise.resolve()
      if (!stopped) await refresh()
    })()

    let controller: AbortController | undefined
    let reconnectTimer: number | undefined

    async function connect() {
      controller = new AbortController()
      try {
        const response = await apiFetch("/notifications/stream", {
          headers: { Authorization: `Bearer ${accessToken}` },
          signal: controller.signal,
        })
        if (!response.ok || !response.body) throw new Error("Notification stream unavailable")
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ""
        while (!stopped) {
          const chunk = await reader.read()
          if (chunk.done) break
          buffer += decoder.decode(chunk.value, { stream: true })
          const events = buffer.split(/\r?\n\r?\n/)
          buffer = events.pop() ?? ""
          for (const event of events) {
            const lines = event.replace(/\r\n/g, "\n").split("\n")
            const eventType = lines.find((line) => line.startsWith("event:"))?.slice(6).trim()
            const data = lines.filter((line) => line.startsWith("data:")).map((line) => line.slice(5).trim()).join("\n")

            if (eventType === "connected") {
              void refresh()
              continue
            }

            if (eventType === "notification") {
              try {
                const notification = JSON.parse(data) as NotificationItem
                if (notificationIds.current.has(notification.id)) continue
                notificationIds.current.add(notification.id)
                setNotifications((current) => [notification, ...current].slice(0, 25))
                setUnreadCount((current) => current + 1)
              } catch {
                setError("Received an invalid notification event.")
              }
              continue
            }

            if (eventType === "notifications-read") {
              setNotifications((current) => current.map((notification) => ({ ...notification, read: true })))
              setUnreadCount(0)
            }
          }
        }
      } catch {
        // Reconnect below unless the dashboard is closing this stream.
      } finally {
        if (!stopped) reconnectTimer = window.setTimeout(() => void connect(), RECONNECT_DELAY_MS)
      }
    }

    void connect()
    return () => {
      stopped = true
      controller?.abort()
      if (reconnectTimer !== undefined) window.clearTimeout(reconnectTimer)
    }
  }, [accessToken, refresh])

  const markAllRead = useCallback(async () => {
    if (!accessToken) return
    await markNotificationsRead(accessToken)
    setNotifications((current) => current.map((notification) => ({ ...notification, read: true })))
    setUnreadCount(0)
  }, [accessToken])

  return { notifications, unreadCount, error, loading, refresh, markAllRead }
}
