import type { SelectHTMLAttributes } from "react"

type CommonSelectVariant = "default" | "compact"

const styles: Record<CommonSelectVariant, { label: string; select: string }> = {
  default: {
    label: "mb-1.5 block text-sm font-semibold text-gray-800",
    select: `
      rounded-xl bg-white border-2 border-gray-200
      py-3 text-sm text-gray-800
      focus:ring-2 focus:ring-purple-400 focus:border-purple-400
      shadow-sm
    `,
  },
  compact: {
    label: "mb-1 block text-lg font-medium text-slate-900",
    select: `
      h-9 rounded-md bg-gray-100 border border-gray-300
      text-sm text-gray-800
      focus:border-purple-500
    `,
  },
}

interface CommonSelectOption {
  label: string
  value: string
}

interface CommonSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  placeholder?: string
  options: CommonSelectOption[]
  variant?: CommonSelectVariant
}

export default function CommonSelect({
  label,
  placeholder,
  options,
  variant = "default",
  className = "",
  ...props
}: CommonSelectProps) {
  const { label: labelClass, select: selectClass } = styles[variant]

  return (
    <div>
      {label && (
        <label htmlFor={props.id} className={labelClass}>
          {label}
        </label>
      )}

      <select
        {...props}
        className={`
          w-full px-2 outline-none
          ${!props.value ? "text-gray-400" : ""}
          ${selectClass}
          ${className}
        `}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
