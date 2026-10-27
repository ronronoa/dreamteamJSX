import { formatDuration, getElapsedMilliseconds } from "@/utils/dateTime"
import { apiFetch } from "./apiFetch"

export type VehicleLogStatus = "PENDING" | "VALIDATED" | "REJECTED" | "ARCHIVED"

export interface VehicleDispatchRecord {
  id: string
  operation_id?: string
  patient_log_id?: string
  dispatchId: string
  date: Date
  vehicle: string
  driver: string
  responders: string[]
  destination: string
  totalTime: string
  durationMilliseconds: number | null
  transfers: string[]
  status: VehicleLogStatus
  record: VehicleDispatchDetailRecord
}

export interface VehicleDispatchDetailRecord {
  dispatch_id: string
  dispatch_date: string
  createdAt?: string
  submitter_name: string | null
  submitter: { user_id: string; name: string; username: string; role: string } | null
  validated_by: string | null
  validator: { user_id: string; name: string; username: string; role: string } | null
  depart_time: string | null
  arrival_time: string | null
  vehicle_name: string
  plate_number: string
  driver_name: string
  from_location: string
  to_location: string
  responders: string[]
  transfers: string[]
  odometer_in: number | null
  odometer_out: number | null
  passengers: Array<{
    passenger_id: string
    full_name: string
    age: number
    birthdate: string | null
    sex: "MALE" | "FEMALE"
    contact_no: string | null
    address: string | null
  }>
  status: VehicleLogStatus
  rejected_reason: string | null
}

export async function fetchVehicularDispatchRecords(accessToken: string): Promise<VehicleDispatchRecord[]> {
  const response = await apiFetch("/vehicular-dispatches", {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const result = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(result.message ?? `Request failed (${response.status})`)
  if (!Array.isArray(result.dispatches)) throw new Error("The server returned an invalid vehicle log response.")

  return (result.dispatches as VehicleDispatchDetailRecord[]).map((dispatch) => {
    const departure = dispatch.depart_time ? new Date(dispatch.depart_time) : null
    const arrival = dispatch.arrival_time ? new Date(dispatch.arrival_time) : null
    const elapsedMilliseconds = departure && arrival ? getElapsedMilliseconds(departure, arrival) : null
    const duration = elapsedMilliseconds !== null && elapsedMilliseconds >= 0 ? elapsedMilliseconds : null

    return {
      id: formatVehicularDispatchId(dispatch.dispatch_id),
      dispatchId: dispatch.dispatch_id,
      date: new Date(dispatch.dispatch_date),
      vehicle: dispatch.plate_number
        ? `${dispatch.vehicle_name} (${dispatch.plate_number})`
        : dispatch.vehicle_name,
      driver: dispatch.driver_name || "—",
      responders: dispatch.responders,
      destination: dispatch.to_location || "—",
      totalTime: duration === null ? "—" : formatDuration(duration),
      durationMilliseconds: duration,
      transfers: dispatch.transfers,
      status: dispatch.status,
      record: dispatch,
    }
  })
}

export function formatVehicularDispatchId(id: string) {
  return `VD-${id.slice(0, 8).toUpperCase()}`
}

export async function reviewVehicularDispatch(
  accessToken: string,
  dispatchId: string,
  action: "authorize" | "validate" | "reject",
  pin: string,
  rejectedReason?: string,
) {
  const response = await apiFetch(`/vehicular-dispatches/${dispatchId}/${action}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pin, ...(rejectedReason && { rejected_reason: rejectedReason }) }),
  })
  const result = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(result.message ?? `Request failed (${response.status})`)
  return result as { dispatch: VehicleDispatchDetailRecord }
}
