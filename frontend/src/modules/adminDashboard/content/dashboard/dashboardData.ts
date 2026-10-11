import type {
  HourlyActivity,
  MonthlyOperationCount,
  PatientInterventionCount,
} from "@/types/dashboard";

// --- Data & Config ---

export const barData: MonthlyOperationCount[] = [
  { month: "Jan", value: 30 },
  { month: "Feb", value: 48 },
  { month: "Mar", value: 28 },
  { month: "Apr", value: 68 },
  { month: "May", value: 52 },
  { month: "Jun", value: 72 },
  { month: "Jul", value: 60 },
];

export const pieData: PatientInterventionCount[] = [
  { name: "Minor", value: 35, color: "#8b5cf6" },
  { name: "Medical", value: 40, color: "#10b981" },
  { name: "Referral", value: 25, color: "#f59e0b" },
];

export const areaData: HourlyActivity[] = [
  { time: "08:00", activity: 45 },
  { time: "10:00", activity: 55 },
  { time: "12:00", activity: 70 },
  { time: "14:00", activity: 40 },
  { time: "16:00", activity: 65 },
  { time: "18:00", activity: 45 },
  { time: "20:00", activity: 75 },
];

export const barConfig = {
  value: {
    label: "Records",
    color: "hsl(var(--chart-1))",
  },
};

export const pieConfig = {
  value: { label: "Cases" },
  Minor: { label: "Minor", color: "#8b5cf6" },
  Medical: { label: "Medical", color: "#10b981" },
  Referral: { label: "Referral", color: "#f59e0b" },
};

export const areaConfig = {
  activity: {
    label: "Activity Level",
    color: "#8b5cf6",
  },
};

