import type { OperationLogData } from "../../../types/operationLog"

export const isStep1Complete = (formData: OperationLogData) => {
  const { operationDetails, dispatch } = formData

  return (
    operationDetails.submitterName.trim() !== "" &&
    operationDetails.date.trim() !== "" &&
    operationDetails.natureOfOperation.trim() !== "" &&
    operationDetails.caller.surname.trim() !== "" &&
    operationDetails.caller.firstName.trim() !== "" &&
    operationDetails.teamAssigned.length > 0 &&
    operationDetails.responders.length > 0 &&
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

export const isStep2Complete = (formData: OperationLogData) => {
  const { people } = formData

  return (
    people.length > 0 &&
    people.every(
      (person) =>
        person.name.surname.trim() !== "" &&
        person.name.firstName.trim() !== "" &&
        person.birthdate.trim() !== "" &&
        person.age !== "" &&
        person.sex !== "" &&
        person.contactNumber.trim() !== "" &&
        person.address.phase.trim() !== "" &&
        person.address.package.trim() !== "" &&
        person.address.block.trim() !== "" &&
        person.address.lot.trim() !== ""
    )
  )
}

export const isStep3Complete = (formData: OperationLogData) => {
  const { operationDescription, inventory } = formData

  return (
    operationDescription.description.trim() !== "" &&
    operationDescription.images.length > 0 &&
    inventory.every(
      (item) =>
        item.itemName.trim() !== "" &&
        item.quantity.trim() !== ""
    )
  )
}

export const isFormComplete = (formData: OperationLogData) => {
  return (
    isStep1Complete(formData) &&
    isStep2Complete(formData) &&
    isStep3Complete(formData)
  )
}
