import type { PatientLogData } from "../../../types/patientLog"

export function isFormEmpty(formData: PatientLogData): boolean {
  const { responderDetails, dispatch, patientDetails, firstAidHospital, waiverForm, inventory } = formData

  return (
    !responderDetails.submitterName &&
    !responderDetails.date &&
    !responderDetails.typeOfRequest &&
    !responderDetails.caller.surname &&
    !responderDetails.caller.firstName &&
    responderDetails.teamAssigned.length === 0 &&
    responderDetails.responders.length === 0 &&
    !dispatch.from &&
    !dispatch.to &&
    !dispatch.vehicle &&
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
    waiverForm.images.length === 0 &&
    inventory.length === 0
  )
}

export const isStep1Complete = (formData: PatientLogData) => {
  const { responderDetails, dispatch } = formData

  return (
    responderDetails.submitterName.trim() !== "" &&
    responderDetails.date.trim() !== "" &&
    responderDetails.typeOfRequest.trim() !== "" &&
    responderDetails.caller.surname.trim() !== "" &&
    responderDetails.caller.firstName.trim() !== "" &&
    responderDetails.teamAssigned.length > 0 &&
    responderDetails.responders.length > 0 &&
    dispatch.from.trim() !== "" &&
    dispatch.to.trim() !== "" &&
    dispatch.vehicle.trim() !== "" &&
    dispatch.driver.trim() !== "" &&
    dispatch.departTime.trim() !== "" &&
    dispatch.arrivalTime.trim() !== "" &&
    dispatch.odometerIn.trim() !== "" &&
    dispatch.odometerOut.trim() !== ""
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
  const { waiverForm, inventory } = formData

  return (
    waiverForm.images.length > 0 &&
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
