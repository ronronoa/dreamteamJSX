import {
  Activity,
  Calendar,
  ClipboardList,
  Network,
  Printer,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import CommonButton from "@/components/common/widgets/CommonButton";

interface ReportCard {
  title: string;
  description: string;
  icon: LucideIcon;
}

const reports: ReportCard[] = [
  {
    title: "Operation Log Reports",
    description:
      "Review response activity by incident type, team, and date range.",
    icon: ClipboardList,
  },
  {
    title: "Patient Log Reports",
    description:
      "Summarize patient records, interventions, and referrals.",
    icon: Activity,
  },
  {
    title: "Vehicle Dispatch Reports",
    description:
      "Track vehicle assignments, utilization, and dispatch times.",
    icon: Truck,
  },
  {
    title: "Inventory Reports",
    description:
      "Review stock levels, low-stock alerts, and supply movement.",
    icon: Network,
  },
  {
    title: "Summary",
    description:
      "Create a concise view of community response performance.",
    icon: Calendar,
  },
];

export default function Reports() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {reports.map(({ title, description, icon: Icon }) => (
        <article
          key={title}
          className="flex flex-col rounded-2xl border border-gray-600 bg-white p-5 shadow-sm"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
            <Icon size={18} className="text-purple-600" strokeWidth={2} />
          </div>

          <h3 className="mt-5 text-xl font-bold text-gray-900">{title}</h3>

          <p className="mt-1.5 flex-1 text-md leading-relaxed text-gray-500">
            {description}
          </p>

          <CommonButton className="mt-5 w-full">
            <span className="inline-flex items-center justify-center gap-2">
              <Printer size={14} />
              Generate / Print
            </span>
          </CommonButton>
        </article>
      ))}
    </div>
  );
}
