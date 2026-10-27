import { apiFetch } from "./apiFetch";

export type ReportStatus = "PENDING" | "VALIDATED" | "REJECTED" | "ARCHIVED";

export interface OperationRecord {
  operation_id: string;
  operation_date: string;
  name_of_caller: string;
  nature_of_operation: string;
  event_description: string;
  other_responders: string[];
  submitted_by: string | null;
  submitter_name: string | null;
  validated_by: string | null;
  status: ReportStatus;
  rejected_reason: string | null;
  team: { team_id: string; team_name: string };
  teamAssignments: Array<{ team: { team_id: string; team_name: string } }>;
  submitter: { user_id: string; name: string; username: string; role: string } | null;
  validator: { user_id: string; name: string; username: string; role: string } | null;
  responders: Array<{ user: { user_id: string; name: string } }>;
  personsInvolved: Array<{
    person_id: string;
    full_name: string;
    age: number;
    sex: string;
    contact_no: string | null;
    address: string | null;
    address_phase: string | null;
    address_package: string | null;
    address_block: string | null;
    address_lot: string | null;
  }>;
  inventoryEntries: Array<{ entry_id: string; item_name: string; quantity: number; unit: string | null }>;
  dispatches: Array<{
    dispatch_id: string;
    dispatch_date: string;
    from_location: string | null;
    to_location: string | null;
    driver_name: string | null;
    depart_time: string | null;
    arrival_time: string | null;
    odometer_in: number | null;
    odometer_out: number | null;
    vehicle: { vehicle_name: string; plate_number: string } | null;
  }>;
  images: Array<{ attachment_id: string; image_url: string; file_type: string | null }>;
  createdAt: string;
  updatedAt: string;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.message ?? `Request failed (${response.status})`);
  }
  return result as T;
}

export async function fetchOperations(accessToken: string): Promise<OperationRecord[]> {
  const response = await apiFetch("/operations", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const result = await parseResponse<{ operations: OperationRecord[] }>(response);
  return result.operations;
}

export async function authorizeOperation(accessToken: string, operationId: string, pin: string) {
  return updateReportStatus(accessToken, operationId, "authorize", pin);
}

export async function validateOperation(accessToken: string, operationId: string, pin: string) {
  return updateReportStatus(accessToken, operationId, "validate", pin);
}

export async function rejectOperation(accessToken: string, operationId: string, pin: string, rejectedReason: string) {
  return updateReportStatus(accessToken, operationId, "reject", pin, rejectedReason);
}

export async function archiveOperation(accessToken: string, operationId: string) {
  const response = await apiFetch(`/archives/operation/${operationId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return parseResponse<{ archived: boolean }>(response);
}

async function updateReportStatus(
  accessToken: string,
  operationId: string,
  action: "authorize" | "validate" | "reject",
  pin: string,
  rejectedReason?: string,
) {
  const response = await apiFetch(`/operations/${operationId}/${action}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pin, ...(rejectedReason && { rejected_reason: rejectedReason }) }),
  });
  return parseResponse<{ operation: OperationRecord }>(response);
}
