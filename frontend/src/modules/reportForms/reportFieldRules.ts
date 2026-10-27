export const MAX_CONTACT_NUMBER_LENGTH = 11
export const MAX_ADDRESS_PART_LENGTH = 4
export const MAX_PHASE_LENGTH = 2
const MAX_ADDRESS_DIGITS = 2
const MAX_ADDRESS_LETTERS = 2

export function sanitizePersonName(value: string): string {
  return value.replace(/[^\p{L} ]/gu, "")
}

export function sanitizeAddressValue(value: string, field = "package"): string {
  const characters = value.replace(/[^a-zA-Z0-9]/g, "")
  if (field === "phase") return characters.slice(0, MAX_PHASE_LENGTH)

  let digits = 0
  let letters = 0
  let result = ""
  for (const character of characters) {
    if (/[0-9]/.test(character)) {
      if (digits >= MAX_ADDRESS_DIGITS) continue
      digits += 1
    } else {
      if (letters >= MAX_ADDRESS_LETTERS) continue
      letters += 1
    }
    result += character
  }
  return result
}

export function isValidAddressValue(value: string, field: string): boolean {
  return value === sanitizeAddressValue(value, field)
}

export function sanitizeContactNumber(value: string): string {
  return value.replace(/\D/g, "").slice(0, MAX_CONTACT_NUMBER_LENGTH)
}
