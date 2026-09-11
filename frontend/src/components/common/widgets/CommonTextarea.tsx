import type { TextareaHTMLAttributes } from "react"

type CommonTextareaVariant = "default" | "compact"

const styles: Record<CommonTextareaVariant, { label: string; textarea: string }> = {
  default: {
    label: "mb-1.5 block text-sm font-semibold text-gray-800",
    textarea: `
      rounded-xl bg-white border-2 border-gray-200
      py-3 text-sm text-gray-800
      focus:ring-2 focus:ring-purple-400 focus:border-purple-400
      shadow-sm
    `,
  },
  compact: {
    label: "mb-1 block text-lg font-medium text-slate-900",
    textarea: `
      rounded-md bg-gray-100 border border-gray-300
      text-sm text-gray-800
      focus:border-purple-500
    `,
  },
}

interface CommonTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  variant?: CommonTextareaVariant
}

export default function CommonTextarea({
  label,
  variant = "default",
  className = "",
  ...props
}: CommonTextareaProps) {
  const { label: labelClass, textarea: textareaClass } = styles[variant]

  return (
    <div>
      {label && (
        <label htmlFor={props.id} className={labelClass}>
          {label}
        </label>
      )}

      <textarea
        {...props}
        className={`w-full resize-none px-4 py-3 outline-none placeholder:text-gray-400 ${textareaClass} ${className}`}
      />
    </div>
  )
}
