import type { ReactNode } from "react"

interface CommonSummaryFieldProps {
  label: string
  value: ReactNode
}

export default function SummaryField({ label, value }: CommonSummaryFieldProps) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-gray-500">{label}</p>
      <p className="text-sm text-slate-900">{value || "—"}</p>
    </div>
  )
}
