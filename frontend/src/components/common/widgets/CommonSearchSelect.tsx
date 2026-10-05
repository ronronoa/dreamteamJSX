import { useEffect, useRef, useState } from "react"
import type { InputHTMLAttributes } from "react"

type CommonSearchSelectVariant = "default" | "compact"

const styles: Record<CommonSearchSelectVariant, { label: string; input: string; dropdown: string; option: string }> = {
  default: {
    label: "mb-1.5 block text-sm font-semibold text-gray-800",
    input: `
      w-full rounded-xl bg-white border-2 border-gray-200
      px-3 py-3 text-sm text-gray-800
      focus:ring-2 focus:ring-purple-400 focus:border-purple-400
      shadow-sm outline-none
    `,
    dropdown: "mt-1 rounded-xl border-2 border-gray-200 bg-white shadow-lg max-h-60 overflow-y-auto",
    option: "px-3 py-2.5 text-sm",
  },
  compact: {
    label: "mb-1 block text-lg font-medium text-slate-900",
    input: `
      w-full h-9 rounded-md bg-gray-100 border border-gray-300
      px-2 text-sm text-gray-800
      focus:border-purple-500 outline-none
    `,
    dropdown: "mt-1 rounded-md border border-gray-300 bg-white shadow-md max-h-60 overflow-y-auto",
    option: "px-2 py-1.5 text-sm",
  },
}

export interface CommonSearchSelectOption {
  label: string
  value: string
}

interface CommonSearchSelectProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  label?: string
  options: CommonSearchSelectOption[]
  variant?: CommonSearchSelectVariant
  value?: string[]
  onChange?: (value: string[], options: CommonSearchSelectOption[]) => void
  emptyMessage?: string
}

export default function CommonSearchSelect({
  label,
  options,
  variant = "default",
  value = [],
  onChange,
  emptyMessage = "No results found",
  placeholder = "Search...",
  className = "",
  ...props
}: CommonSearchSelectProps) {
  const { label: labelClass, input: inputClass, dropdown, option: optionClass } = styles[variant]

  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOptions = options.filter((o) => value.includes(o.value))
  const displayValue = isOpen
    ? query
    : selectedOptions.map((o) => o.label).join(", ")

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.trim().toLowerCase()),
  )

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false)
        setQuery("")
        setHighlighted(-1)
      }
    }
    document.addEventListener("mousedown", onPointerDown)
    return () => document.removeEventListener("mousedown", onPointerDown)
  }, [])

  function toggleOption(option: CommonSearchSelectOption) {
    const isSelected = value.includes(option.value)
    const nextValues = isSelected
      ? value.filter((v) => v !== option.value)
      : [...value, option.value]
    const nextOptions = options.filter((o) => nextValues.includes(o.value))
    onChange?.(nextValues, nextOptions)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlighted((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlighted((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter") {
      if (highlighted >= 0 && filtered[highlighted]) {
        e.preventDefault()
        toggleOption(filtered[highlighted])
      }
    } else if (e.key === "Escape") {
      setIsOpen(false)
      setQuery("")
      setHighlighted(-1)
    }
  }

  return (
    <div ref={containerRef} className="relative">
      {label && <label className={labelClass}>{label}</label>}

      <input
        {...props}
        type="text"
        autoComplete="off"
        value={displayValue}
        placeholder={placeholder}
        onChange={(e) => {
          setQuery(e.target.value)
          setIsOpen(true)
          setHighlighted(0)
        }}
        onFocus={() => {
          setIsOpen(true)
          setQuery("")
        }}
        onKeyDown={handleKeyDown}
        className={`${inputClass} ${className}`}
      />

      {isOpen && (
        <ul className={`absolute z-30 w-full ${dropdown}`}>
          {filtered.length === 0 ? (
            <li className={`${optionClass} text-gray-400`}>{emptyMessage}</li>
          ) : (
            filtered.map((option, i) => {
              const checked = value.includes(option.value)
              return (
                <li
                  key={option.value}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    toggleOption(option)
                  }}
                  onMouseEnter={() => setHighlighted(i)}
                  className={`
                    flex cursor-pointer select-none items-center gap-2
                    ${optionClass}
                    ${i === highlighted ? "bg-purple-50" : ""}
                  `}
                >
                  <span
                    className={`
                      flex h-4 w-4 shrink-0 items-center justify-center rounded border
                      ${checked ? "border-purple-600 bg-purple-600" : "border-gray-400 bg-white"}
                    `}
                  >
                    {checked && (
                      <svg viewBox="0 0 24 24" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    )}
                  </span>
                  <span className={checked ? "font-semibold text-purple-700" : "text-gray-800"}>
                    {option.label}
                  </span>
                </li>
              )
            })
          )}
        </ul>
      )}
    </div>
  )
}
