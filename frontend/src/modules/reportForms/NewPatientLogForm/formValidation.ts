import type { PatientLogData } from "../../../types/patientLog"
import { isValidDateInputNotInFuture } from "@/utils/dateTime"
import { isValidAddressValue, MAX_CONTACT_NUMBER_LENGTH } from "../reportFieldRules"

export function isFormEmpty(formData: PatientLogData): boolean {
  const { responderDetails, dispatch, patientDetails, firstAidHospital, waiverForm, inventory } = formData

  return (
    !responderDetails.submitterName &&
    !responderDetails.date &&
    !responderDetails.typeOfRequest &&
    !responderDetails.caller.surname &&
    !responderDetails.caller.firstName &&
    !responderDetails.dispositionType &&
    responderDetails.responders.length === 0 &&
    responderDetails.otherResponders.length === 0 &&
    !dispatch.from &&
    !dispatch.to &&
    (!dispatch.vehicle || dispatch.vehicle === "none") &&
    !dispatch.driver &&
    !patientDetails.name.surname &&
    !patientDetails.name.firstName &&
    !patientDetails.birthdate &&
    !patientDetails.sex &&
    !patientDetails.contactPerson.surname &&
    !patientDetails.contactPerson.firstName &&
    !patientDetails.contactNumber &&
    !firstAidHospital.bp &&
    !firstAidHospital.pr &&
    !firstAidHospital.spo2 &&
    !firstAidHospital.temp &&
    !firstAidHospital.medicalAssessment &&
    !firstAidHospital.firstAidGiven &&
    !firstAidHospital.hospitalName &&
    !firstAidHospital.hospitalRepresentative.surname &&
    !firstAidHospital.hospitalRepresentative.firstName &&
    !waiverForm.description &&
    waiverForm.images.length === 0 &&
    inventory.length === 0
  )
}

export const isStep1Complete = (formData: PatientLogData) => {
  const { responderDetails, dispatch } = formData
  const dispatchIsOptional = !dispatch.vehicle || dispatch.vehicle === "none"
  const dispatchIsComplete = dispatchIsOptional || (
    dispatch.from.trim() !== "" &&
    dispatch.to.trim() !== "" &&
    dispatch.driver.trim() !== "" &&
    dispatch.departTime.trim() !== "" &&
    dispatch.arrivalTime.trim() !== "" &&
    (dispatch.vehicle !== "other" || Boolean(dispatch.vehicleOther?.trim())) &&
    dispatch.odometerIn.trim() !== "" &&
    dispatch.odometerOut.trim() !== ""
  )

  return (
    responderDetails.submitterName.trim() !== "" &&
    isValidDateInputNotInFuture(responderDetails.date) &&
    responderDetails.time.trim() !== "" &&
    responderDetails.typeOfRequest.trim() !== "" &&
    responderDetails.caller.surname.trim() !== "" &&
    responderDetails.caller.firstName.trim() !== "" &&
    responderDetails.dispositionType !== "" &&
    responderDetails.responders.length + responderDetails.otherResponders.length > 0 &&
    dispatchIsComplete
  )
}

export const isStep2Complete = (formData: PatientLogData) => {
  const { patientDetails, firstAidHospital } = formData

  return (
    patientDetails.name.surname.trim() !== "" &&
    patientDetails.name.firstName.trim() !== "" &&
    patientDetails.birthdate.trim() !== "" &&
    patientDetails.age !== "" &&
    patientDetails.sex !== "" &&
    patientDetails.contactPerson.surname.trim() !== "" &&
    patientDetails.contactPerson.firstName.trim() !== "" &&
    patientDetails.contactNumber.trim() !== "" &&
    patientDetails.address.phase.trim() !== "" &&
    patientDetails.address.package.trim() !== "" &&
    patientDetails.address.block.trim() !== "" &&
    patientDetails.address.lot.trim() !== "" &&
    firstAidHospital.medicalAssessment.trim() !== "" &&
    firstAidHospital.hospitalName.trim() !== "" &&
    firstAidHospital.hospitalRepresentative.surname.trim() !== "" &&
    firstAidHospital.hospitalRepresentative.firstName.trim() !== "" &&
    firstAidHospital.hospitalInTime.trim() !== "" &&
    firstAidHospital.hospitalOutTime.trim() !== ""
  )
}

export const isStep3Complete = (formData: PatientLogData) => {
  const { inventory } = formData

  return (
    inventory.every(
      (item) =>
        item.itemName.trim() !== "" &&
        item.quantity.trim() !== ""
    )
  )
}

export const isFormComplete = (formData: PatientLogData) => {
  return (
    isStep1Complete(formData) &&
    isStep2Complete(formData) &&
    isStep3Complete(formData)
  )
}

export function getPatientStepErrors(step: number, formData: PatientLogData): Record<string, string> {
  const errors: Record<string, string> = {}

  if (step === 1) {
    const { responderDetails, dispatch } = formData
    if (!responderDetails.submitterName.trim()) errors.submitterName = "Enter the submitter's name."
    if (!isValidDateInputNotInFuture(responderDetails.date)) errors.date = "Choose a valid date that is not in the future."
    if (!responderDetails.time.trim()) errors.time = "Enter the report time."
    if (!responderDetails.typeOfRequest) errors.typeOfRequest = "Choose a request type."
    if (!responderDetails.caller.surname.trim()) errors.callerSurname = "Enter the caller's surname."
    if (!responderDetails.caller.firstName.trim()) errors.callerFirstName = "Enter the caller's first name."
    if (!responderDetails.responders.length && !responderDetails.otherResponders.length) errors.responders = "Select or add at least one responder."
    if (!responderDetails.dispositionType) errors.transfer = "Select a transfer type."

    const dispatchIsRequired = Boolean(dispatch.vehicle && dispatch.vehicle !== "none")
    if (dispatchIsRequired) {
      if (!dispatch.from.trim()) errors["dispatch.from"] = "Enter the departure location."
      if (!dispatch.to.trim()) errors["dispatch.to"] = "Enter the destination."
      if (dispatch.vehicle === "other" && !dispatch.vehicleOther?.trim()) errors["dispatch.vehicleOther"] = "Specify the vehicle."
      if (!dispatch.driver.trim()) errors["dispatch.driver"] = "Enter the driver's name."
      if (!dispatch.departTime.trim()) errors["dispatch.departTime"] = "Enter the departure time."
      if (!dispatch.arrivalTime.trim()) errors["dispatch.arrivalTime"] = "Enter the arrival time."
      if (!dispatch.odometerIn.trim()) errors["dispatch.odometerIn"] = "Enter the odometer reading."
      if (!dispatch.odometerOut.trim()) errors["dispatch.odometerOut"] = "Enter the odometer reading."
    }
    return errors
  }

  if (step === 2) {
    const { patientDetails, firstAidHospital } = formData
    if (!patientDetails.name.surname.trim()) errors.patientSurname = "Enter the patient's surname."
    if (!patientDetails.name.firstName.trim()) errors.patientFirstName = "Enter the patient's first name."
    if (!isValidDateInputNotInFuture(patientDetails.birthdate) || patientDetails.age === "") {
      errors.birthdate = "Choose a valid birthdate."
    }
    if (!patientDetails.sex) errors.sex = "Select the patient's sex."
    if (!patientDetails.contactPerson.surname.trim()) errors.contactSurname = "Enter the contact person's surname."
    if (!patientDetails.contactPerson.firstName.trim()) errors.contactFirstName = "Enter the contact person's first name."
    if (!patientDetails.contactNumber.trim()) errors.contactNumber = "Enter a contact number."
    else if (!/^\d+$/.test(patientDetails.contactNumber) || patientDetails.contactNumber.length > MAX_CONTACT_NUMBER_LENGTH) {
      errors.contactNumber = `Contact number must contain no more than ${MAX_CONTACT_NUMBER_LENGTH} digits.`
    }
    if (!patientDetails.address.phase.trim()) errors.phase = "Enter the phase."
    if (!patientDetails.address.package.trim()) errors.package = "Enter the package."
    if (!patientDetails.address.block.trim()) errors.block = "Enter the block."
    if (!patientDetails.address.lot.trim()) errors.lot = "Enter the lot."
    validatePatientAddressValue(patientDetails.address.phase, "Phase", "phase", errors)
    validatePatientAddressValue(patientDetails.address.package, "Package", "package", errors)
    validatePatientAddressValue(patientDetails.address.block, "Block", "block", errors)
    validatePatientAddressValue(patientDetails.address.lot, "Lot", "lot", errors)
    if (!firstAidHospital.medicalAssessment.trim()) errors.medicalAssessment = "Enter the medical assessment."
    if (!firstAidHospital.hospitalName.trim()) errors.hospitalName = "Enter the hospital name."
    if (!firstAidHospital.hospitalRepresentative.surname.trim()) errors.hospitalSurname = "Enter the representative's surname."
    if (!firstAidHospital.hospitalRepresentative.firstName.trim()) errors.hospitalFirstName = "Enter the representative's first name."
    if (!firstAidHospital.hospitalInTime.trim()) errors.hospitalInTime = "Enter the hospital in time."
    if (!firstAidHospital.hospitalOutTime.trim()) errors.hospitalOutTime = "Enter the hospital out time."
    return errors
  }

  if (step === 3) {
    formData.inventory.forEach((item, index) => {
      if (!item.itemName.trim()) errors[`inventory.${index}.itemName`] = "Enter an item name."
      if (!item.quantity.trim()) errors[`inventory.${index}.quantity`] = "Enter a quantity."
    })
  }

  return errors
}

function validatePatientAddressValue(value: string, label: string, field: string, errors: Record<string, string>) {
  if (value && !isValidAddressValue(value, field)) {
    errors[field] = `${label} allows at most two digits and two letters (phase: two characters).`
  }
}
