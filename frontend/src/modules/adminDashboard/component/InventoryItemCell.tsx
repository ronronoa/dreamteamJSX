import { formatDate, getDaysUntil } from "@/utils/dateTime";

export default function InventoryItemCell({ expiry, now }: { expiry: Date | null; now: number }) {
  if (!expiry) {
    return (
      <div className="leading-tight">
        <p className="text-xs font-semibold text-gray-400">No expiry</p>
        <p className="text-[10px] text-gray-400">Not tracked</p>
      </div>
    );
  }

  const daysUntilExpiry = getDaysUntil(expiry, now);
  const days = daysUntilExpiry === null ? 0 : Math.ceil(daysUntilExpiry);

  const label =
    days < 0     ? "expired"       :
    days === 0   ? "due today"     :
    days === 1   ? "in 1 day"      :
                   `in ${days} days`;

  return (
    <div className="leading-tight">
      <p className="text-xs font-semibold text-gray-900">{formatDate(expiry)}</p>
      <p className="text-[10px] text-gray-400">{label}</p>
    </div>
  );
}
