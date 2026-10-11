import type { PatientLogData } from "../types/patientLog";
import { apiFetch } from "./apiFetch";

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
    throw new Error(result.message ?? `Request failed (${response.status})`);
  }
  return result;
}
