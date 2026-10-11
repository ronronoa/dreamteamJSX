import { z } from "zod";

export const CreateVehicleSchema = z.object({
  vehicleName: z.string().trim().min(1, "Vehicle name is required.").max(100),
  plateNumber: z.string().trim().min(1, "Plate number is required.").max(20)
    .transform((plateNumber) => plateNumber.toUpperCase()),
});

export type CreateVehicleInput = z.infer<typeof CreateVehicleSchema>;
