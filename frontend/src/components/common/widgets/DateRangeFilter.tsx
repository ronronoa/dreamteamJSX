import { useState } from "react";
import { format, isValid, parseISO } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Popover } from "@base-ui/react/popover";
import { Calendar } from "@/components/ui/calendar";

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
  const fromDateValue = parseDateValue(fromDate)
  const toDateValue = parseDateValue(toDate)

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5">
      <span className="text-xs font-semibold text-gray-600">Filter by report date</span>
      <DateRangeCalendar
        label="From"
        ariaLabel="Filter records from date"
        value={fromDateValue}
        maximumDate={toDateValue}
        onChange={onFromDateChange}
      />
      <DateRangeCalendar
        label="To"
        ariaLabel="Filter records to date"
        value={toDateValue}
        minimumDate={fromDateValue}
        onChange={onToDateChange}
      />
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

// <div className="flex flex-wrap items-end gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2">
//   <span className="pb-2 text-xs font-semibold text-gray-600">Filter by report date</span>
//   <label className="flex items-center gap-2 text-xs text-gray-600">
//     From
//     <input
//       aria-label="Filter records from date"
//       type="date"
//       value={fromDate}
//       max={toDate || undefined}
//       onChange={(event) => onFromDateChange(event.target.value)}
//       className="h-8 rounded-md border border-gray-200 bg-white px-2 text-xs text-gray-700 outline-none focus:border-purple-400"
//     />
//   </label>
//   <label className="flex items-center gap-2 text-xs text-gray-600">
//     To
//     <input
//       aria-label="Filter records to date"
//       type="date"
//       value={toDate}
//       min={fromDate || undefined}
//       onChange={(event) => onToDateChange(event.target.value)}
//       className="h-8 rounded-md border border-gray-200 bg-white px-2 text-xs text-gray-700 outline-none focus:border-purple-400"
//     />
//   </label>
//   {hasDateFilter && (
//     <button type="button" onClick={onClear}>
//       Clear dates
//     </button>
//   )}
// </div>
  )
}

function DateRangeCalendar({
  label,
  ariaLabel,
  value,
  minimumDate,
  maximumDate,
  onChange,
}: {
  label: string;
  ariaLabel: string;
  value: Date | undefined;
  minimumDate?: Date;
  maximumDate?: Date;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  function handleSelect(date: Date | undefined) {
    if (!date) return;
    onChange(format(date, "yyyy-MM-dd"));
    setOpen(false);
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        type="button"
        aria-label={ariaLabel}
        className="inline-flex h-8 items-center gap-2 rounded-md border border-gray-200 bg-white px-2 text-xs text-gray-700 outline-none hover:bg-gray-50 focus-visible:border-purple-400 focus-visible:ring-2 focus-visible:ring-purple-100"
      >
        <span className="text-gray-500">{label}</span>
        <CalendarDays size={14} className="text-gray-500" />
        <span>{value ? format(value, "MMM d, yyyy") : "Select date"}</span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={6} align="start" className="z-50">
          <Popover.Popup className="rounded-xl border border-gray-200 bg-white p-1 shadow-lg outline-none">
            <Calendar
              mode="single"
              captionLayout="dropdown"
              selected={value}
              defaultMonth={value}
              onSelect={handleSelect}
              disabled={(date) => Boolean(
                (minimumDate && date < minimumDate) ||
                (maximumDate && date > maximumDate),
              )}
            />
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

function parseDateValue(value: string): Date | undefined {
  if (!value) return undefined;

  const date = parseISO(value);
  return isValid(date) ? date : undefined;
}
