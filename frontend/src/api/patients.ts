import { apiFetch } from "./apiFetch";

export type PatientLogStatus = "PENDING" | "TO_REVIEW" | "VALIDATED" | "REJECTED" | "ARCHIVED";

export interface PatientLogRecord {
  patient_log_id: string;
  patient_id: string;
  log_date: string;
  type_of_request: string;
  submitted_by: string | null;
  submitter_name: string | null;
  status: PatientLogStatus;
  rejected_reason: string | null;
  name_of_caller: string | null;
  bp: string | null;
  pr: string | null;
  spo2: string | null;
  temp: string | null;
  medical_assessment: string | null;
  report_data: unknown;
  hospital_name: string | null;
  hospital_representative: string | null;
  hospital_in_time: string | null;
  hospital_out_time: string | null;
  createdAt: string;
  patient: {
    patient_id: string;
    full_name: string;
    birthday: string;
    sex: string;
    contact_person: string;
    contact_number: string;
    phase: string | null;
    package: string | null;
    block: string | null;
    lot: string | null;
    images: Array<{ attachment_id: string; image_url: string; file_type: string | null }>;
  };
  submitter: { user_id: string; name: string; username: string } | null;
  responders: Array<{ user: { user_id: string; name: string } }>;
  dispatches: Array<{
    dispatch_id: string;
    from_location: string | null;
    to_location: string | null;
    driver_name: string | null;
    depart_time: string | null;
    arrival_time: string | null;
    odometer_in: number | null;
    odometer_out: number | null;
    vehicle: { vehicle_name: string; plate_number: string } | null;
  }>;
};

async function parseResponse<T>(response: Response): Promise<T> {
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message ?? `Request failed (${response.status})`);
  return result as T;
}

export async function fetchPatientLogs(accessToken: string) {
  const response = await apiFetch("/patient-logs", { headers: { Authorization: `Bearer ${accessToken}` } });
  const result = await parseResponse<{ patientLogs: PatientLogRecord[] }>(response);
  return result.patientLogs;
}

export async function reviewPatientLog(
  accessToken: string,
  patientLogId: string,
  action: "authorize" | "validate" | "reject",
  pin: string,
  rejectedReason?: string,
) {
  const response = await apiFetch(`/patient-logs/${patientLogId}/${action}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ pin, ...(rejectedReason && { rejected_reason: rejectedReason }) }),
  });
  return parseResponse<{ patientLog: PatientLogRecord }>(response);
}

export async function archivePatientLog(accessToken: string, patientLogId: string) {
  const response = await apiFetch(`/archives/patient/${patientLogId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return parseResponse<{ archived: boolean }>(response);
}
