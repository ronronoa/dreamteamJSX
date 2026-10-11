import type { OperationFormOptions } from "../../../api/operationForm";
import type { OperationLogData, Person } from "../../../types/operationLog";
import { calculateAge } from "../../../types/operationLog";

export type FormErrors = Record<string, string>;

const MAX_IMAGE_SIZE_BYTES = 8 * 1024 * 1024;
const MAX_IMAGE_COUNT = 10;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const PHONE_NUMBER_PATTERN = /^[+\d(). -]{7,20}$/;
const INVENTORY_QUANTITY_PATTERN = /^(\d+)(?:\s+[A-Za-z][A-Za-z0-9 _-]{0,39})?$/;
const OPERATION_TIME_PATTERN = /^(0[1-9]|1[0-2]):[0-5][0-9]$/;

export function isFormEmpty(formData: OperationLogData): boolean {
  const { operationDetails, dispatch, people, operationDescription, inventory } = formData;

  return (
    !operationDetails.submitterName &&
    !operationDetails.date &&
    !operationDetails.natureOfOperation &&
    !operationDetails.nameOfCaller.surname &&
    !operationDetails.nameOfCaller.firstName &&
    operationDetails.teamAssigned.length === 0 &&
    operationDetails.responders.length === 0 &&
    !dispatch.from &&
    !dispatch.to &&
    !dispatch.vehicle &&
    !dispatch.driver &&
    people.length === 0 &&
    !operationDescription.description &&
    operationDescription.images.length === 0 &&
    inventory.length === 0
  );
}

export function validateStep1(formData: OperationLogData, options: OperationFormOptions): FormErrors {
  const { operationDetails, dispatch } = formData;
  const errors: FormErrors = {};

  const submitterName = operationDetails.submitterName.trim();
  if (!submitterName) errors["operationDetails.submitterName"] = "Enter the submitter name.";
  else if (submitterName.length > 120) errors["operationDetails.submitterName"] = "Name must be 120 characters or fewer.";
  if (!operationDetails.date || operationDetails.date > new Date().toISOString().slice(0, 10)) {
    errors["operationDetails.date"] = "Choose a valid date that is not in the future.";
  }
  if (!options.operationNatures.some((nature) => nature.name === operationDetails.natureOfOperation)) {
    errors["operationDetails.natureOfOperation"] = "Choose an operation type.";
  }
  validateNamePart(operationDetails.nameOfCaller.surname, 80, "Enter the caller's surname.", "operationDetails.nameOfCaller.surname", errors);
  validateNamePart(operationDetails.nameOfCaller.firstName, 80, "Enter the caller's first name.", "operationDetails.nameOfCaller.firstName", errors);
  if (operationDetails.nameOfCaller.middleInitial.trim().length > 10) errors["operationDetails.nameOfCaller.middleInitial"] = "Middle initial must be 10 characters or fewer.";
  if (operationDetails.nameOfCaller.suffix.trim().length > 20) errors["operationDetails.nameOfCaller.suffix"] = "Suffix must be 20 characters or fewer.";
  if (operationDetails.teamAssigned.length === 0) errors["operationDetails.teamAssigned"] = "Select at least one team.";
  if (operationDetails.teamAssigned.some((teamId) => !options.teams.some((team) => team.team_id === teamId))) {
    errors["operationDetails.teamAssigned"] = "Refresh the form and select an available team.";
  }
  if (operationDetails.responders.length === 0) errors["operationDetails.responders"] = "Select a responder.";
  if (operationDetails.responders.some((userId) => !options.responders.some((responder) => responder.user_id === userId))) {
    errors["operationDetails.responders"] = "Refresh the form and select an available responder.";
  }

  validateTextLength(dispatch.from, 200, "Enter the departure location.", "dispatch.from", errors);
  validateTextLength(dispatch.to, 200, "Enter the destination.", "dispatch.to", errors);
  if (!options.vehicles.some((vehicle) => vehicle.vehicle_id === dispatch.vehicle)) {
    errors["dispatch.vehicle"] = "Select an available vehicle.";
  }
  validateTextLength(dispatch.driver, 120, "Enter the driver's name.", "dispatch.driver", errors);
  if (!OPERATION_TIME_PATTERN.test(dispatch.departTime)) errors["dispatch.departTime"] = "Enter a valid departure time.";
  if (!OPERATION_TIME_PATTERN.test(dispatch.arrivalTime)) errors["dispatch.arrivalTime"] = "Enter a valid arrival time.";

  const odometerIn = parseOdometer(dispatch.odometerIn);
  const odometerOut = parseOdometer(dispatch.odometerOut);
  if (odometerIn === null) errors["dispatch.odometerIn"] = "Enter a non-negative whole number.";
  if (odometerOut === null) errors["dispatch.odometerOut"] = "Enter a non-negative whole number.";
  if (odometerIn !== null && odometerOut !== null && odometerOut < odometerIn) {
    errors["dispatch.odometerOut"] = "Odometer out must be at least odometer in.";
  }

  return errors;
}

export function validatePerson(person: Person): FormErrors {
  const errors: FormErrors = {};
  validateNamePart(person.name.surname, 80, "Enter the person's surname.", "name.surname", errors);
  validateNamePart(person.name.firstName, 80, "Enter the person's first name.", "name.firstName", errors);
  if (person.name.middleInitial.trim().length > 10) errors["name.middleInitial"] = "Middle initial must be 10 characters or fewer.";
  if (person.name.suffix.trim().length > 20) errors["name.suffix"] = "Suffix must be 20 characters or fewer.";

  const today = new Date().toISOString().slice(0, 10);
  if (!person.birthdate || person.birthdate > today || person.age === "") {
    errors.birthdate = "Choose a valid birthdate that is not in the future.";
  } else if (person.age !== calculateAge(person.birthdate)) {
    errors.birthdate = "Check the person's birthdate.";
  }

  if (person.gender === "") errors.gender = "Select a sex.";
  const phoneDigits = person.contactNumber.replace(/\D/g, "").length;
  if (!PHONE_NUMBER_PATTERN.test(person.contactNumber.trim()) || phoneDigits < 7 || phoneDigits > 15) {
    errors.contactNumber = "Enter a valid contact number with 7 to 15 digits.";
  }

  validateTextLength(person.address.phase, 30, "Enter the phase.", "address.phase", errors);
  validateTextLength(person.address.package, 30, "Enter the package.", "address.package", errors);
  validateTextLength(person.address.block, 30, "Enter the block.", "address.block", errors);
  validateTextLength(person.address.lot, 30, "Enter the lot.", "address.lot", errors);

  return errors;
}

export function validateStep2(formData: OperationLogData): FormErrors {
  const errors: FormErrors = {};
  if (formData.people.length > 100) {
    errors.people = "Add no more than 100 people to one report.";
    return errors;
  }
  if (formData.people.length === 0) {
    errors.people = "Add at least one person involved in the operation.";
    return errors;
  }

  formData.people.forEach((person, index) => {
    for (const [field, message] of Object.entries(validatePerson(person))) {
      errors[`people.${index}.${field}`] = message;
    }
  });
  return errors;
}

export function validateStep3(formData: OperationLogData): FormErrors {
  const errors: FormErrors = {};
  const description = formData.operationDescription.description.trim();
  if (!description) errors["operationDescription.description"] = "Enter an operation description.";
  if (description.length > 10000) errors["operationDescription.description"] = "Description must be 10,000 characters or fewer.";
  if (formData.inventory.length > 100) errors.inventory = "Add no more than 100 inventory entries.";

  if (formData.operationDescription.images.length === 0) {
    errors["operationDescription.images"] = "Attach at least one JPG, PNG, or WebP image.";
  } else if (formData.operationDescription.images.length > MAX_IMAGE_COUNT) {
    errors["operationDescription.images"] = `Attach no more than ${MAX_IMAGE_COUNT} images.`;
  } else if (formData.operationDescription.images.some((image) => !isSupportedImage(image))) {
    errors["operationDescription.images"] = "Images must be JPG, PNG, or WebP and no larger than 8 MB each.";
  }

  formData.inventory.forEach((item, index) => {
    if (!item.itemName.trim()) errors[`inventory.${index}.itemName`] = "Enter an item name.";
    else if (item.itemName.trim().length > 120) errors[`inventory.${index}.itemName`] = "Item name must be 120 characters or fewer.";
    const quantityMatch = INVENTORY_QUANTITY_PATTERN.exec(item.quantity.trim());
    if (!quantityMatch || Number(quantityMatch[1]) < 1 || Number(quantityMatch[1]) > 1000000) {
      errors[`inventory.${index}.quantity`] = "Enter a positive quantity, such as ‘4 boxes’.";
    }
  });

  return errors;
}

export function validateStep(step: number, formData: OperationLogData, options: OperationFormOptions): FormErrors {
  if (step === 1) return validateStep1(formData, options);
  if (step === 2) return validateStep2(formData);
  if (step === 3) return validateStep3(formData);
  return {};
}

export function isFormComplete(formData: OperationLogData, options: OperationFormOptions): boolean {
  return [1, 2, 3].every((step) => Object.keys(validateStep(step, formData, options)).length === 0);
}

function parseOdometer(value: string): number | null {
  if (!/^\d+$/.test(value)) return null;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) ? parsed : null;
}

function isSupportedImage(file: File): boolean {
  return ALLOWED_IMAGE_TYPES.has(file.type) && file.size <= MAX_IMAGE_SIZE_BYTES;
}

function validateNamePart(value: string, maxLength: number, requiredMessage: string, field: string, errors: FormErrors) {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    errors[field] = requiredMessage;
    return;
  }
  if (trimmedValue.length > maxLength) errors[field] = `Must be ${maxLength} characters or fewer.`;
}

function validateTextLength(value: string, maxLength: number, requiredMessage: string, field: string, errors: FormErrors) {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    errors[field] = requiredMessage;
    return;
  }
  if (trimmedValue.length > maxLength) errors[field] = `Must be ${maxLength} characters or fewer.`;
}
