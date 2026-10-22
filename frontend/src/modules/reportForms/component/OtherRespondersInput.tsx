import { useState } from "react"
import { Plus, X } from "lucide-react"

type OtherRespondersInputProps = {
  value: string[]
  onChange: (responders: string[]) => void
  variant?: "default" | "dark"
}

export default function OtherRespondersInput({ value, onChange, variant = "default" }: OtherRespondersInputProps) {
  const [name, setName] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const isDark = variant === "dark"

  const addResponder = () => {
    const responderName = name.trim()
    if (!responderName) return

    const alreadyAdded = value.some((responder) => responder.toLowerCase() === responderName.toLowerCase())
    if (!alreadyAdded) onChange([...value, responderName])
    setName("")
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        className={`inline-flex items-center gap-1 text-sm font-medium ${isDark ? "text-white hover:text-purple-200" : "text-purple-700 hover:text-purple-900"}`}
        onClick={() => setIsOpen((isVisible) => !isVisible)}
      >
        <Plus aria-hidden="true" size={16} />
        <span>{isOpen ? "Other responder" : "Add other responder"}</span>
      </button>

      {isOpen && (
        <div className="flex gap-2">
          <input
            className="h-9 min-w-0 flex-1 rounded-md border border-gray-300 bg-white px-2 text-sm"
            aria-label="Other responder name"
            placeholder="Type responder name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault()
                addResponder()
              }
            }}
          />
          <button
            type="button"
            aria-label="Add responder"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-purple-700 text-white hover:bg-purple-800"
            onClick={addResponder}
          >
            <Plus aria-hidden="true" size={18} />
          </button>
        </div>
      )}

      {value.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label="Added responders">
          {value.map((responder) => (
            <li
              key={responder}
              className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm ${isDark ? "border border-white/25 bg-white/10 text-white" : "bg-purple-50 text-purple-900"}`}
            >
              <span>{responder}</span>
              <button
                type="button"
                aria-label={`Remove ${responder}`}
                className={isDark ? "text-white hover:text-purple-200" : "text-purple-700 hover:text-purple-950"}
                onClick={() => onChange(value.filter((name) => name !== responder))}
              >
                <X aria-hidden="true" size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
