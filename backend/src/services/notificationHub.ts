import type { Response } from "express"

const HEARTBEAT_INTERVAL_MS = 25_000
const connectedClients = new Map<string, Set<Response>>()

function sendEvent(response: Response, eventName: string, payload: unknown) {
  if (response.writableEnded) return
  response.write(`event: ${eventName}\ndata: ${JSON.stringify(payload)}\n\n`)
}

export function openNotificationStream(userId: string, response: Response) {
  response.status(200)
  response.setHeader("Content-Type", "text/event-stream")
  response.setHeader("Cache-Control", "no-cache, no-transform")
  response.setHeader("Connection", "keep-alive")
  response.setHeader("X-Accel-Buffering", "no")
  response.flushHeaders()

  const userConnections = connectedClients.get(userId) ?? new Set<Response>()
  userConnections.add(response)
  connectedClients.set(userId, userConnections)
  sendEvent(response, "connected", {})

  const heartbeat = setInterval(() => {
    if (!response.writableEnded) response.write(": keep-alive\n\n")
  }, HEARTBEAT_INTERVAL_MS)

  response.on("close", () => {
    clearInterval(heartbeat)
    userConnections.delete(response)
    if (userConnections.size === 0) connectedClients.delete(userId)
  })
}

export function publishNotification(userId: string, notification: {
  id: string
  title: string
  message: string
  category: string
  target: string
  createdAt: string
  read: boolean
}) {
  for (const client of connectedClients.get(userId) ?? []) {
    sendEvent(client, "notification", notification)
  }
}

export function publishNotificationsRead(userId: string, readAt: string) {
  for (const client of connectedClients.get(userId) ?? []) {
    sendEvent(client, "notifications-read", { readAt })
  }
}
