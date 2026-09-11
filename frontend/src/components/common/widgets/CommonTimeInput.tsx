interface CommonTimeInputProps {
  label: string
  time: string
  period: "AM" | "PM"
  onTimeChange: (value: string) => void
  onPeriodChange: (value: "AM" | "PM") => void
}

export default function CommonTimeInput({
  label,
  time,
  period,
  onTimeChange,
  onPeriodChange,
}: CommonTimeInputProps) {
  return (
    <div>
      <label className="mb-1 block text-lg font-medium text-slate-900">{label}</label>

      <div className="flex">
        <input
          type="time"
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          className="h-10 w-full rounded-l-md border border-gray-300 bg-gray-100 px-2 text-lg outline-none"
        />

        <div className="flex">
          <button
            type="button"
            onClick={() => onPeriodChange("AM")}
            className={`rounded-none border border-gray-300 px-3 text-sm ${
              period === "AM" ? "bg-orange-500 text-white" : "bg-white text-gray-800"
            }`}
          >
            AM
          </button>

          <button
            type="button"
            onClick={() => onPeriodChange("PM")}
            className={`rounded-r-md border border-gray-300 px-3 text-sm ${
              period === "PM" ? "bg-orange-500 text-white" : "bg-white text-gray-800"
            }`}
          >
            PM
          </button>
        </div>
      </div>
    </div>
  )
}
