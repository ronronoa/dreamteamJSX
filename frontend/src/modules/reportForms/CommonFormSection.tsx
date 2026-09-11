import type { ReactNode } from "react"

interface CommonFormSectionProps {
  title?: string
  children: ReactNode
  className?: string
  padded?: boolean
  standardHeight?: boolean
  scrollable?: boolean
}

export default function CommonFormSection({
  title,
  children,
  className = "",
  padded = true,
  standardHeight = true,
  scrollable = false,
}: CommonFormSectionProps) {
  return (
    <section
      className={`flex w-full flex-col overflow-x-auto rounded-md bg-[#fffdfb] shadow-md ${
        standardHeight ? "lg:min-h-[800px]" : ""
      } ${padded ? "p-6" : ""} ${className}`}
    >
      {title && <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-bold text-slate-900">{title}</h2>}

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
