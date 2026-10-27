import { useEffect, useId, useMemo, useState } from "react"
import CommonTextarea from "@/components/common/widgets/CommonTextarea"
import { apiFetch } from "@/api/apiFetch"

type ReportFormType = "operations" | "patients" | "vehicular-dispatches"
type Props = React.ComponentProps<typeof CommonTextarea> & {
  formType: ReportFormType
  suggestionField: string
}

const MAX_VISIBLE_SUGGESTIONS = 5
const suggestionRequests = new Map<ReportFormType, Promise<Record<string, string[]>>>()

function loadSuggestions(formType: ReportFormType) {
  let request = suggestionRequests.get(formType)
  if (!request) {
    request = apiFetch(`/report-forms/${formType}/suggestions`)
      .then(async (response) => {
        const result: unknown = await response.json().catch(() => ({}))
        if (!response.ok || typeof result !== "object" || result === null || Array.isArray(result)) return {}
        return result as Record<string, string[]>
      })
      .catch(() => ({}))
    suggestionRequests.set(formType, request)
  }
  return request
}

export default function ReportAutocompleteTextarea({ formType, suggestionField, value, onChange, onBlur, onFocus, ...props }: Props) {
  const listId = useId()
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const inputValue = String(value ?? "")

  useEffect(() => {
    let isMounted = true
    void loadSuggestions(formType).then((values) => {
      if (isMounted) setSuggestions(values[suggestionField] ?? [])
    })
    return () => { isMounted = false }
  }, [formType, suggestionField])

  const matchingSuggestions = useMemo(() => {
    const query = inputValue.trim().toLocaleLowerCase()
    return suggestions.filter((suggestion) => !query || suggestion.toLocaleLowerCase().includes(query)).slice(0, MAX_VISIBLE_SUGGESTIONS)
  }, [inputValue, suggestions])

  function chooseSuggestion(suggestion: string) {
    const target = { value: suggestion } as HTMLTextAreaElement
    onChange?.({ target, currentTarget: target } as React.ChangeEvent<HTMLTextAreaElement>)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <CommonTextarea
        {...props}
        value={value}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isOpen && matchingSuggestions.length > 0}
        aria-controls={listId}
        onChange={(event) => {
          onChange?.(event)
          setIsOpen(true)
        }}
        onFocus={(event) => {
          onFocus?.(event)
          setIsOpen(true)
        }}
        onBlur={(event) => {
          onBlur?.(event)
          setIsOpen(false)
        }}
      />
      {isOpen && matchingSuggestions.length > 0 && (
        <ul id={listId} role="listbox" className="absolute z-30 mt-1 max-h-48 w-full overflow-auto rounded-md border border-gray-300 bg-white py-1 shadow-lg">
          {matchingSuggestions.map((suggestion, index) => (
            <li key={`${suggestion}-${index}`} role="option" aria-selected="false">
              <button type="button" className="w-full px-3 py-2 text-left text-sm text-slate-800 hover:bg-purple-50" onMouseDown={(event) => event.preventDefault()} onClick={() => chooseSuggestion(suggestion)}>
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
