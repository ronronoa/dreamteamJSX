export const VEHICLE_PLATE_LENGTH = 7;
export const VEHICLE_PLATE_PATTERN = "[A-Z]{3}[0-9]{4}";
export const VEHICLE_PLATE_HINT = "Enter three letters followed by four digits, such as ABC1234. The space is added when saved.";

export function normalizeVehiclePlateInput(value: string): string {
  return value.toUpperCase().replace(/\s/g, "");
}

export function isValidVehiclePlate(value: string): boolean {
  return /^[A-Z]{3}[0-9]{4}$/.test(value);
}
