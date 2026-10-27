import { useEffect, useId, useMemo, useState } from "react"
import CommonInput, { type CommonInputProps } from "@/components/common/widgets/CommonInput"
import { apiFetch } from "@/api/apiFetch"

type ReportFormType = "operations" | "patients" | "vehicular-dispatches"
type SuggestionMap = Record<string, string[]>

const MAX_VISIBLE_SUGGESTIONS = 8
const suggestionRequests = new Map<ReportFormType, Promise<SuggestionMap>>()

async function loadSuggestions(formType: ReportFormType): Promise<SuggestionMap> {
  const existingRequest = suggestionRequests.get(formType)
  if (existingRequest) return existingRequest

  const request = apiFetch(`/report-forms/${formType}/suggestions`)
    .then(async (response) => {
      const result: unknown = await response.json().catch(() => ({}))
      if (!response.ok || typeof result !== "object" || result === null || Array.isArray(result)) return {}
      return result as SuggestionMap
    })
    .catch(() => ({}))
    .finally(() => suggestionRequests.delete(formType))
  suggestionRequests.set(formType, request)
  return request
}

type ReportAutocompleteInputProps = CommonInputProps & {
  formType: ReportFormType
  suggestionField?: string
}

function getSuggestionField(formType: ReportFormType, props: CommonInputProps): string | undefined {
  const label = props.label?.trim().toLocaleLowerCase()
  const placeholder = props.placeholder?.trim().toLocaleLowerCase()
  const text = label || placeholder
  if (!text) return undefined

  if (text.includes("submitter")) {
    return formType === "patients" ? "responderDetails.submitterName" : "details.submitterName"
  }
  if (text === "from" || text.includes("barangay hall")) return "dispatch.from"
  if (text === "to") return "dispatch.to"
  if (text.includes("driver")) return "dispatch.driver"
  if (text.includes("specify vehicle")) return "dispatch.vehicleOther"
  if (text.includes("surname")) return "person.surname"
  if (text.includes("first name")) return "person.firstName"
  if (text === "m.i") return "person.middleInitial"
  if (text === "sfx") return "person.suffix"
  if (text.includes("contact number")) return "person.contactNumber"
  if (text === "phase") return "person.address.phase"
  if (text === "package") return "person.address.package"
  if (text === "block") return "person.address.block"
  if (text === "lot") return "person.address.lot"
  if (text.includes("hospital name")) return "firstAidHospital.hospitalName"
  if (text.includes("medical assessment")) return "firstAidHospital.medicalAssessment"
  return undefined
}

export default function ReportAutocompleteInput({ formType, suggestionField, value, onChange, onBlur, onFocus, onKeyDown, ...inputProps }: ReportAutocompleteInputProps) {
  const listId = useId()
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputValue = String(value ?? "")
  const resolvedSuggestionField = suggestionField ?? getSuggestionField(formType, inputProps)

  useEffect(() => {
    if (!resolvedSuggestionField) return
    let isMounted = true
    void loadSuggestions(formType).then((suggestionMap) => {
      if (isMounted) setSuggestions(suggestionMap[resolvedSuggestionField] ?? [])
    })
    return () => { isMounted = false }
  }, [formType, resolvedSuggestionField])

  const matchingSuggestions = useMemo(() => {
    const query = inputValue.trim().toLocaleLowerCase()
    return suggestions
      .filter((suggestion) => !query || suggestion.toLocaleLowerCase().includes(query))
      .slice(0, MAX_VISIBLE_SUGGESTIONS)
  }, [inputValue, suggestions])

  function chooseSuggestion(suggestion: string) {
    const target = { value: suggestion } as HTMLInputElement
    onChange?.({ target, currentTarget: target } as React.ChangeEvent<HTMLInputElement>)
    setIsOpen(false)
    setActiveIndex(-1)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(event)
    if (event.defaultPrevented || !isOpen || matchingSuggestions.length === 0) return

    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((index) => (index + 1) % matchingSuggestions.length)
      return
    }
    if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((index) => index <= 0 ? matchingSuggestions.length - 1 : index - 1)
      return
    }
    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault()
      chooseSuggestion(matchingSuggestions[activeIndex]!)
      return
    }
    if (event.key === "Escape") setIsOpen(false)
  }

  return (
    <div className="relative">
      <CommonInput
        {...inputProps}
        value={value}
        onChange={(event) => {
          onChange?.(event)
          setIsOpen(true)
          setActiveIndex(-1)
        }}
        onFocus={(event) => {
          onFocus?.(event)
          setIsOpen(true)
        }}
        onBlur={(event) => {
          onBlur?.(event)
          setIsOpen(false)
          setActiveIndex(-1)
        }}
        onKeyDown={handleKeyDown}
        role={resolvedSuggestionField ? "combobox" : undefined}
        aria-autocomplete={resolvedSuggestionField ? "list" : undefined}
        aria-expanded={resolvedSuggestionField ? isOpen && matchingSuggestions.length > 0 : undefined}
        aria-controls={resolvedSuggestionField ? listId : undefined}
      />
      {isOpen && matchingSuggestions.length > 0 && (
        <ul id={listId} role="listbox" className="absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-md border border-gray-300 bg-white py-1 shadow-lg">
          {matchingSuggestions.map((suggestion, index) => (
            <li key={`${suggestion}-${index}`} role="option" aria-selected={activeIndex === index}>
              <button
                type="button"
                className={`w-full px-3 py-2 text-left text-sm text-slate-800 hover:bg-purple-50 ${activeIndex === index ? "bg-purple-50" : ""}`}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => chooseSuggestion(suggestion)}
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function createFormAutocomplete(formType: ReportFormType) {
  return function FormAutocompleteInput(props: CommonInputProps & { suggestionField?: string }) {
    return <ReportAutocompleteInput {...props} formType={formType} />
  }
}
