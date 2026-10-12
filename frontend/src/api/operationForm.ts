import type { OperationLogData } from "../types/operationLog";
import { apiFetch } from "./apiFetch";

export interface OperationFormOptions {
  operationNatures: Array<{ name: string }>;
  teams: Array<{ team_id: string; team_name: string }>;
  responders: Array<{ user_id: string; name: string; team_id: string | null }>;
  vehicles: Array<{ vehicle_id: string; vehicle_name: string; plate_number: string; current_odometer: number }>;
}

export async function fetchOperationFormOptions(): Promise<OperationFormOptions> {
  const response = await apiFetch("/report-forms/operations/options");
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const fieldDetails = result.fields && typeof result.fields === "object"
      ? Object.entries(result.fields as Record<string, unknown>)
          .map(([field, messages]) => {
            const readableMessages = Array.isArray(messages) ? messages.join(" ") : String(messages);
            return `${field}: ${readableMessages}`;
          })
          .join("\n")
      : "";
    throw new Error(fieldDetails || result.message || `Request failed (${response.status})`);
  }
  if (
    !Array.isArray(result.operationNatures) ||
    !Array.isArray(result.teams) ||
    !Array.isArray(result.responders) ||
    !Array.isArray(result.vehicles)
  ) {
    throw new Error("The server returned incomplete operation form options.");
  }
  return result as OperationFormOptions;
}

export async function fetchLatestOperationReport(pin: string): Promise<OperationLogData | null> {
  const response = await apiFetch("/report-forms/operations/latest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pinNumber: pin }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message ?? `Request failed (${response.status})`);
  if (!result.report) return null;
  return result.report as OperationLogData;
}

export async function submitOperationLog(
  pin: string,
  formData: OperationLogData,
) {

  const requestBody = new FormData();

  requestBody.append("pinNumber", pin);

  requestBody.append("formData", JSON.stringify({
    operationDetails: formData.operationDetails,
    dispatch: formData.dispatch,
    people: formData.people,
    operationDescription: { description: formData.operationDescription.description },
    inventory: formData.inventory,
  }));

  formData.operationDescription.images.forEach((image) => {
    requestBody.append("images", image);
  });

  const response = await apiFetch("/report-forms/operations", {
    method: "POST",
    body: requestBody,
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const fieldDetails = result.fields && typeof result.fields === "object"
      ? Object.entries(result.fields as Record<string, unknown>)
          .map(([field, messages]) => {
            const readableMessages = Array.isArray(messages) ? messages.join(" ") : String(messages);
            return `${field}: ${readableMessages}`;
          })
          .join("\n")
      : "";
    throw new Error(fieldDetails || result.message || `Request failed (${response.status})`);
  }
  return result;
}
