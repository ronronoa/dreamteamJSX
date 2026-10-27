// src/modules/adminDashboard/component/DateCell.tsx
import { formatDate, formatTime } from "@/utils/dateTime";

export default function DateCell({ date }: { date: Date }) {
  return (
    <div className="leading-tight">
      <p className="text-xs font-semibold text-gray-900">{formatDate(date)}</p>
      <p className="text-[10px] text-gray-400">{formatTime(date)}</p>
    </div>
  );
}
