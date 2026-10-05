import type { PatientLogData } from "../types/patientLog";
import { API_URL } from "./config";

export async function submitPatientLog(
  pin: string,
  formData: PatientLogData,
) {
  const formdata = new FormData();

  formdata.append("pinNumber", pin);

  formdata.append("responderDetails", JSON.stringify(formData.responderDetails));
  formdata.append("vehicularDispatch", JSON.stringify(formData.dispatch));
  formdata.append("patientDetails", JSON.stringify(formData.patientDetails));
  formdata.append("firstAidHospital", JSON.stringify(formData.firstAidHospital));
  formdata.append("inventory", JSON.stringify(formData.inventory));

  formData.waiverForm.images.forEach((file) => {
    formdata.append("images", file);
  });

  const response = await fetch(`${API_URL}/patients/debug-submit`, {
    method: "POST",
    body: formdata,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}
