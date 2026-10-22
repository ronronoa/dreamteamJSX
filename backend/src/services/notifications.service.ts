import type { ActivityLog } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { inventoryService } from "@/services/inventory.service"
import { publishNotification, publishNotificationsRead } from "@/services/notificationHub"

const MAX_NOTIFICATIONS = 12
const NOTIFICATION_HISTORY_DAYS = 14

function getApprovalTarget(module: string) {
  return module === "Operations"
    ? "operations"
    : module === "Patients"
      ? "patients"
      : "vehicles"
}

function getApprovalNotificationData(userId: string, activity: ActivityLog) {
  const reportName = activity.action.replace(/^Submitted /, "").replace(/ report$/, "")
  const recordLabel = activity.record_id ? ` (${activity.record_id.slice(0, 8).toUpperCase()})` : ""
  return {
    user_id: userId,
    source_key: `activity:${activity.activity_id}`,
    title: `New ${reportName} report`,
    message: `${activity.actor_name} submitted a report${recordLabel}.`,
    category: "approval",
    target: getApprovalTarget(activity.module),
    reportFormId: activity.record_id,
    createdAt: activity.createdAt,
  }
}

async function pushNotifications(userIds: string[], sourceKeys: string[]) {
  if (userIds.length === 0 || sourceKeys.length === 0) return
  const records = await prisma.notification.findMany({
    where: { user_id: { in: userIds }, source_key: { in: sourceKeys } },
  })
  for (const record of records) {
    publishNotification(record.user_id, {
      id: record.notification_id,
      title: record.title,
      message: record.message,
      category: record.category,
      target: record.target,
      reportFormId: record.reportFormId,
      createdAt: record.createdAt.toISOString(),
      read: record.readAt !== null,
    })
  }
}

export const notificationsService = {
  async list(userId: string) {
    const preferences = await prisma.userPreference.findUnique({ where: { user_id: userId } })
    const enabledCategories: string[] = []
    if (preferences?.approvalNotifications) enabledCategories.push("approval")
    if (preferences?.lowStockAlerts) enabledCategories.push("inventory")

    if (enabledCategories.length === 0) return { notifications: [], unreadCount: 0 }

    const records = await prisma.notification.findMany({
      where: { user_id: userId, category: { in: enabledCategories } },
      orderBy: { createdAt: "desc" },
      take: MAX_NOTIFICATIONS,
    })
    const legacyActivityIds = records
      .filter((record) => record.category === "approval" && record.reportFormId === null)
      .map((record) => record.source_key.startsWith("activity:") ? record.source_key.slice("activity:".length) : "")
      .filter(Boolean)
    const legacyActivities = legacyActivityIds.length > 0
      ? await prisma.activityLog.findMany({
        where: { activity_id: { in: legacyActivityIds } },
        select: { activity_id: true, record_id: true, module: true },
      })
      : []
    const activityById = new Map(legacyActivities.map((activity) => [activity.activity_id, activity]))
    const notifications = records.map((record) => {
      let target = record.target
      const targetParts = target.split(":", 2)
      const targetType = targetParts[0] ?? target
      let reportFormId = record.reportFormId ?? targetParts[1] ?? null
      const activityId = record.source_key.startsWith("activity:")
        ? record.source_key.slice("activity:".length)
        : ""
      const activity = activityById.get(activityId)

      if (activity) {
        target = getApprovalTarget(activity.module)
        reportFormId ??= activity.record_id
      } else {
        target = targetType
      }

      return {
        id: record.notification_id,
        title: record.title,
        message: record.message,
        category: record.category,
        createdAt: record.createdAt.toISOString(),
        read: record.readAt !== null,
        target,
        reportFormId,
      }
    })

    return {
      notifications,
      unreadCount: notifications.filter((notification) => !notification.read).length,
    }
  },

  async markAllRead(userId: string) {
    const readAt = new Date()
    await prisma.notification.updateMany({
      where: { user_id: userId, readAt: null },
      data: { readAt },
    })
    const readAtIso = readAt.toISOString()
    publishNotificationsRead(userId, readAtIso)
    return { readAt: readAtIso }
  },

  async createApprovalNotifications(activity: ActivityLog) {
    const recipients = await prisma.user.findMany({
      where: { isActive: true, preferences: { is: { approvalNotifications: true } } },
      select: { user_id: true },
    })
    if (recipients.length === 0) return 0

    const result = await prisma.notification.createMany({
      data: recipients.map(({ user_id }) => getApprovalNotificationData(user_id, activity)),
      skipDuplicates: true,
    })
    await pushNotifications(
      recipients.map(({ user_id }) => user_id),
      [`activity:${activity.activity_id}`],
    )
    return result.count
  },

  async syncApprovalNotifications(userId: string) {
    const historyStart = new Date(Date.now() - NOTIFICATION_HISTORY_DAYS * 24 * 60 * 60 * 1000)
    const [recipient, submissions] = await Promise.all([
      prisma.user.findFirst({
        where: { user_id: userId, isActive: true, preferences: { is: { approvalNotifications: true } } },
        select: { user_id: true },
      }),
      prisma.activityLog.findMany({
        where: {
          archivedAt: null,
          createdAt: { gte: historyStart },
          action: { startsWith: "Submitted " },
          module: { in: ["Operations", "Patients", "Dispatch"] },
          status: "Success",
        },
        orderBy: { createdAt: "desc" },
        take: MAX_NOTIFICATIONS,
      }),
    ])
    if (!recipient || submissions.length === 0) return 0

    const result = await prisma.notification.createMany({
      data: submissions.map((activity) => getApprovalNotificationData(userId, activity)),
      skipDuplicates: true,
    })
    await pushNotifications(
      [userId],
      submissions.map((activity) => `activity:${activity.activity_id}`),
    )
    return result.count
  },

  async syncLowStockNotifications() {
    const [recipients, inventory] = await Promise.all([
      prisma.user.findMany({
        where: { isActive: true, preferences: { is: { lowStockAlerts: true } } },
        select: { user_id: true },
      }),
      inventoryService.list(),
    ])
    if (recipients.length === 0) return 0

    const lowStockItems = inventory.items.filter((item) => item.status !== "Available")
    if (lowStockItems.length === 0) return 0

    const result = await prisma.notification.createMany({
      data: recipients.flatMap(({ user_id }) => lowStockItems.map((item) => ({
        user_id,
        source_key: `inventory:${item.itemId}:${item.updatedAt.getTime()}`,
        title: item.status === "Expired" ? "Inventory item expired" : "Low stock alert",
        message: `${item.item} has ${item.quantity} ${item.unit} remaining (reorder level: ${item.minimum}).`,
        category: "inventory",
        target: "inventory",
        createdAt: item.updatedAt,
      }))),
      skipDuplicates: true,
    })
    await pushNotifications(
      recipients.map(({ user_id }) => user_id),
      lowStockItems.map((item) => `inventory:${item.itemId}:${item.updatedAt.getTime()}`),
    )
    return result.count
  },
}
