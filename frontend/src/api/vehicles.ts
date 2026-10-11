import { apiFetch } from "./apiFetch";

export interface FleetVehicle {
  vehicle_id: string;
  vehicle_name: string;
  plate_number: string;
  status: "AVAILABLE" | "IN_USE" | "MAINTENANCE";
}

async function request<T>(path: string, accessToken: string, options: RequestInit = {}) {
  const response = await apiFetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    },
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.message ?? `Request failed (${response.status})`);
  }
  return result as T;
}

export async function fetchFleetVehicles(accessToken: string) {
  const result = await request<{ vehicles: FleetVehicle[] }>("/vehicles/fleet", accessToken);
  return result.vehicles;
}

export function createFleetVehicle(
  accessToken: string,
  input: { vehicleName: string; plateNumber: string },
) {
  return request<{ vehicle: FleetVehicle }>("/vehicles/fleet", accessToken, {
    method: "POST",
    body: JSON.stringify(input),
  });
}
