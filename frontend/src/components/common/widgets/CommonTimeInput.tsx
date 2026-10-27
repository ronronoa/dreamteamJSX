// deepseek +10 credit score 🔥🔥🗿🗿 
// got no idea how this works

import { Fragment, useCallback, useEffect, useRef, useState } from "react"
import { InputBase } from "@/components/base/input/input"
import { useEscapeKey } from "@/hooks/useModalKeys"

interface CommonTimeInputProps {
  label: string
  time: string
  period: "AM" | "PM"
  onTimeChange: (value: string) => void
  onPeriodChange: (value: "AM" | "PM") => void
  errorMessage?: string
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

/**
 * Resolves raw typed hour digits into a valid 12-hour value, plus
 * whether the period needs to flip as a result (24-hour-style entry).
 *
 * 0        -> 12, no period change (e.g. "00:xx" -> 12:xx, keep current AM/PM)
 * 1-12     -> unchanged, no period change
 * 13-23    -> hour - 12, force PM (24-hour-style entry, e.g. 13 -> 1 PM)
 * anything else (24+, empty) -> falls back to 12, no period change
 */
function resolveHour(hourDigits: string): { hour: number; periodOverride?: "AM" | "PM" } {
  if (hourDigits === "") return { hour: 12 }

  const rawHour = Number(hourDigits)

  if (Number.isNaN(rawHour) || rawHour === 0 || rawHour > 23) {
    return { hour: 12 }
  }

  if (rawHour > 12) {
    return { hour: rawHour - 12, periodOverride: "PM" }
  }

  return { hour: rawHour }
}

/** ["0", "9", "3", "0"] -> { value: "09:30", periodOverride?: "PM" } */
function toTimeValue(digits: Digits): { value: string; periodOverride?: "AM" | "PM" } {
  const hourDigits = `${digits[0]}${digits[1]}`
  const minuteDigits = `${digits[2]}${digits[3]}`

  const { hour, periodOverride } = resolveHour(hourDigits)

  let minute = minuteDigits === "" ? 0 : Number(minuteDigits)
  if (Number.isNaN(minute) || minute > 59) minute = 59

  return {
    value: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    periodOverride,
  }
}

export default function CommonTimeInput({
  label,
  time,
  period,
  onTimeChange,
  onPeriodChange,
  errorMessage,
}: CommonTimeInputProps) {
  const [digits, setDigits] = useState<Digits>(() => toDigits(time))
  const [isEditing, setIsEditing] = useState(false)
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  // Remembers the last value we pushed up so we can tell our own updates
  // apart from the parent resetting the field from the outside.
  const lastEmitted = useRef(time)

  useEffect(() => {
    if (time === lastEmitted.current) {
      // Restored form data can match the parent's value while this input
      // still has its initial empty digit state.
      setDigits((current) => {
        const restoredDigits = toDigits(time)
        return current.join("") === restoredDigits.join("") ? current : restoredDigits
      })
      return
    }
    lastEmitted.current = time
    setDigits(toDigits(time))
  }, [time])

  const commit = useCallback((next: Digits) => {
    const { value, periodOverride } = toTimeValue(next)

    lastEmitted.current = value
    onTimeChange(value)

    if (periodOverride && periodOverride !== period) {
      onPeriodChange(periodOverride)
    }
  }, [onTimeChange, onPeriodChange, period])

  const updateDigit = (index: number, rawValue: string) => {
    const digit = rawValue.replace(/\D/g, "").slice(-1)

    const next = [...digits] as Digits
    next[index] = digit

    setDigits(next)

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

  // Snap stray values like "23" or "00" back to something valid
  // once the user leaves the field entirely.
  const finalizeInput = useCallback(() => {
    // Nothing was typed — leave the field visually empty instead of
    // silently snapping it to a fake default.
    const isEmpty = digits.every((digit) => digit === "")
    if (isEmpty) {
      lastEmitted.current = ""
      onTimeChange("")
      setIsEditing(false)
      return
    }

    const { value } = toTimeValue(digits)
    const next = toDigits(value)
    setDigits(next)
    commit(next)
    setIsEditing(false)
  }, [digits, onTimeChange, commit])

  const handleEscape = useCallback(() => {
    const activeInput = inputRefs.current.find((input) => input === document.activeElement)
    if (activeInput) {
      activeInput.blur()
      return
    }
    finalizeInput()
  }, [finalizeInput])

  useEscapeKey({
    open: isEditing,
    onClose: handleEscape,
  })

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (e.currentTarget.contains(e.relatedTarget as Node | null)) return
    finalizeInput()
  }

  return (
    <div>
      <label className="mb-1 flex flex-wrap items-baseline justify-between gap-x-2 text-lg font-medium text-slate-900">
        <span>{label}</span>
      </label>

      <div className={`inline-flex w-fit max-w-full rounded-md ${errorMessage ? "border-2 border-red-500" : ""}`} onBlur={handleBlur}>
        <div className="flex h-10 items-center rounded-l-md border border-gray-300 bg-gray-100">
          {digits.map((digit, index) => (
            <Fragment key={index}>
              {index === 2 && (
                <span className="px-0.5 text-lg font-medium text-slate-700">
                  :
                </span>
              )}

              <InputBase
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
                onFocus={(e) => {
                  setIsEditing(true)
                  e.target.select()
                }}
                onClick={(e) => e.currentTarget.select()}
                wrapperClassName="mx-1 h-8 w-12 rounded-full border border-gray-300 bg-transparent shadow-none ring-0 focus-within:bg-white focus-within:ring-1 focus-within:ring-orange-500 md:mx-0.5 md:w-8 md:rounded"
                inputClassName="h-full w-full rounded-[inherit] p-0 text-center text-lg text-slate-900 outline-none"
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
      {errorMessage && <p role="alert" className="mt-1 text-xs font-medium text-red-700">{errorMessage}</p>}
    </div>
  )
}
