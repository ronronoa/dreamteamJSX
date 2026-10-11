import type { OperationRecord, OperationStatus } from "@/api/operations";
import { formatDuration, getElapsedMilliseconds, isSameMonth } from "@/utils/dateTime";

export const OPERATION_PAGE_SIZE = 10;

export interface OperationRow {
  id: string;
  operationId: string;
  date: Date;
  caller: string;
  incident: string;
  location: string;
  team: string;
  submittedBy: string;
  status: OperationStatus;
  record: OperationRecord;
}

export type ReviewAction = "approve" | "reject";

export function formatPersonAddress(person: OperationRecord["personsInvolved"][number]) {
  const addressParts = [
    person.address_phase && `Phase ${person.address_phase}`,
    person.address_package && `Package ${person.address_package}`,
    person.address_block && `Block ${person.address_block}`,
    person.address_lot && `Lot ${person.address_lot}`,
  ].filter(Boolean);

  return addressParts.join(", ") || person.address || "—";
}

export function formatOperationId(id: string) {
  return `OP-${id.slice(0, 8).toUpperCase()}`;
}

export function getPersonAddress(record: OperationRecord) {
  const person = record.personsInvolved[0];
  if (!person) return "";

  return formatPersonAddress(person);
}

export function toOperationRow(record: OperationRecord): OperationRow {
  const dispatch = record.dispatches[0];
  const teams = record.teamAssignments.map(({ team }) => team.team_name);

  return {
    id: formatOperationId(record.operation_id),
    operationId: record.operation_id,
    date: new Date(record.operation_date),
    caller: record.name_of_caller,
    incident: record.nature_of_operation,
    location: getPersonAddress(record) || dispatch?.to_location || dispatch?.from_location || "—",
    team: teams.length > 0 ? teams.join(", ") : record.team.team_name,
    submittedBy: record.submitter?.name ?? record.submitter_name ?? "Unknown submitter",
    status: record.status,
    record,
  };
}

export function getMostFrequent(values: string[]) {
  const counts = new Map<string, number>();

  for (const value of values) {
    const normalized = value.trim();
    if (normalized && normalized !== "—") {
      counts.set(normalized, (counts.get(normalized) ?? 0) + 1);
    }
  }

  let mostFrequent = "—";
  let highestCount = 0;
  for (const [value, count] of counts) {
    if (count > highestCount) {
      mostFrequent = value;
      highestCount = count;
    }
  }

  return mostFrequent;
}

export function getAverageResponseTime(records: OperationRecord[]) {
  const durations = records.flatMap((record) => record.dispatches.flatMap((dispatch) => {
    if (!dispatch.depart_time || !dispatch.arrival_time) return [];
    const duration = getElapsedMilliseconds(dispatch.depart_time, dispatch.arrival_time);
    return duration !== null && duration >= 0 ? [duration] : [];
  }));

  if (durations.length === 0) return "—";

  const averageDuration = durations.reduce((sum, duration) => sum + duration, 0) / durations.length;
  return formatDuration(averageDuration);
}

export function isCurrentMonth(date: Date) {
  return isSameMonth(date);
}

