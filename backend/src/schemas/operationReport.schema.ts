import { z } from "zod";

const personNameSchema = z.object({
  surname: z.string().trim().min(1).max(80),
  firstName: z.string().trim().min(1).max(80),
  middleInitial: z.string().trim().max(10),
  suffix: z.string().trim().max(20),
});

const personAddressSchema = z.object({
  phase: z.string().trim().min(1).max(30),
  package: z.string().trim().min(1).max(30),
  block: z.string().trim().min(1).max(30),
  lot: z.string().trim().min(1).max(30),
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

function hasValidPhoneDigitCount(value: string) {
  const digitCount = value.replace(/\D/g, "").length;
  return digitCount >= 7 && digitCount <= 15;
}

export const OperationReportSchema = z.object({
  operationDetails: z.object({
    submitterName: z.string().trim().min(1).max(120),
    date: z.iso.date(),
    natureOfOperation: z.string().trim().min(1).max(100),
    nameOfCaller: personNameSchema,
    teamAssigned: z.array(z.uuid()).min(1).max(10),
    responders: z.array(z.uuid()).min(1).max(50),
  }),
  dispatch: z.object({
    from: z.string().trim().min(1).max(200),
    to: z.string().trim().min(1).max(200),
    vehicle: z.uuid(),
    driver: z.string().trim().min(1).max(120),
    departTime: z.string().regex(/^([1-9]|1[0-2]):[0-5][0-9]$/),
    departPeriod: z.enum(["AM", "PM"]),
    arrivalTime: z.string().regex(/^([1-9]|1[0-2]):[0-5][0-9]$/),
    arrivalPeriod: z.enum(["AM", "PM"]),
    odometerIn: odometerString,
    odometerOut: odometerString,
  }),
  people: z.array(z.object({
    name: personNameSchema,
    birthdate: z.iso.date(),
    age: z.number().int().min(0).max(150),
    gender: z.enum(["Male", "Female"]),
    contactNumber: z.string()
      .trim()
      .regex(/^[+\d(). -]{7,20}$/, "Enter a valid contact number.")
      .refine(hasValidPhoneDigitCount, "Enter a valid contact number with 7 to 15 digits."),
    address: personAddressSchema,
  })).min(1).max(100),
  operationDescription: z.object({
    description: z.string().trim().min(1).max(10000),
  }),
  inventory: z.array(z.object({
    itemName: z.string().trim().min(1).max(120),
    quantity: inventoryQuantity,
  })).max(100),
}).refine((form) => form.dispatch.odometerOut >= form.dispatch.odometerIn, {
  path: ["dispatch", "odometerOut"],
  message: "Odometer out must be greater than or equal to odometer in.",
});

export type OperationReportInput = z.infer<typeof OperationReportSchema>;
