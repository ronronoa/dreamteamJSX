export type TimePeriod = "AM" | "PM";

export function get12HourTimeParts(time: string): { time: string; period: TimePeriod } {
  if (!time) return { time: "", period: "AM" };

  const [hoursText, minutes = "00"] = time.split(":");
  const hours = Number(hoursText);
  if (!Number.isInteger(hours) || hours < 0 || hours > 23) {
    return { time, period: "AM" };
  }

  return {
    time: `${String(hours % 12 || 12).padStart(2, "0")}:${minutes}`,
    period: hours >= 12 ? "PM" : "AM",
  };
}

export function to24HourTimeValue(time: string, period: TimePeriod): string {
  if (!time) return "";

  const [hoursText, minutes = "00"] = time.split(":");
  const twelveHour = Number(hoursText);
  if (!Number.isInteger(twelveHour) || twelveHour < 1 || twelveHour > 12) {
    return time;
  }

  let hours = twelveHour % 12;
  if (period === "PM") hours += 12;
  return `${String(hours).padStart(2, "0")}:${minutes}`;
}
