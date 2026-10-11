import { z } from "zod"

const SESSION_TIMEOUTS = ["15-min", "30-min", "1-hour", "2-hours"] as const
const ARCHIVE_RETENTION_OPTIONS = ["6-months", "1-year", "3-years", "5-years"] as const

export const UpdateWorkspaceSettingsSchema = z.object({
  systemName: z.string().trim().min(1).max(120).optional(),
  officeName: z.string().trim().min(1).max(120).optional(),
  officeHotline: z.string().trim().max(40).optional(),
  archiveRetention: z.enum(ARCHIVE_RETENTION_OPTIONS).optional(),
}).refine((value) => Object.keys(value).length > 0, "At least one setting is required.")

export const UpdateUserPreferencesSchema = z.object({
  lowStockAlerts: z.boolean().optional(),
  approvalNotifications: z.boolean().optional(),
  sessionTimeout: z.enum(SESSION_TIMEOUTS).optional(),
}).refine((value) => Object.keys(value).length > 0, "At least one preference is required.")

export const SetGlobalPinSchema = z.object({
  pin: z.string().regex(/^\d{4,6}$/, "Global PIN must be 4 to 6 digits."),
})
