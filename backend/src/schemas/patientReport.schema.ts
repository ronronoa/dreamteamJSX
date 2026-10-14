import { z } from "zod";

const personNameSchema = z.object({
  surname: z.string().trim().max(80),
  firstName: z.string().trim().max(80),
  middleInitial: z.string().trim().max(10),
  suffix: z.string().trim().max(20),
});

const addressSchema = z.object({
  phase: z.string().trim().max(30),
  package: z.string().trim().max(30),
  block: z.string().trim().max(30),
  lot: z.string().trim().max(30),
});

const timeSchema = z.string().regex(/^(0?[1-9]|1[0-2]):[0-5][0-9]$/);
const odometerSchema = z.string().regex(/^\d+$/).transform(Number).pipe(z.number().int().nonnegative());
const optionalOdometerSchema = z.union([odometerSchema, z.literal("")]);
const transferSelectionSchema = z
  .array(z.string().trim().max(40))
  .max(10)
  .transform((values) => {
    const transfers = values.map((value) => {
      const normalizedValue = value.toLowerCase().replaceAll("_", "-").replaceAll(" ", "-");
      if (normalizedValue === "drop-off") return "Drop-Off";
      if (normalizedValue === "pick-up") return "Pick-Up";
      return null;
    });

    return [...new Set(transfers.filter((value): value is "Drop-Off" | "Pick-Up" => value !== null))];
  })
  .pipe(z.array(z.enum(["Drop-Off", "Pick-Up"])).min(1, "Select at least one transfer."));

export const PatientReportSchema = z.object({
  responderDetails: z.object({
    submitterName: z.string().trim().min(1).max(120),
    date: z.iso.date(),
    typeOfRequest: z.enum(["INTER_FACILITY_TRANSFER", "PICK_UP", "DROP_OFF"]),
    caller: personNameSchema,
    teamAssigned: transferSelectionSchema,
    responders: z.array(z.uuid()).min(1).max(50),
  }),
  dispatch: z.object({
    from: z.string().trim().min(1).max(200),
    to: z.string().trim().min(1).max(200),
    vehicle: z.union([z.uuid(), z.literal("other"), z.literal("none")]),
    vehicleOther: z.string().trim().max(120).optional(),
    driver: z.string().trim().max(120),
    departTime: timeSchema,
    departPeriod: z.enum(["AM", "PM"]),
    arrivalTime: timeSchema,
    arrivalPeriod: z.enum(["AM", "PM"]),
    odometerIn: optionalOdometerSchema,
    odometerOut: optionalOdometerSchema,
  }).refine((dispatch) => dispatch.vehicle === "none" || (typeof dispatch.odometerIn === "number" && typeof dispatch.odometerOut === "number"), {
    path: ["odometerIn"], message: "Enter odometer readings when a vehicle is selected.",
  }).refine((dispatch) => dispatch.vehicle !== "other" || Boolean(dispatch.vehicleOther?.trim()), {
    path: ["vehicleOther"], message: "Specify the vehicle.",
  }).refine((dispatch) => dispatch.vehicle === "none" || dispatch.odometerOut === "" || dispatch.odometerIn === "" || dispatch.odometerOut >= dispatch.odometerIn, {
    path: ["odometerOut"], message: "Odometer out must be greater than or equal to odometer in.",
  }),
  patientDetails: z.object({
    name: personNameSchema,
    birthdate: z.iso.date(),
    age: z.number().int().min(0).max(150),
    sex: z.enum(["Male", "Female"]),
    contactPerson: personNameSchema,
    contactNumber: z.string().trim().min(1).max(30),
    address: addressSchema,
  }),
  firstAidHospital: z.object({
    bp: z.string().trim().max(30),
    pr: z.string().trim().max(30),
    spo2: z.string().trim().max(30),
    temp: z.string().trim().max(30),
    medicalAssessment: z.string().trim().min(1).max(10000),
    firstAidGiven: z.string().trim().max(10000),
    hospitalName: z.string().trim().min(1).max(200),
    hospitalRepresentative: personNameSchema,
    hospitalInTime: timeSchema,
    hospitalInPeriod: z.enum(["AM", "PM"]),
    hospitalOutTime: timeSchema,
    hospitalOutPeriod: z.enum(["AM", "PM"]),
  }),
  inventory: z.array(z.object({
    id: z.string().max(100),
    itemName: z.string().trim().min(1).max(120),
    quantity: z.string().trim().min(1).max(80),
    inventoryItemId: z.uuid().optional(),
    unit: z.string().max(40).optional(),
  })).max(100),
}).refine((form) => form.firstAidHospital.hospitalName.length > 0, {
  path: ["firstAidHospital", "hospitalName"],
  message: "Hospital name is required.",
});

export type PatientReportInput = z.infer<typeof PatientReportSchema>;
