import type { ReactNode } from "react"

interface CommonFormSectionProps {
  title?: string
  children: ReactNode
  className?: string
  padded?: boolean
}

export default function CommonFormSection({
  title,
  children,
  className = "",
  padded = true,
}: CommonFormSectionProps) {
  return (
    <section
      className={`w-full overflow-x-auto rounded-md bg-[#fffdfb] shadow-md ${padded ? "p-6" : ""} ${className}`}
    >
      {title && <h2 className="mb-4 text-2xl font-bold text-slate-900">{title}</h2>}
      {children}
    </section>
  )
}
