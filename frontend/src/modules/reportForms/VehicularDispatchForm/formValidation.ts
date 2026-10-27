import type { Person } from "../../../types/vehicularDispatchReport"
import type { VehicularDispatchReportData } from "../../../types/vehicularDispatchReport"
import { formatDate } from "../../../utils/dateTime"
import { hasPersonInput, validateReportPerson } from "../reportPersonValidation"

export type VehicularDispatchErrors = Record<string, string>

const TIME_PATTERN = /^(0[1-9]|1[0-2]):[0-5][0-9]$/
const FORM_TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/

export function validateStep(step: number, data: VehicularDispatchReportData): VehicularDispatchErrors {
  if (step === 1) return validateDispatchDetails(data)
  if (step === 2) return validatePassengers(data.passengers)
  return {}
}

export function validateReport(data: VehicularDispatchReportData): VehicularDispatchErrors {
  return {
    ...validateDispatchDetails(data),
    ...validatePassengers(data.passengers),
  }
}

function validateDispatchDetails(data: VehicularDispatchReportData): VehicularDispatchErrors {
  const { details, dispatch } = data
  const errors: VehicularDispatchErrors = {}
  const today = formatDate(new Date(), "YYYY-MM-DD")

  if (!details.submitterName.trim()) errors["details.submitterName"] = "Enter the submitter's name."
  else if (details.submitterName.trim().length > 120) errors["details.submitterName"] = "Name must be 120 characters or fewer."

  if (!isValidDate(details.date) || details.date > today) errors["details.date"] = "Choose a valid date that is not in the future."
  if (!FORM_TIME_PATTERN.test(details.time)) errors["details.time"] = "Enter a valid time."
  if (details.responders.length + details.otherResponders.length === 0) errors["details.responders"] = "Add at least one responder."
  if (details.responders.length > 50) errors["details.responders"] = "Select no more than 50 responders."
  if (details.transfers.length === 0) errors["details.transfers"] = "Select at least one transfer type."
  if (!dispatch.from.trim()) errors["dispatch.from"] = "Enter the departure location."
  if (!dispatch.to.trim()) errors["dispatch.to"] = "Enter the destination."
  const hasNoVehicle = dispatch.vehicle === "none"
  if (!dispatch.vehicle.trim()) errors["dispatch.vehicle"] = "Choose a vehicle or None."
  if (dispatch.vehicle === "other" && !dispatch.vehicleOther?.trim()) errors["dispatch.vehicleOther"] = "Specify the vehicle."
  if (!hasNoVehicle && !dispatch.driver.trim()) errors["dispatch.driver"] = "Enter the driver's name."
  if (!TIME_PATTERN.test(dispatch.departTime)) errors["dispatch.departTime"] = "Enter a valid departure time."
  if (!TIME_PATTERN.test(dispatch.arrivalTime)) errors["dispatch.arrivalTime"] = "Enter a valid arrival time."

  if (hasNoVehicle) return errors
  const odometerIn = parseOdometer(dispatch.odometerIn)
  const odometerOut = parseOdometer(dispatch.odometerOut)
  if (odometerIn === null) errors["dispatch.odometerIn"] = "Enter a non-negative whole number."
  if (odometerOut === null) errors["dispatch.odometerOut"] = "Enter a non-negative whole number."
  if (odometerIn !== null && odometerOut !== null && odometerOut < odometerIn) {
    errors["dispatch.odometerOut"] = "Odometer out must be at least odometer in."
  }

  return errors
}

function validatePassengers(passengers: Person[]): VehicularDispatchErrors {
  const errors: VehicularDispatchErrors = {}
  if (passengers.length > 100) errors.passengers = "Add no more than 100 passengers."

  passengers.forEach((person, index) => {
    if (!hasPersonInput(person)) return
    for (const [field, message] of Object.entries(validateReportPerson(person))) {
      errors[`passengers.${index}.${field}`] = message
    }
  })

  return errors
}


function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const [year, month, day] = value.split("-").map(Number)
  const parsedDate = new Date(year, month - 1, day)
  return parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getDate() === day
}

function parseOdometer(value: string): number | null {
  if (!/^\d+$/.test(value)) return null
  const parsed = Number(value)
  return Number.isSafeInteger(parsed) ? parsed : null
}
