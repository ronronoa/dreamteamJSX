import dayjs, { type Dayjs } from "dayjs"
import type { OperationRecord } from "@/api/operations"
import type { PatientLogRecord } from "@/api/patients"
import type { VehicleDispatchRecord } from "@/api/vehicularDispatches"
import type { HourlyActivity, MonthlyReportCount, PatientStatusCount } from "@/types/dashboard"

const PATIENT_STATUS_COLORS: Record<PatientLogRecord["status"], string> = {
  PENDING: "#f59e0b",
  TO_REVIEW: "#3b82f6",
  VALIDATED: "#10b981",
  REJECTED: "#ef4444",
  ARCHIVED: "#9ca3af",
}

export const barConfig = {
  value: { label: "Reports", color: "hsl(var(--chart-1))" },
}

export const pieConfig = {
  value: { label: "Patient logs" },
  PENDING: { label: "Pending", color: PATIENT_STATUS_COLORS.PENDING },
  TO_REVIEW: { label: "To review", color: PATIENT_STATUS_COLORS.TO_REVIEW },
  VALIDATED: { label: "Approved", color: PATIENT_STATUS_COLORS.VALIDATED },
  REJECTED: { label: "Rejected", color: PATIENT_STATUS_COLORS.REJECTED },
  ARCHIVED: { label: "Archived", color: PATIENT_STATUS_COLORS.ARCHIVED },
}

export const areaConfig = {
  activity: { label: "Reports", color: "#8b5cf6" },
}

export function getMonthlyReportCounts(
  operations: OperationRecord[],
  patients: PatientLogRecord[],
  dispatches: VehicleDispatchRecord[],
  referenceDate: Dayjs = dayjs(),
): MonthlyReportCount[] {
  const months = Array.from({ length: 6 }, (_value, index) => referenceDate.startOf("month").subtract(5 - index, "month"))
  const countByMonth = new Map(months.map((month) => [month.format("YYYY-MM"), 0]))
  const reportDates = [
    ...operations.map((record) => record.createdAt),
    ...patients.map((record) => record.createdAt),
    ...dispatches.map((record) => record.record.createdAt ?? record.record.dispatch_date),
  ]

  for (const value of reportDates) {
    const date = dayjs(value)
    if (!date.isValid()) continue
    const monthKey = date.format("YYYY-MM")
    if (countByMonth.has(monthKey)) countByMonth.set(monthKey, (countByMonth.get(monthKey) ?? 0) + 1)
  }

  return months.map((month) => ({ month: month.format("MMM"), value: countByMonth.get(month.format("YYYY-MM")) ?? 0 }))
}

export function getPatientStatusCounts(records: PatientLogRecord[]): PatientStatusCount[] {
  const statuses = ["PENDING", "TO_REVIEW", "VALIDATED", "REJECTED", "ARCHIVED"] as const
  return statuses.map((status) => ({
    name: status,
    value: records.filter((record) => record.status === status).length,
    color: PATIENT_STATUS_COLORS[status],
  }))
}

interface TimestampedReport {
  createdAt: string
}

export function getHourlyReportCounts(
  reports: TimestampedReport[],
  referenceDate: Dayjs = dayjs(),
): HourlyActivity[] {
  const startingHours = [0, 3, 6, 9, 12, 15, 18, 21]
  const counts = startingHours.map((hour) => ({
    time: `${String(hour).padStart(2, "0")}:00`,
    activity: 0,
    startHour: hour,
  }))

  for (const report of reports) {
    const createdAt = dayjs(report.createdAt)
    if (!createdAt.isValid() || !createdAt.isSame(referenceDate, "day")) continue

    const bucketIndex = Math.min(Math.floor(createdAt.hour() / 3), counts.length - 1)
    counts[bucketIndex].activity += 1
  }

  return counts.map(({ time, activity }) => ({ time, activity }))
}

export interface RecentDashboardActivity {
  id: string
  title: string
  description: string
  type: "operation" | "patient" | "dispatch"
  createdAt: string
}

export function getRecentDashboardActivity(
  operations: OperationRecord[],
  patients: PatientLogRecord[],
  dispatches: VehicleDispatchRecord[],
): RecentDashboardActivity[] {
  const recentOperations = operations.map((record) => ({
    id: record.operation_id,
    title: "Operation report submitted",
    description: `${record.nature_of_operation} · ${record.name_of_caller}`,
    type: "operation" as const,
    createdAt: record.createdAt,
  }))
  const recentPatients = patients.map((record) => ({
    id: record.patient_log_id,
    title: "Patient report submitted",
    description: `${record.patient.full_name} · ${record.type_of_request.replaceAll("_", " ")}`,
    type: "patient" as const,
    createdAt: record.createdAt,
  }))
  const recentDispatches = dispatches.map((record) => ({
    id: record.dispatchId,
    title: "Vehicle dispatch submitted",
    description: `${record.vehicle} · ${record.destination}`,
    type: "dispatch" as const,
    createdAt: record.record.createdAt ?? record.record.dispatch_date,
  }))

  return [...recentOperations, ...recentPatients, ...recentDispatches]
    .filter((activity) => dayjs(activity.createdAt).isValid())
    .sort((first, second) => dayjs(second.createdAt).valueOf() - dayjs(first.createdAt).valueOf())
    .slice(0, 5)
}

export function getTodayReportsCount(reports: TimestampedReport[], referenceDate: Dayjs = dayjs()) {
  return reports.filter((report) => dayjs(report.createdAt).isSame(referenceDate, "day")).length
}
