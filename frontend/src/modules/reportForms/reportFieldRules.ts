export const MAX_CONTACT_NUMBER_LENGTH = 11
export const MAX_ADDRESS_PART_LENGTH = 2

export function sanitizeAddressValue(value: string): string {
  return value.replace(/[^a-zA-Z0-9]/g, "")
}

export function sanitizeContactNumber(value: string): string {
  return value.replace(/\D/g, "").slice(0, MAX_CONTACT_NUMBER_LENGTH)
}
