import type { VehicularDispatchReportData } from "../types/vehicularDispatchReport"
import { apiFetch } from "./apiFetch"

export interface VehicularDispatchFormOptions {
  vehicles: Array<{ vehicle_id: string; vehicle_name: string; plate_number: string; current_odometer: number }>
  responders: Array<{ user_id: string; name: string }>
}

async function readResponse<T>(response: Response): Promise<T> {
  const result = await response.json().catch(() => ({}))
  if (!response.ok) {
    const fieldDetails = result.fields && typeof result.fields === "object"
      ? Object.entries(result.fields as Record<string, unknown>)
          .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(" ") : String(messages)}`)
          .join("\n")
      : ""
    throw new Error(fieldDetails || result.message || `Request failed (${response.status})`)
  }
  return result as T
}

export async function fetchVehicularDispatchFormOptions(): Promise<VehicularDispatchFormOptions> {
  const result = await readResponse<VehicularDispatchFormOptions>(
    await apiFetch("/report-forms/vehicular-dispatches/options"),
  )
  if (!Array.isArray(result.vehicles) || !Array.isArray(result.responders)) {
    throw new Error("The server returned incomplete vehicular dispatch options.")
  }
  return result
}

export async function fetchLatestVehicularDispatchReport(): Promise<VehicularDispatchReportData | null> {
  const result = await readResponse<{ report: VehicularDispatchReportData | null }>(
    await apiFetch("/report-forms/vehicular-dispatches/latest"),
  )
  return result.report
}

export async function submitVehicularDispatchReport(pin: string, formData: VehicularDispatchReportData) {
  return readResponse<{ dispatch: unknown }>(await apiFetch("/report-forms/vehicular-dispatches", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pinNumber: pin, formData }),
  }))
}
