export interface StatCardProps {
  label: string
  value: string
  unit?: string
  sub?: string
  subTone?: "up" | "down"
  variant?: "primary"
}

export default function StatCard({
  label,
  value,
  unit,
  sub,
  subTone,
  variant,
}: StatCardProps) {
  if (variant === "primary") {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#5b21b6] to-[#3b0764] p-5 text-white">
        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-8 -left-4 h-24 w-24 rounded-full bg-white/5" />

        <p className="relative text-xs text-white/80">{label}</p>
        <p className="relative mt-2 text-3xl font-bold">{value}</p>
        <p className="relative mt-2 text-[11px] text-white/70">{sub}</p>
      </div>
    );
  }

  const toneClass =
    subTone === "up"
      ? "text-emerald-600"
      : subTone === "down"
      ? "text-emerald-600"
      : "text-gray-500";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-gray-900">
        {value}
        {unit && <span className="ml-1 text-xs font-semibold text-gray-500">{unit}</span>}
      </p>
      <p className={`mt-2 text-[11px] ${toneClass}`}>{sub}</p>
    </div>
  );
}
