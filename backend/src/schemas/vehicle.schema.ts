import { z } from "zod";

const PLATE_LETTER_COUNT = 3;
const PlateNumberSchema = z.string().trim().toUpperCase()
  .regex(/^[A-Z]{3} ?[0-9]{4}$/, "Plate number must have three letters followed by four digits, such as ABC1234. No special characters are allowed.")
  .transform((value) => {
    const compactPlate = value.replace(/ /g, "");
    return `${compactPlate.slice(0, PLATE_LETTER_COUNT)} ${compactPlate.slice(PLATE_LETTER_COUNT)}`;
  });

export const CreateVehicleSchema = z.object({
  vehicleName: z.string().trim().min(1, "Vehicle name is required.").max(100),
  plateNumber: PlateNumberSchema,
});

export const UpdateVehicleOdometerSchema = z.object({
  currentOdometer: z.number().int().nonnegative("Odometer must be zero or greater.").max(2_000_000_000),
});

export const UpdateVehicleAvailabilitySchema = z.object({
  available: z.boolean(),
});

export const UpdateVehicleDetailsSchema = CreateVehicleSchema;

export type CreateVehicleInput = z.infer<typeof CreateVehicleSchema>;
export type UpdateVehicleOdometerInput = z.infer<typeof UpdateVehicleOdometerSchema>;
export type UpdateVehicleAvailabilityInput = z.infer<typeof UpdateVehicleAvailabilitySchema>;
export type UpdateVehicleDetailsInput = z.infer<typeof UpdateVehicleDetailsSchema>;
