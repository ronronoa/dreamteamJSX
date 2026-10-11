import type { PatientLogRecord, PendingPatientRecord } from "@/types/patientLog";
import type { StatCardProps } from "../../component/StatCard";

// ── Data (placeholder) ────────────────────────────────────

export const stats: StatCardProps[] = [
  {
    label: "Total records",
    value: "44",
    sub: "All recorded patients",
    variant: "primary" as const,
  },
  {
    label: "New patient records",
    value: "5",
    sub: "↑ 5%  from last month",
    subTone: "up" as const,
  },
  {
    label: "Emergency response average time",
    value: "5:54",
    unit: "min",
    sub: "↓ 4 sec  vs last month",
    subTone: "down" as const,
  },
  {
    label: "Most common age",
    value: "20-26",
    unit: "yrs",
    sub: "Range recorded",
  },
  {
    label: "Most common type of request",
    value: "Inter-Facility Transfer",
    sub: "For this month",
  },
];

export const pendingRequests: PendingPatientRecord[] = [
  {
    id: "PT-045",
    date: new Date("2026-08-29T02:15:00"),
    nameOfPatient: "Carlos Mendoza",
    age: "57",
    address: "Phase 9-A Package 7 Block 32 Lot 13",
    assessment: "Chest pain",
    submittedBy: "Juan Dela Cruz",
  },
];

export const approvedLogs: PatientLogRecord[] = [
  {
    id: "PT-043",
    date: new Date("2026-08-29T02:15:00"),
    time: "03:42 PM",
    nameOfPatient: "Bianca Del Rio",
    age: "28",
    address: "Phase 9-B Package 8 Block 12 Lot 3",
    assessment: "Chest pain",
    submittedBy: "Juan Dela Cruz",
  },
  {
    id: "PT-044",
    date: new Date("2026-08-29T02:15:00"),
    time: "03:42 PM",
    nameOfPatient: "Bianca Del Rio",
    age: "28",
    address: "Phase 9-B Package 8 Block 12 Lot 3",
    assessment: "Chest pain",
    submittedBy: "Juan Dela Cruz",
  },
];

