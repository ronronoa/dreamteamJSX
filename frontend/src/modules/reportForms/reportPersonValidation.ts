import type { Person } from "../../types/operationLog";
import { calculateAge, isValidDateInputNotInFuture, MAX_REASONABLE_AGE } from "../../utils/dateTime";
import { isValidAddressValue, MAX_CONTACT_NUMBER_LENGTH } from "./reportFieldRules";

const MAX_REPORT_PEOPLE = 100;
type PersonErrors = Record<string, string>;

export function hasPersonInput(person: Person): boolean {
  const textFields = [
    ...Object.values(person.name), person.birthdate, person.gender,
    person.contactNumber, ...Object.values(person.address),
  ];
  return person.age !== "" || textFields.some((value) => value.trim() !== "");
}

export function validateReportPerson(person: Person): PersonErrors {
  const errors: PersonErrors = {};
  const nameFields = [
    ["surname", "Surname", 80], ["firstName", "First name", 80],
    ["middleInitial", "Middle initial", 10], ["suffix", "Suffix", 20],
  ] as const;
  for (const [field, label, maxLength] of nameFields) {
    const value = person.name[field].trim();
    const isOptional = field === "middleInitial" || field === "suffix";
    if (!value && isOptional) continue;
    if (!value) errors[`name.${field}`] = `${label} is required.`;
    else if (!/^[\p{L} ]+$/u.test(value)) errors[`name.${field}`] = `${label} must contain letters only.`;
    else if (value.length > maxLength) errors[`name.${field}`] = `${label} must be ${maxLength} characters or fewer.`;
  }

  if (!isValidDateInputNotInFuture(person.birthdate) || person.age === "") {
    errors.birthdate = "Enter a valid birthdate and age.";
  } else if (!Number.isInteger(person.age) || person.age < 0 || person.age > MAX_REASONABLE_AGE || person.age !== calculateAge(person.birthdate)) {
    errors.birthdate = "Check the birthdate and age.";
  }
  if (!person.gender) errors.gender = "Select a sex.";
  if (!person.contactNumber.trim()) errors.contactNumber = "Contact number is required.";
  else if (!/^[0-9]+$/.test(person.contactNumber) || person.contactNumber.length > MAX_CONTACT_NUMBER_LENGTH) {
    errors.contactNumber = `Contact number must contain no more than ${MAX_CONTACT_NUMBER_LENGTH} digits.`;
  }

  for (const [field, value] of Object.entries(person.address)) {
    const label = field.charAt(0).toUpperCase() + field.slice(1);
    if (!value.trim()) errors[`address.${field}`] = `${label} is required.`;
    else if (!isValidAddressValue(value, field)) {
      errors[`address.${field}`] = `${label} allows at most two digits and two letters (phase: two characters).`;
    }
  }
  return errors;
}

export function preparePeopleForNextStep(people: Person[], draft: Person) {
  if (!hasPersonInput(draft)) return { people, errors: {} as PersonErrors };
  const errors = validateReportPerson(draft);
  if (people.length >= MAX_REPORT_PEOPLE) errors.people = `Add no more than ${MAX_REPORT_PEOPLE} people.`;
  if (Object.keys(errors).length > 0) return { people, errors };
  return { people: [...people, draft], errors };
}
