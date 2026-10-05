import type { ChangeEvent, InputHTMLAttributes } from "react"
import CommonInput from "./CommonInput"

type CommonVitalFieldProps = {
  label: string
  /** Extra characters permitted in addition to digits (e.g. "/" for BP) */
  allow?: string
} & InputHTMLAttributes<HTMLInputElement>

const MAX = 999

export default function CommonVitalField({
  label,
  allow = "",
  className = "",
  onChange,
  ...props
}: CommonVitalFieldProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const escapedAllow = allow.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
    const regex = new RegExp(`[^0-9.${escapedAllow}]`, "g")

    // 1. strip illegal chars
    let cleaned = event.target.value.replace(regex, "")

    // 2. clamp each "/"-separated segment to MAX
    cleaned = cleaned
      .split("/")
      .map((segment) => {
        if (!segment) return segment
        const num = parseFloat(segment)
        if (Number.isNaN(num)) return segment
        return num > MAX ? String(MAX) : segment
      })
      .join("/")

    if (cleaned !== event.target.value) {
      event.target.value = cleaned
    }

    onChange?.(event)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="shrink-0 text-sm font-medium text-slate-800">{label}</span>
      <CommonInput
        variant="compact"
        inputMode="numeric"
        className={`w-20 text-center ${className}`}
        onChange={handleChange}
        {...props}
      />
    </div>
  )
}
