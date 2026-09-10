import type { InputHTMLAttributes } from "react"

interface CommonCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export default function CommonCheckbox({ label, className = "", ...props }: CommonCheckboxProps) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-800">
      <input type="checkbox" {...props} className={`h-4 w-4 accent-orange-500 ${className}`} />
      {label}
    </label>
  )
}
