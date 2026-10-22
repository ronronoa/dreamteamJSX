import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

type DateTimeValue = string | number | Date | null | undefined;

function formatDateTimeValue(value: DateTimeValue, pattern: string) {
  if (value === null || value === undefined) return "—";

  const date = dayjs(value);
  return date.isValid() ? date.format(pattern) : "—";
}

export function formatDate(value: DateTimeValue, pattern = "MMM D, YYYY") {
  return formatDateTimeValue(value, pattern);
}

export function getCurrentDateInputValue() {
  return dayjs().format("YYYY-MM-DD");
}

export const MAX_REASONABLE_AGE = 120;

export function calculateBirthdateFromAge(ageValue: string | number): string {
  const age = Number(ageValue);
  if (
    String(ageValue).trim() === "" ||
    !Number.isInteger(age) ||
    age < 0 ||
    age > MAX_REASONABLE_AGE
  ) {
    return "";
  }

  return `${dayjs().year() - age}-01-01`;
}

export function isValidDateInputNotInFuture(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const parsedDate = new Date(year, month - 1, day);
  const isRealDate = parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getDate() === day;

  return isRealDate && value <= getCurrentDateInputValue();
}

export function getCurrentTimeInputValue() {
  return dayjs().format("HH:mm");
}

export function formatTime(value: DateTimeValue, pattern = "h:mm A") {
  return formatDateTimeValue(value, pattern);
}

export function formatDateTime(value: DateTimeValue, pattern = "MMM D, YYYY h:mm A") {
  return formatDateTimeValue(value, pattern);
}

export function formatDuration(milliseconds: number) {
  if (!Number.isFinite(milliseconds) || milliseconds < 0) return "—";

  const roundedMinutes = Math.round(dayjs.duration(milliseconds).asMinutes());
  const days = Math.floor(roundedMinutes / (24 * 60));
  const hours = Math.floor((roundedMinutes % (24 * 60)) / 60);
  const minutes = roundedMinutes % 60;

  if (days > 0) {
    return `${days}d${hours > 0 ? ` ${hours}h` : ""}`;
  }

  if (hours > 0) {
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  }

  return `${minutes}m`;
}

export function isSameMonth(value: DateTimeValue, comparisonDate: DateTimeValue = new Date()) {
  const date = dayjs(value);
  return date.isValid() && date.isSame(dayjs(comparisonDate), "month");
}

export function getElapsedMilliseconds(start: DateTimeValue, end: DateTimeValue) {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  if (!startDate.isValid() || !endDate.isValid()) return null;
  return endDate.diff(startDate);
}

export function getDaysUntil(value: DateTimeValue, comparisonDate: DateTimeValue = new Date()) {
  const date = dayjs(value);
  const comparison = dayjs(comparisonDate);
  if (!date.isValid() || !comparison.isValid()) return null;
  return date.diff(comparison, "day", true);
}

export function calculateAge(birthdate: string): number | "" {
  if (!birthdate) return "";

  const birthDate = dayjs(birthdate);
  if (!birthDate.isValid()) return "";

  return dayjs().diff(birthDate, "year");
}
