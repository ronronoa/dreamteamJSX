import type { PatientLogData } from "../types/patientLog";
import { apiFetch, apiFetchWithOptionalAuth } from "./apiFetch";

export interface PatientFormOptions {
  teams: Array<{ team_id: string; team_name: string }>;
  responders: Array<{ user_id: string; name: string; team_id: string | null }>;
  vehicles: Array<{ vehicle_id: string; vehicle_name: string; plate_number: string; current_odometer: number }>;
}

export interface PatientLogOcrResult {
  requestFor: "TRANSPORT_ASSISTANCE" | "EMERGENCY" | "INTER_FACILITY_TRANSFER" | "FIRST_AID" | "";
  date: string;
  time: string;
  from: string;
  to: string;
  patient: {
    name: string;
    age: string;
    gender: "MALE" | "FEMALE" | "";
    birthday: string;
    address: {
      phase: number | null;
      package: number | null;
      block: number | null;
      lot: number | null;
    };
    contactPerson: string;
    contactNumber: string;
  };
  assessment: string;
  vitals: {
    bp: string;
    pr: string;
    spo2: string;
    temp: string;
  };
  dispositionType: "DROP_OFF" | "PICK_UP" | "";
  patientNameAndSignature: string;
  guardianNameAndSignature: string;
  waiver: string;
  teamInformation: {
    ambulanceDriver: string;
    responder: string[];
  };
  timeInformation: {
    barangayOut: string;
    barangayIn: string;
    hospitalIn: string;
    hospitalOut: string;
    odometerOut: string;
    odometerIn: string;
  };
  checkedBy: string;
  hospitalRepresentative: string;
}

const MAX_OCR_IMAGE_BYTES = 8 * 1024 * 1024;

export async function fetchPatientFormOptions(): Promise<PatientFormOptions> {
  const response = await apiFetch("/report-forms/patients/options");
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message ?? `Request failed (${response.status})`);
  if (!Array.isArray(result.teams) || !Array.isArray(result.responders) || !Array.isArray(result.vehicles)) {
    throw new Error("The server returned incomplete patient form options.");
  }
  return result as PatientFormOptions;
}

export async function scanPatientLogImage(file: File): Promise<PatientLogOcrResult> {
  if (file.size > MAX_OCR_IMAGE_BYTES) {
    throw new Error("The image must be 8 MB or smaller.");
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await apiFetchWithOptionalAuth("/report-forms/patients/scan", {
    method: "POST",
    body: formData,
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message ?? `Image scan failed (${response.status}).`);
  }

  return result as PatientLogOcrResult;
}

export async function fetchLatestPatientReport(): Promise<PatientLogData | null> {
  const response = await apiFetch("/report-forms/patients/latest");
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message ?? `Request failed (${response.status})`);
  if (!result.report) return null;
  return result.report as PatientLogData;
}

export async function submitPatientLog(
  pin: string,
  formData: PatientLogData,
) {
  const formdata = new FormData();
  formdata.append("pinNumber", pin);
  formdata.append("formData", JSON.stringify(formData));
  formData.waiverForm.images.forEach((file) => {
    formdata.append("images", file);
  });

  const response = await apiFetchWithOptionalAuth("/report-forms/patients", {
    method: "POST",
    body: formdata,
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const fieldDetails = result.fields && typeof result.fields === "object"
      ? Object.entries(result.fields as Record<string, unknown>)
          .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(" ") : String(messages)}`)
          .join("\n")
      : "";
    throw new Error(fieldDetails || result.message || `Request failed (${response.status})`);
  }
  return result;
}
