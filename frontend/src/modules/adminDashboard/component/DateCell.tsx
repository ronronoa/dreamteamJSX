// src/modules/adminDashboard/component/DateCell.tsx
const DATE_FMT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const TIME_FMT = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
});

export default function DateCell({ date }: { date: Date }) {
  return (
    <div className="leading-tight">
      <p className="text-xs font-semibold text-gray-900">{DATE_FMT.format(date)}</p>
      <p className="text-[10px] text-gray-400">{TIME_FMT.format(date)}</p>
    </div>
  );
}
