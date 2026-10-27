interface DateRangeFilterProps {
  fromDate: string
  toDate: string
  onFromDateChange: (value: string) => void
  onToDateChange: (value: string) => void
  onClear: () => void
}

export default function DateRangeFilter({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  onClear,
}: DateRangeFilterProps) {
  const hasDateFilter = fromDate !== "" || toDate !== ""

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2">
      <span className="pb-2 text-xs font-semibold text-gray-600">Filter by report date</span>
      <label className="flex items-center gap-2 text-xs text-gray-600">
        From
        <input
          aria-label="Filter records from date"
          type="date"
          value={fromDate}
          max={toDate || undefined}
          onChange={(event) => onFromDateChange(event.target.value)}
          className="h-8 rounded-md border border-gray-200 bg-white px-2 text-xs text-gray-700 outline-none focus:border-purple-400"
        />
      </label>
      <label className="flex items-center gap-2 text-xs text-gray-600">
        To
        <input
          aria-label="Filter records to date"
          type="date"
          value={toDate}
          min={fromDate || undefined}
          onChange={(event) => onToDateChange(event.target.value)}
          className="h-8 rounded-md border border-gray-200 bg-white px-2 text-xs text-gray-700 outline-none focus:border-purple-400"
        />
      </label>
      {hasDateFilter && (
        <button
          type="button"
          onClick={onClear}
          className="h-8 rounded-md px-2 text-xs font-medium text-purple-700 hover:bg-purple-50"
        >
          Clear dates
        </button>
      )}
    </div>
  )
}
