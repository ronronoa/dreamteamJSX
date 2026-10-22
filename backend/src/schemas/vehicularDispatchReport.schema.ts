import { z } from "zod"

const timeSchema = z.string().regex(/^(0?[1-9]|1[0-2]):[0-5][0-9]$/)
const formTimeSchema = z.preprocess(
  (value) => value === "" || value === undefined
    ? `${String(new Date().getHours()).padStart(2, "0")}:${String(new Date().getMinutes()).padStart(2, "0")}`
    : value,
  z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
)
const odometerSchema = z.string()
  .regex(/^\d+$/)
  .transform(Number)
  .pipe(z.number().int().nonnegative())

function getTodayDateInputValue() {
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")
  return `${today.getFullYear()}-${month}-${day}`
}

const personNameSchema = z.object({
  surname: z.string().trim().min(1).max(80),
  firstName: z.string().trim().min(1).max(80),
  middleInitial: z.string().trim().max(10),
  suffix: z.string().trim().max(20),
})

const passengerSchema = z.object({
  name: personNameSchema,
  birthdate: z.iso.date(),
  age: z.number().int().min(0).max(150),
  gender: z.enum(["Male", "Female"]),
  contactNumber: z.string().trim().max(20),
  address: z.object({
    phase: z.string().trim().max(30),
    package: z.string().trim().max(30),
    block: z.string().trim().max(30),
    lot: z.string().trim().max(30),
  }),
})
  .refine((passenger) => passenger.birthdate <= getTodayDateInputValue(), {
    path: ["birthdate"],
    message: "Birthdate cannot be in the future.",
  })

export const VehicularDispatchReportSchema = z.object({
  details: z.object({
    submitterName: z.string().trim().min(1).max(120),
    date: z.iso.date().refine((date) => date <= getTodayDateInputValue(), {
      message: "Dispatch date cannot be in the future.",
    }),
    time: formTimeSchema,
    responders: z.array(z.uuid()).min(1).max(50),
    transfers: z.array(z.enum(["Drop-Off", "Pick-Up"])).min(1).max(2),
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
    odometerIn: z.union([odometerSchema, z.literal("")]),
    odometerOut: z.union([odometerSchema, z.literal("")]),
  }).refine((dispatch) => dispatch.vehicle === "none" || (typeof dispatch.odometerIn === "number" && typeof dispatch.odometerOut === "number"), {
    path: ["odometerIn"], message: "Enter odometer readings when a vehicle is selected.",
  }).refine((dispatch) => dispatch.vehicle === "none" || dispatch.odometerOut === "" || dispatch.odometerIn === "" || dispatch.odometerOut >= dispatch.odometerIn, {
    path: ["odometerOut"], message: "Odometer out must be greater than or equal to odometer in.",
  }).refine((dispatch) => dispatch.vehicle !== "none" || dispatch.driver === "", {
    path: ["driver"], message: "Driver is not used when no vehicle is selected.",
  }).refine((dispatch) => dispatch.vehicle !== "other" || Boolean(dispatch.vehicleOther?.trim()), {
    path: ["vehicleOther"],
    message: "Specify the vehicle.",
  }),
  passengers: z.array(passengerSchema).max(100),
})

export type VehicularDispatchReportInput = z.infer<typeof VehicularDispatchReportSchema>
