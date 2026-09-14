// deepseek +10 credit score 🔥🔥🗿🗿 
// got no idea how this works

import { Fragment, useEffect, useRef, useState } from "react"

interface CommonTimeInputProps {
  label: string
  time: string
  period: "AM" | "PM"
  onTimeChange: (value: string) => void
  onPeriodChange: (value: "AM" | "PM") => void
}

type Digits = [string, string, string, string]

const EMPTY_DIGITS: Digits = ["", "", "", ""]

/** "9:30" | "09:30" -> ["0", "9", "3", "0"] */
function toDigits(time: string): Digits {
  if (!time) return [...EMPTY_DIGITS] as Digits

  const [rawHour = "", rawMinute = ""] = time.split(":")
  const hour = rawHour.padStart(2, "0").slice(-2)
  const minute = rawMinute.padStart(2, "0").slice(-2)

  return [hour[0] ?? "", hour[1] ?? "", minute[0] ?? "", minute[1] ?? ""]
}

/** ["0", "9", "3", "0"] -> "09:30" (always a valid 12-hour clock value) */
function toTimeValue(digits: Digits): string {
  const hourDigits = `${digits[0]}${digits[1]}`
  const minuteDigits = `${digits[2]}${digits[3]}`

  let hour = hourDigits === "" ? 12 : Number(hourDigits)
  if (hour < 1 || hour > 12) hour = 12

  let minute = minuteDigits === "" ? 0 : Number(minuteDigits)
  if (minute > 59) minute = 59

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
}

export default function CommonTimeInput({
  label,
  time,
  period,
  onTimeChange,
  onPeriodChange,
}: CommonTimeInputProps) {
  const [digits, setDigits] = useState<Digits>(() => toDigits(time))
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  // Remembers the last value we pushed up so we can tell our own updates
  // apart from the parent resetting the field from the outside.
  const lastEmitted = useRef(time)

  useEffect(() => {
    if (time === lastEmitted.current) return
    lastEmitted.current = time
    setDigits(toDigits(time))
  }, [time])

  const commit = (next: Digits) => {
    const value = toTimeValue(next)
    lastEmitted.current = value
    onTimeChange(value)
  }

  const updateDigit = (index: number, rawValue: string) => {
    const digit = rawValue.replace(/\D/g, "").slice(-1)

    const next = [...digits] as Digits
    next[index] = digit

    setDigits(next)
    commit(next)

    if (digit && index < next.length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && digits[index] === "" && index > 0) {
      e.preventDefault()
      const next = [...digits] as Digits
      next[index - 1] = ""
      setDigits(next)
      commit(next)
      inputRefs.current[index - 1]?.focus()
      return
    }

    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault()
      inputRefs.current[index - 1]?.focus()
    }

    if (e.key === "ArrowRight" && index < digits.length - 1) {
      e.preventDefault()
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Snap stray values like "13" or "00" back to something valid
  // once the user leaves the field entirely.
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (e.currentTarget.contains(e.relatedTarget as Node | null)) return
    setDigits(toDigits(toTimeValue(digits)))
  }

  return (
    <div>
      <label className="mb-1 block text-lg font-medium text-slate-900">
        {label}
      </label>

      <div className="flex" onBlur={handleBlur}>
        <div className="flex h-10 items-center rounded-l-md border border-gray-300 bg-gray-100">
          {digits.map((digit, index) => (
            <Fragment key={index}>
              {index === 2 && (
                <span className="px-0.5 text-lg font-medium text-slate-700">
                  :
                </span>
              )}

              <input
                ref={(el) => {
                  inputRefs.current[index] = el
                }}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                maxLength={1}
                value={digit}
                aria-label={`${label} ${index < 2 ? "hour" : "minute"} digit`}
                onChange={(e) => updateDigit(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onFocus={(e) => e.target.select()}
                onClick={(e) => e.currentTarget.select()}
                className="
                border border-gray-300
                h-8 w-12 md:w-8
                rounded-full md:rounded
                mx-1 md:mx-0.5
                bg-transparent
                text-center text-lg text-slate-900
                outline-none
                focus:bg-white focus:ring-1 focus:ring-orange-500
                "
              />
            </Fragment>
          ))}
        </div>

        <div className="flex">
          <button
            type="button"
            onClick={() => onPeriodChange("AM")}
            className={`rounded-none border border-gray-300 px-3 text-sm ${
              period === "AM"
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            AM
          </button>

          <button
            type="button"
            onClick={() => onPeriodChange("PM")}
            className={`rounded-r-md border border-gray-300 px-3 text-sm ${
              period === "PM"
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            PM
          </button>
        </div>
      </div>
    </div>
  )
}
