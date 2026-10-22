import type { ReactNode } from "react"
import { Pencil } from "lucide-react"

interface CommonFormSectionProps {
  title?: string
  children: ReactNode
  className?: string
  padded?: boolean
  standardHeight?: boolean
  scrollable?: boolean
  onClick?: () => void
  hasError?: boolean
}

export default function CommonFormSection({
  title,
  children,
  className = "",
  padded = true,
  standardHeight = true,
  scrollable = false,
  onClick,
  hasError = false,
}: CommonFormSectionProps) {
  return (
    <section
      className={`flex w-full flex-col rounded-md shadow-md ${hasError ? "border-2 border-red-400 bg-red-50" : "bg-[#fffdfb]"} ${
        standardHeight ? "lg:min-h-[650px]" : ""
      } ${padded ? "p-6" : ""} ${onClick ? "cursor-pointer transition hover:ring-2 hover:ring-purple-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500" : ""} ${className}`}
      onClick={onClick}
      onKeyDown={onClick ? (event) => {
        if (event.key !== "Enter" && event.key !== " ") return
        event.preventDefault()
        onClick()
      } : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick && title ? `Edit ${title}` : undefined}
    >
      {title && (
        <h2 className="mb-4 flex items-center justify-between gap-3 border-b border-gray-200 pb-2 text-2xl font-bold text-slate-900">
          <span>{title}</span>
          {onClick && <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-purple-700"><Pencil size={14} /> Edit</span>}
        </h2>
      )}

      <div
        className={`flex flex-1 flex-col ${standardHeight ? "justify-start lg:justify-center" : ""} ${
          scrollable ? "min-h-0 overflow-y-auto" : ""
        }`}
      >
        {children}
      </div>
    </section>
  )
}
