import type { OperationFormOptions } from "../../../api/operationForm";
import type { OperationLogData, Person } from "../../../types/operationLog";
import { calculateAge } from "../../../types/operationLog";
import { formatDate, isValidDateInputNotInFuture } from "../../../utils/dateTime";
import { MAX_ADDRESS_PART_LENGTH, MAX_CONTACT_NUMBER_LENGTH } from "../reportFieldRules";

export type FormErrors = Record<string, string>;

const MAX_IMAGE_SIZE_BYTES = 8 * 1024 * 1024;
const MAX_IMAGE_COUNT = 10;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const INVENTORY_QUANTITY_PATTERN = /^(\d+)(?:\s+[A-Za-z][A-Za-z0-9 _-]{0,39})?$/;
const OPERATION_TIME_PATTERN = /^(0[1-9]|1[0-2]):[0-5][0-9]$/;
const FORM_TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

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
    operationDetails.otherResponders.length === 0 &&
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
  if (!submitterName) errors["operationDetails.submitterName"] = "Enter the submitter's name.";
  else if (submitterName.length > 120) errors["operationDetails.submitterName"] = "Name must be 120 characters or fewer.";
  if (!isValidDateInputNotInFuture(operationDetails.date)) {
    errors["operationDetails.date"] = "Choose a valid date that is not in the future.";
  }
  if (!FORM_TIME_PATTERN.test(operationDetails.time)) {
    errors["operationDetails.time"] = "Enter a valid time.";
  }
  if (!options.operationNatures.some((nature) => nature.name === operationDetails.natureOfOperation)) {
    errors["operationDetails.natureOfOperation"] = "Choose an operation type.";
  }
  validateOptionalNamePart(operationDetails.nameOfCaller.surname, 80, "Surname must be 80 characters or fewer.", "operationDetails.nameOfCaller.surname", errors);
  validateOptionalNamePart(operationDetails.nameOfCaller.firstName, 80, "First name must be 80 characters or fewer.", "operationDetails.nameOfCaller.firstName", errors);
  if (operationDetails.nameOfCaller.middleInitial.trim().length > 10) errors["operationDetails.nameOfCaller.middleInitial"] = "Middle initial must be 10 characters or fewer.";
  if (operationDetails.nameOfCaller.suffix.trim().length > 20) errors["operationDetails.nameOfCaller.suffix"] = "Suffix must be 20 characters or fewer.";
  if (operationDetails.teamAssigned.some((teamId) => !options.teams.some((team) => team.team_id === teamId))) {
    errors["operationDetails.teamAssigned"] = "Refresh the form and select an available team.";
  }
  if (operationDetails.responders.some((userId) => !options.responders.some(
    (responder) => responder.user_id === userId && responder.team_id !== null && operationDetails.teamAssigned.includes(responder.team_id),
  ))) {
    errors["operationDetails.responders"] = "Refresh the form and select an available responder.";
  }

  const hasNoVehicle = dispatch.vehicle === "none"
  const isOtherVehicle = dispatch.vehicle === "other"
  const hasSelectedVehicle = Boolean(dispatch.vehicle) && !hasNoVehicle && !isOtherVehicle

  if (!dispatch.from.trim()) errors["dispatch.from"] = "Enter the departure location.";
  else validateOptionalTextLength(dispatch.from, 200, "Departure location must be 200 characters or fewer.", "dispatch.from", errors);
  if (!dispatch.to.trim()) errors["dispatch.to"] = "Enter the destination.";
  else validateOptionalTextLength(dispatch.to, 200, "Destination must be 200 characters or fewer.", "dispatch.to", errors);
  if (hasSelectedVehicle && !options.vehicles.some((vehicle) => vehicle.vehicle_id === dispatch.vehicle)) {
    errors["dispatch.vehicle"] = "Select an available vehicle, Other, or None.";
  }
  if (isOtherVehicle && !dispatch.vehicleOther?.trim()) errors["dispatch.vehicleOther"] = "Specify the vehicle.";
  if (hasSelectedVehicle) {
    validateOptionalTextLength(dispatch.driver, 120, "Driver name must be 120 characters or fewer.", "dispatch.driver", errors);
    if (!OPERATION_TIME_PATTERN.test(dispatch.departTime)) errors["dispatch.departTime"] = "Enter a valid departure time.";
    if (!OPERATION_TIME_PATTERN.test(dispatch.arrivalTime)) errors["dispatch.arrivalTime"] = "Enter a valid arrival time.";

    const odometerIn = parseOdometer(dispatch.odometerIn);
    const odometerOut = parseOdometer(dispatch.odometerOut);
    if (odometerIn === null) errors["dispatch.odometerIn"] = "Enter a non-negative whole number.";
    if (odometerOut === null) errors["dispatch.odometerOut"] = "Enter a non-negative whole number.";
    if (odometerIn !== null && odometerOut !== null && odometerOut < odometerIn) {
      errors["dispatch.odometerOut"] = "Odometer out must be at least odometer in.";
    }
  }

  return errors;
}

export function validatePerson(person: Person): FormErrors {
  const errors: FormErrors = {};
  validateNamePart(person.name.surname, 80, "Enter the person's surname.", "name.surname", errors);
  validateNamePart(person.name.firstName, 80, "Enter the person's first name.", "name.firstName", errors);
  if (person.name.middleInitial.trim().length > 10) errors["name.middleInitial"] = "Middle initial must be 10 characters or fewer.";
  if (person.name.suffix.trim().length > 20) errors["name.suffix"] = "Suffix must be 20 characters or fewer.";

  const today = formatDate(new Date(), "YYYY-MM-DD");
  if (!person.birthdate || person.birthdate > today || person.age === "") {
    errors.birthdate = "Choose a valid birthdate that is not in the future.";
  } else if (person.age !== calculateAge(person.birthdate)) {
    errors.birthdate = "Check the person's birthdate.";
  }

  if (person.gender === "") errors.gender = "Select a sex.";
  if (!/^\d*$/.test(person.contactNumber) || person.contactNumber.length > MAX_CONTACT_NUMBER_LENGTH) {
    errors.contactNumber = `Contact number must contain no more than ${MAX_CONTACT_NUMBER_LENGTH} digits.`;
  }

  validateOptionalTextLength(person.address.phase, MAX_ADDRESS_PART_LENGTH, `Phase must be ${MAX_ADDRESS_PART_LENGTH} characters or fewer.`, "address.phase", errors);
  validateOptionalTextLength(person.address.package, MAX_ADDRESS_PART_LENGTH, `Package must be ${MAX_ADDRESS_PART_LENGTH} characters or fewer.`, "address.package", errors);
  validateOptionalTextLength(person.address.block, MAX_ADDRESS_PART_LENGTH, `Block must be ${MAX_ADDRESS_PART_LENGTH} characters or fewer.`, "address.block", errors);
  validateOptionalTextLength(person.address.lot, MAX_ADDRESS_PART_LENGTH, `Lot must be ${MAX_ADDRESS_PART_LENGTH} characters or fewer.`, "address.lot", errors);
  validateAddressCharacters(person.address.phase, "Phase", "address.phase", errors);
  validateAddressCharacters(person.address.package, "Package", "address.package", errors);
  validateAddressCharacters(person.address.block, "Block", "address.block", errors);
  validateAddressCharacters(person.address.lot, "Lot", "address.lot", errors);

  return errors;
}

export function validateStep2(formData: OperationLogData): FormErrors {
  const errors: FormErrors = {};
  if (formData.people.length > 100) {
    errors.people = "Add no more than 100 people to one report.";
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
  if (description.length > 10000) errors["operationDescription.description"] = "Description must be 10,000 characters or fewer.";
  if (formData.inventory.length > 100) errors.inventory = "Add no more than 100 inventory entries.";

  if (formData.operationDescription.images.length > MAX_IMAGE_COUNT) {
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

function validateOptionalNamePart(value: string, maxLength: number, message: string, field: string, errors: FormErrors) {
  if (value.trim().length > maxLength) errors[field] = message;
}

function validateOptionalTextLength(value: string, maxLength: number, message: string, field: string, errors: FormErrors) {
  if (value.trim().length > maxLength) errors[field] = message;
}

function validateAddressCharacters(value: string, label: string, field: string, errors: FormErrors) {
  if (value && !/^[a-zA-Z0-9]+$/.test(value)) {
    errors[field] = `${label} can contain only letters and numbers.`;
  }
}
