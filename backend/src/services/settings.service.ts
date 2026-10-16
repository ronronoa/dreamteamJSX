import { prisma } from "@/lib/prisma"
import type { z } from "zod"
import type { UpdateUserPreferencesSchema, UpdateWorkspaceSettingsSchema } from "@/schemas/settings.schema"
import { notificationsService } from "@/services/notifications.service"

const DEFAULT_WORKSPACE_SETTINGS = {
  systemName: "Barangay 176-E DRRMO Operation Logistics Management System",
  officeName: "Disaster Risk Reduction and Management Office",
  officeHotline: "(02) 8241 1760",
  archiveRetention: "1-year",
}

const WORKSPACE_SETTING_KEYS = {
  systemName: "workspace.systemName",
  officeName: "workspace.officeName",
  officeHotline: "workspace.officeHotline",
  archiveRetention: "records.archiveRetention",
} as const

type WorkspaceSettingsInput = z.infer<typeof UpdateWorkspaceSettingsSchema>
type UserPreferencesInput = z.infer<typeof UpdateUserPreferencesSchema>

export const settingsService = {
  async get(userId: string) {
    const [settingRows, preferences, globalPin, legacyPinOwner] = await Promise.all([
      prisma.systemSetting.findMany({
        where: { setting_key: { in: Object.values(WORKSPACE_SETTING_KEYS) } },
      }),
      prisma.userPreference.findUnique({ where: { user_id: userId } }),
      prisma.systemSetting.findUnique({ where: { setting_key: "security.globalPinHash" }, select: { setting_key: true } }),
      prisma.user.findFirst({
        where: { isActive: true, role: { not: "MEMBER" }, pinHash: { not: null } },
        select: { user_id: true },
      }),
    ])
    const settingsByKey = new Map(settingRows.map((setting) => [setting.setting_key, setting.value]))

    return {
      workspace: {
        systemName: settingsByKey.get(WORKSPACE_SETTING_KEYS.systemName) ?? DEFAULT_WORKSPACE_SETTINGS.systemName,
        officeName: settingsByKey.get(WORKSPACE_SETTING_KEYS.officeName) ?? DEFAULT_WORKSPACE_SETTINGS.officeName,
        officeHotline: settingsByKey.get(WORKSPACE_SETTING_KEYS.officeHotline) ?? DEFAULT_WORKSPACE_SETTINGS.officeHotline,
        archiveRetention: settingsByKey.get(WORKSPACE_SETTING_KEYS.archiveRetention) ?? DEFAULT_WORKSPACE_SETTINGS.archiveRetention,
      },
      preferences: {
        lowStockAlerts: preferences?.lowStockAlerts ?? false,
        approvalNotifications: preferences?.approvalNotifications ?? false,
        sessionTimeout: preferences?.sessionTimeout ?? "30-min",
      },
      globalPinConfigured: Boolean(globalPin || legacyPinOwner),
    }
  },

  async updateWorkspace(userId: string, input: WorkspaceSettingsInput) {
    const writes: Array<{ field: keyof typeof WORKSPACE_SETTING_KEYS; value: string }> = []
    if (input.systemName !== undefined) writes.push({ field: "systemName", value: input.systemName })
    if (input.officeName !== undefined) writes.push({ field: "officeName", value: input.officeName })
    if (input.officeHotline !== undefined) writes.push({ field: "officeHotline", value: input.officeHotline })
    if (input.archiveRetention !== undefined) writes.push({ field: "archiveRetention", value: input.archiveRetention })
    await Promise.all(writes.map(({ field, value }) => {
      const setting_key = WORKSPACE_SETTING_KEYS[field]
      return prisma.systemSetting.upsert({
        where: { setting_key },
        create: { setting_key, value, updated_by: userId },
        update: { value, updated_by: userId },
      })
    }))
    return settingsService.get(userId)
  },

  async updatePreferences(userId: string, input: UserPreferencesInput) {
    const preferenceData = {
      ...(input.lowStockAlerts !== undefined ? { lowStockAlerts: input.lowStockAlerts } : {}),
      ...(input.approvalNotifications !== undefined ? { approvalNotifications: input.approvalNotifications } : {}),
      ...(input.sessionTimeout !== undefined ? { sessionTimeout: input.sessionTimeout } : {}),
    }
    await prisma.userPreference.upsert({
      where: { user_id: userId },
      create: { user_id: userId, ...preferenceData },
      update: preferenceData,
    })
    if (input.lowStockAlerts === true) {
      await notificationsService.syncLowStockNotifications()
    }
    if (input.approvalNotifications === true) {
      await notificationsService.syncApprovalNotifications(userId)
    }
    return settingsService.get(userId)
  },
}
