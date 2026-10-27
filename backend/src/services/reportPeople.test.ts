import { describe, expect, it, vi } from "vitest";
import { ReportPeopleSchema } from "@/schemas/reportPeople.schema";
import { OperationReportSchema } from "@/schemas/operationReport.schema";
import { VehicularDispatchReportSchema } from "@/schemas/vehicularDispatchReport.schema";
import { createEmptyPerson, calculateAge, type Person } from "../../../frontend/src/types/operationLog";
import { hasPersonInput, preparePeopleForNextStep, validateReportPerson } from "../../../frontend/src/modules/reportForms/reportPersonValidation";

import { sanitizeAddressValue, sanitizePersonName } from "../../../frontend/src/modules/reportForms/reportFieldRules";
import { PatientReportSchema } from "@/schemas/patientReport.schema";

const completePerson: Person = {
  id: "person-id",
  name: { surname: "Santos", firstName: "Ana", middleInitial: "M", suffix: "Jr" },
  birthdate: "2000-01-01",
  age: calculateAge("2000-01-01"),
  gender: "Female",
  contactNumber: "09171234567",
  address: { phase: "1", package: "2", block: "3", lot: "4" },
};

const personFields = [
  "name.surname", "name.firstName", "name.middleInitial", "name.suffix",
  "birthdate", "age", "gender", "contactNumber",
  "address.phase", "address.package", "address.block", "address.lot",
];

function changeField(person: Person, field: string, value: unknown): Person {
  const updated = structuredClone(person);
  const [group, property] = field.split(".");
  if (property && group === "name") updated.name[property as keyof Person["name"]] = String(value);
  else if (property && group === "address") updated.address[property as keyof Person["address"]] = String(value);
  else Object.assign(updated, { [field]: value });
  return updated;
}

describe("optional people and civilian passenger entries", () => {
  it("allows Next for an untouched draft and keeps the list empty", () => {
    const empty = createEmptyPerson();
    expect(hasPersonInput(empty)).toBe(false);
    expect(preparePeopleForNextStep([], empty)).toEqual({ people: [], errors: {} });
    expect(ReportPeopleSchema.parse([empty])).toEqual([]);
    expect(OperationReportSchema.shape.people.parse([])).toEqual([]);
    expect(VehicularDispatchReportSchema.shape.passengers.parse([])).toEqual([]);
  });

  it.each(personFields)("blocks Next when only %s has been entered", (field) => {
    const value = field === "age" ? 0 : field === "gender" ? "Male" : field === "birthdate" ? "2000-01-01" : "A";
    const partial = changeField(createEmptyPerson(), field, value);
    expect(hasPersonInput(partial)).toBe(true);
    expect(Object.keys(preparePeopleForNextStep([], partial).errors).length).toBeGreaterThan(0);
    expect(ReportPeopleSchema.safeParse([partial]).success).toBe(false);
  });

  it.each(personFields.filter((field) => field !== "name.middleInitial" && field !== "name.suffix"))("requires %s after an entry is started", (field) => {
    const incomplete = changeField(completePerson, field, "");
    expect(Object.keys(validateReportPerson(incomplete)).length).toBeGreaterThan(0);
    expect(ReportPeopleSchema.safeParse([incomplete]).success).toBe(false);
  });

  it("includes a complete draft when continuing without clicking Add", () => {
    expect(preparePeopleForNextStep([], completePerson)).toEqual({ people: [completePerson], errors: {} });
    expect(ReportPeopleSchema.safeParse([completePerson]).success).toBe(true);
  });

  it("blocks a partial second entry even when the first entry is complete", () => {
    const partial = changeField(createEmptyPerson(), "gender", "Male");
    const prepared = preparePeopleForNextStep([completePerson], partial);
    expect(prepared.people).toEqual([completePerson]);
    expect(Object.keys(prepared.errors).length).toBeGreaterThan(0);
    expect(ReportPeopleSchema.safeParse([completePerson, partial]).success).toBe(false);
  });

  it("ignores whitespace and preserves age zero as entered data", () => {
    expect(hasPersonInput(changeField(createEmptyPerson(), "name.surname", "   "))).toBe(false);
    expect(hasPersonInput(changeField(createEmptyPerson(), "age", 0))).toBe(true);
  });

  it("rejects an inconsistent age on both frontend and backend", () => {
    const person = changeField(completePerson, "age", 1);
    expect(validateReportPerson(person).birthdate).toBeDefined();
    expect(ReportPeopleSchema.safeParse([person]).success).toBe(false);
  });
});

describe("person name and address input rules", () => {
  it.each(["Ana1", "Ana!", "Jr."])("rejects nonletter names: %s", (value) => {
    const person = changeField(completePerson, "name.firstName", value);
    expect(validateReportPerson(person)["name.firstName"]).toBeDefined();
    expect(ReportPeopleSchema.safeParse([person]).success).toBe(false);
  });

  it.each(["12AB", "AB12", "2A", "25"])("accepts address part %s", (value) => {
    const person = changeField(completePerson, "address.package", value);
    expect(validateReportPerson(person)).toEqual({});
    expect(ReportPeopleSchema.safeParse([person]).success).toBe(true);
  });

  it.each(["123", "ABC", "12AB3", "A!"])("rejects address part %s", (value) => {
    const person = changeField(completePerson, "address.lot", value);
    expect(validateReportPerson(person)["address.lot"]).toBeDefined();
    expect(ReportPeopleSchema.safeParse([person]).success).toBe(false);
  });
});

describe("form input sanitizers and automatic age", () => {
  it("filters typed and pasted names while preserving spaces and accented letters", () => {
    expect(sanitizePersonName("Ana Mar\u00eda123!@")).toBe("Ana Mar\u00eda");
  });

  it("limits address input to two digits and two letters", () => {
    expect(sanitizeAddressValue("123ABC!", "package")).toBe("12AB");
    expect(sanitizeAddressValue("AB123", "lot")).toBe("AB12");
    expect(sanitizeAddressValue("123", "phase")).toBe("12");
  });

  it("applies the address limits to patient reports too", () => {
    const address = PatientReportSchema.shape.patientDetails.shape.address;
    expect(address.safeParse({ phase: "1", package: "12AB", block: "AB12", lot: "2A" }).success).toBe(true);
    expect(address.safeParse({ phase: "1", package: "123", block: "ABC", lot: "2A" }).success).toBe(false);
  });

  it("calculates age from the selected birthday, including birthday boundaries", () => {
    vi.useFakeTimers();
    try {
      vi.setSystemTime(new Date(2026, 9, 28, 12));
      expect(calculateAge("2000-10-28")).toBe(26);
      expect(calculateAge("2000-10-29")).toBe(25);
      expect(calculateAge("2026-10-28")).toBe(0);
      expect(calculateAge("")).toBe("");
    } finally {
      vi.useRealTimers();
    }
  });
});

describe("optional middle initial and suffix", () => {
  it.each(["", "   "])("allows blank optional names: %j", (value) => {
    const person = structuredClone(completePerson);
    person.name.middleInitial = value;
    person.name.suffix = value;
    expect(validateReportPerson(person)).toEqual({});
    expect(preparePeopleForNextStep([], person).errors).toEqual({});
    expect(OperationReportSchema.shape.people.safeParse([person]).success).toBe(true);
    expect(VehicularDispatchReportSchema.shape.passengers.safeParse([person]).success).toBe(true);
  });

  it("allows omitted optional names on the server", () => {
    const person = { ...completePerson, name: { surname: "Santos", firstName: "Ana" } };
    expect(ReportPeopleSchema.safeParse([person]).success).toBe(true);
  });

  it.each(["name.middleInitial", "name.suffix"])("validates %s when supplied", (field) => {
    const person = changeField(completePerson, field, "123!");
    expect(validateReportPerson(person)[field]).toBeDefined();
    expect(ReportPeopleSchema.safeParse([person]).success).toBe(false);
  });
});
