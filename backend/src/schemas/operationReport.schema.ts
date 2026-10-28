import { z } from "zod";
import { getTodayDateInputValue } from "@/shared/utils/date";
import { ReportPeopleSchema } from "./reportPeople.schema";

const personNameSchema = z.object({
  surname: z.string().trim().max(80),
  firstName: z.string().trim().max(80),
  middleInitial: z.string().trim().max(10),
  suffix: z.string().trim().max(20),
});


const inventoryQuantity = z.string()
  .trim()
  .regex(/^\d+(?:\s+[A-Za-z][A-Za-z0-9 _-]{0,39})?$/, "Enter a positive quantity and optional unit, such as ‘4 boxes’.")
  .transform((value) => {
    const [amount, ...unitParts] = value.split(/\s+/);
    return {
      amount: Number(amount),
      unit: unitParts.join(" ") || null,
    };
  })
  .pipe(z.object({
    amount: z.number().int().positive().max(1000000),
    unit: z.string().max(40).nullable(),
  }));

const odometerString = z.string()
  .regex(/^\d+$/, "Enter a whole number.")
  .transform(Number)
  .pipe(z.number().int().nonnegative());
const optionalOdometer = z.union([odometerString, z.literal("")]);
const formTime = z.preprocess(
  (value) => value === "" || value === undefined
    ? `${String(new Date().getHours()).padStart(2, "0")}:${String(new Date().getMinutes()).padStart(2, "0")}`
    : value,
  z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
);

export const OperationReportSchema = z.object({
  operationDetails: z.object({
    submitterName: z.string().trim().max(120),
    date: z.preprocess(
      (value) => value === "" ? getTodayDateInputValue() : value,
      z.iso.date().refine((date) => date <= getTodayDateInputValue(), {
        message: "Operation date cannot be in the future.",
      }),
    ),
    time: formTime,
    natureOfOperation: z.string().trim().min(1, "Choose an operation type.").max(100),
    natureOfOperationOther: z.string().trim().max(100).optional(),
    nameOfCaller: personNameSchema,
    teamAssigned: z.array(z.uuid()).max(10),
    responders: z.array(z.uuid()).max(50),
    otherResponders: z.array(z.string().trim().min(1).max(120)).max(50).default([]),
  }).superRefine((details, context) => {
    if (details.natureOfOperation === "Other" && !details.natureOfOperationOther) {
      context.addIssue({ code: "custom", path: ["natureOfOperationOther"], message: "Specify the nature of operation." });
    }
  }).transform((details) => ({
    ...details,
    natureOfOperation: details.natureOfOperation === "Other" ? details.natureOfOperationOther! : details.natureOfOperation,
  })),
  dispatch: z.object({
    from: z.string().trim().max(200),
    to: z.string().trim().max(200),
    vehicle: z.preprocess((value) => value === "" ? "none" : value, z.union([z.uuid(), z.literal("other"), z.literal("none")])),
    vehicleOther: z.string().trim().max(120).optional(),
    driver: z.string().trim().max(120),
    departTime: z.preprocess((value) => value === "" ? "12:00" : value, z.string().regex(/^(0?[1-9]|1[0-2]):[0-5][0-9]$/)),
    departPeriod: z.enum(["AM", "PM"]),
    arrivalTime: z.preprocess((value) => value === "" ? "12:00" : value, z.string().regex(/^(0?[1-9]|1[0-2]):[0-5][0-9]$/)),
    arrivalPeriod: z.enum(["AM", "PM"]),
    odometerIn: optionalOdometer,
    odometerOut: optionalOdometer,
  }).refine((dispatch) => dispatch.vehicle === "none" || Boolean(dispatch.driver.trim()), {
    path: ["driver"],
    message: "Enter the driver's name.",
  }),
  people: ReportPeopleSchema,
  operationDescription: z.object({
    description: z.string().trim().min(1, "Enter the operation description.").max(10000),
  }),
  inventory: z.array(z.object({
    itemName: z.string().trim().min(1).max(120),
    quantity: inventoryQuantity,
    inventoryItemId: z.uuid().optional(),
  })).max(100),
});

export type OperationReportInput = z.infer<typeof OperationReportSchema>;
