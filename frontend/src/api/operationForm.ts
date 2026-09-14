import type { OperationLogData } from "../types/operationLog";
import { API_URL } from "./config";

// TODO: 
export async function submitOperationLog(
  pin: string,
  formData: OperationLogData,
) {
  const formdata = new FormData();

  formdata.append("pinNumber", pin);

  formdata.append("operationDetails", JSON.stringify(formData.operationDetails));
  formdata.append("vehicularDispatch", JSON.stringify(formData.dispatch));
  formdata.append("peopleInvolved", JSON.stringify(formData.people));
  formdata.append("operationDescription", formData.operationDescription.description);
  formdata.append("inventory", JSON.stringify(formData.inventory));

  formData.operationDescription.images.forEach((file) => {
    formdata.append("images", file); 
  });

  const response = await fetch(`${API_URL}/operations`, {
    method: "POST",
    body: formdata,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}
