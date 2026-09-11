import type { InputHTMLAttributes } from "react"

interface CommonCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export default function CommonCheckbox({ label, className = "", ...props }: CommonCheckboxProps) {
  return (
    <label className="flex items-center justify-start gap-2 text-sm text-gray-800">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 border-orange-500 bg-white">
        <input type="checkbox" {...props} className={`h-6 w-6 accent-orange-500 m-0 p-0 ${className}`} />
      </div>
      {label}
    </label>
  )
}
