import type { PendingVehicleDispatch, VehicleDispatchRecord } from "@/types/vehicleDispatch";
import type { StatCardProps } from "../../component/StatCard";

// ── Data (placeholder) ────────────────────────────────────

export const stats: StatCardProps[] = [
  {
    label: "Total dispatch",
    value: "52",
    sub: "All recorded dispatches",
    variant: "primary" as const,
  },
  {
    label: "Most vehicle type dispatched",
    value: "Barangay Mobile",
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
];

export const pendingRequests: PendingVehicleDispatch[] = [];

export const approvedLogs: VehicleDispatchRecord[] = [
  {
    id: "DSP-051",
    date: new Date("2026-08-29T02:15:00"),
    time: "03:42 PM",
    vehicle: "Brgy Mobile",
    driver: "R. Garcia",
    destination: "Phase 9-B Package 8 Block 12 Lot 3",
    totalTime: "53m",
    type: "Non-Emergency",
  },
  {
    id: "DSP-052",
    date: new Date("2026-08-29T02:15:00"),
    time: "03:42 PM",
    vehicle: "Brgy Mobile",
    driver: "R. Garcia",
    destination: "Phase 9-B Package 8 Block 12 Lot 3",
    totalTime: "53m",
    type: "Emergency",
  },
];

