import type { PatientLogRecord, PatientLogStatus } from "@/api/patients";
import { formatDuration, getElapsedMilliseconds, isSameMonth } from "@/utils/dateTime";

export const PATIENT_PAGE_SIZE = 10;

export interface PatientRow {
  id: string;
  patientLogId: string;
  date: Date;
  name: string;
  age: string;
  address: string;
  assessment: string;
  submittedBy: string;
  requestType: string;
  status: PatientLogStatus;
  record: PatientLogRecord;
}

function getReportData(record: PatientLogRecord) {
  if (!record.report_data || typeof record.report_data !== "object") return {};
  return record.report_data as Record<string, unknown>;
}

function getPatientAddress(record: PatientLogRecord) {
  const { phase, package: packageNumber, block, lot } = record.patient;
  return [phase && `Phase ${phase}`, packageNumber && `Package ${packageNumber}`, block && `Block ${block}`, lot && `Lot ${lot}`]
    .filter(Boolean)
    .join(", ") || "—";
}

function getPatientAge(record: PatientLogRecord) {
  const reportData = getReportData(record);
  const details = reportData.patientDetails;
  if (details && typeof details === "object" && "age" in details && typeof details.age === "number") {
    return String(details.age);
  }
  const age = Math.max(0, new Date(record.log_date).getFullYear() - new Date(record.patient.birthday).getFullYear());
  return Number.isFinite(age) ? String(age) : "—";
}

export function formatPatientLogId(id: string) {
  return `PT-${id.slice(0, 8).toUpperCase()}`;
}

export function toPatientRow(record: PatientLogRecord): PatientRow {
  return {
    id: formatPatientLogId(record.patient_log_id),
    patientLogId: record.patient_log_id,
    date: new Date(record.log_date),
    name: record.patient.full_name,
    age: getPatientAge(record),
    address: getPatientAddress(record),
    assessment: record.medical_assessment ?? "—",
    submittedBy: record.submitter?.name ?? record.submitter_name ?? "Unknown submitter",
    requestType: record.type_of_request.replaceAll("_", " "),
    status: record.status,
    record,
  };
}

export function getPatientAverageResponseTime(records: PatientLogRecord[]) {
  const durations = records.flatMap((record) => record.dispatches.flatMap((dispatch) => {
    if (!dispatch.depart_time || !dispatch.arrival_time) return [];
    const duration = getElapsedMilliseconds(dispatch.depart_time, dispatch.arrival_time);
    return duration !== null && duration >= 0 ? [duration] : [];
  }));
  if (durations.length === 0) return "—";
  return formatDuration(durations.reduce((total, duration) => total + duration, 0) / durations.length);
}

export function getMostCommonAgeRange(rows: PatientRow[]) {
  const ranges = new Map<string, number>();
  for (const row of rows) {
    const age = Number(row.age);
    if (!Number.isFinite(age)) continue;
    const lower = Math.floor(age / 10) * 10;
    const range = `${lower}-${lower + 9}`;
    ranges.set(range, (ranges.get(range) ?? 0) + 1);
  }
  return [...ranges.entries()].sort((first, second) => second[1] - first[1])[0]?.[0] ?? "—";
}

export function getMostCommonRequest(rows: PatientRow[]) {
  const counts = new Map<string, number>();
  for (const row of rows) counts.set(row.requestType, (counts.get(row.requestType) ?? 0) + 1);
  return [...counts.entries()].sort((first, second) => second[1] - first[1])[0]?.[0] ?? "—";
}

export function isPatientLogThisMonth(row: PatientRow) {
  return isSameMonth(row.date);
}
