import { Activity, Calendar, ClipboardList, Network, Truck } from "lucide-react";
import type { ReportCard } from "@/types/reports";

export const REPORT_CARDS: ReportCard[] = [
  {
    title: "Operation Log Reports",
    description: "Review response activity by incident type, team, and date range.",
    icon: ClipboardList,
  },
  {
    title: "Patient Log Reports",
    description: "Summarize patient records, interventions, and referrals.",
    icon: Activity,
  },
  {
    title: "Vehicle Dispatch Reports",
    description: "Track vehicle assignments, utilization, and dispatch times.",
    icon: Truck,
  },
  {
    title: "Inventory Reports",
    description: "Review stock levels, low-stock alerts, and supply movement.",
    icon: Network,
  },
  {
    title: "Summary",
    description: "Create a concise view of community response performance.",
    icon: Calendar,
  },
];
