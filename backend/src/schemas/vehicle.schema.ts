import { z } from "zod";

export const CreateVehicleSchema = z.object({
  vehicleName: z.string().trim().min(1, "Vehicle name is required.").max(100),
  plateNumber: z.string().trim().min(1, "Plate number is required.").max(20)
    .transform((plateNumber) => plateNumber.toUpperCase()),
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
