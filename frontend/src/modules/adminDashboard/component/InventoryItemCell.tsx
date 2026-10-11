const DATE_FMT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export default function InventoryItemCell({ expiry, now }: { expiry: Date | null; now: number }) {
  if (!expiry) {
    return (
      <div className="leading-tight">
        <p className="text-xs font-semibold text-gray-400">No expiry</p>
        <p className="text-[10px] text-gray-400">Not tracked</p>
      </div>
    );
  }

  const days = Math.ceil((expiry.getTime() - now) / 86_400_000);

  const label =
    days < 0     ? "expired"       :
    days === 0   ? "due today"     :
    days === 1   ? "in 1 day"      :
                   `in ${days} days`;

  return (
    <div className="leading-tight">
      <p className="text-xs font-semibold text-gray-900">{DATE_FMT.format(expiry)}</p>
      <p className="text-[10px] text-gray-400">{label}</p>
    </div>
  );
}
