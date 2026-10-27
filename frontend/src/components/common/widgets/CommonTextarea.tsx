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
  errorMessage?: string
}

export default function CommonTextarea({
  label,
  variant = "default",
  className = "",
  errorMessage,
  ...props
}: CommonTextareaProps) {
  const { label: labelClass, textarea: textareaClass } = styles[variant]

  return (
    <div>
      {label && (
        <label htmlFor={props.id} className={`${labelClass} flex flex-wrap items-baseline justify-between gap-x-2`}>
          <span>{label}</span>
          {errorMessage && <span id={`${props.id}-error`} role="alert" className="text-xs font-medium text-red-700">{errorMessage}</span>}
        </label>
      )}

      <textarea
        {...props}
        aria-invalid={Boolean(errorMessage)}
        aria-describedby={errorMessage ? `${props.id}-error` : props["aria-describedby"]}
        className={`w-full resize-none px-4 py-3 outline-none placeholder:text-gray-400 ${textareaClass} ${errorMessage ? "border-red-500 ring-1 ring-red-500" : ""} ${className}`}
      />
      {!label && errorMessage && <p id={`${props.id}-error`} role="alert" className="mt-1 text-xs font-medium text-red-700">{errorMessage}</p>}
    </div>
  )
}
