import type { PatientLogData } from "../types/patientLog";
import { apiFetch } from "./apiFetch";

export interface PatientFormOptions {
  teams: Array<{ team_id: string; team_name: string }>;
  responders: Array<{ user_id: string; name: string; team_id: string | null }>;
  vehicles: Array<{ vehicle_id: string; vehicle_name: string; plate_number: string; current_odometer: number }>;
}

export async function fetchPatientFormOptions(): Promise<PatientFormOptions> {
  const response = await apiFetch("/report-forms/patients/options");
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message ?? `Request failed (${response.status})`);
  if (!Array.isArray(result.teams) || !Array.isArray(result.responders) || !Array.isArray(result.vehicles)) {
    throw new Error("The server returned incomplete patient form options.");
  }
  return result as PatientFormOptions;
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

  const response = await apiFetch("/report-forms/patients", {
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
