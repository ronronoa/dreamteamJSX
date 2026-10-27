import { z } from "zod";
import { ReportAddressPartSchema } from "./reportAddress.schema";
import { getTodayDateInputValue } from "@/shared/utils/date";

const MAX_PERSON_AGE = 120;
const MAX_PEOPLE_PER_REPORT = 100;
const requiredAddressPart = z.string().trim().min(1).max(2).regex(/^[a-zA-Z0-9]+$/);

function hasValue(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "object") return Object.values(value).some(hasValue);
  return true;
}

function isBlankPerson(value: unknown): boolean {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const person = value as Record<string, unknown>;
  const fields = ["name", "birthdate", "age", "gender", "contactNumber", "address"];
  return fields.every((field) => !hasValue(person[field]));
}

const CompleteReportPersonSchema = z.object({
  name: z.object({
    surname: z.string().trim().min(1).max(80).regex(/^[\p{L} ]+$/u, "Use letters only."),
    firstName: z.string().trim().min(1).max(80).regex(/^[\p{L} ]+$/u, "Use letters only."),
    middleInitial: z.string().trim().max(10).regex(/^[\p{L} ]*$/u, "Use letters only.").default(""),
    suffix: z.string().trim().max(20).regex(/^[\p{L} ]*$/u, "Use letters only.").default(""),
  }),
  birthdate: z.iso.date().refine((value) => value <= getTodayDateInputValue(), "Birthdate cannot be in the future."),
  age: z.number().int().min(0).max(MAX_PERSON_AGE),
  gender: z.enum(["Male", "Female"]),
  contactNumber: z.string().trim().min(1).max(11).regex(/^[0-9]+$/),
  address: z.object({
    phase: requiredAddressPart,
    package: ReportAddressPartSchema.refine((value) => value.length > 0, "Address is required."),
    block: ReportAddressPartSchema.refine((value) => value.length > 0, "Address is required."),
    lot: ReportAddressPartSchema.refine((value) => value.length > 0, "Address is required."),
  }),
}).refine((person) => {
  const [birthYear, birthMonth, birthDay] = person.birthdate.split("-").map(Number);
  const [currentYear, currentMonth, currentDay] = getTodayDateInputValue().split("-").map(Number);
  if (birthYear === undefined || birthMonth === undefined || birthDay === undefined || currentYear === undefined || currentMonth === undefined || currentDay === undefined) return false;
  let expectedAge = currentYear - birthYear;
  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) expectedAge -= 1;
  return person.age === expectedAge;
}, { path: ["age"], message: "Age must match the birthdate." });

export const ReportPeopleSchema = z.preprocess(
  (value) => Array.isArray(value) ? value.filter((person) => !isBlankPerson(person)) : value,
  z.array(CompleteReportPersonSchema).max(MAX_PEOPLE_PER_REPORT),
).default([]);
