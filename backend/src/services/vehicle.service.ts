import { prisma } from "@/lib/prisma";
import { ConflictError } from "@/shared/errors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import type { CreateVehicleInput } from "@/schemas/vehicle.schema";

export const vehicleService = {
  list() {
    return prisma.vehicle.findMany({ orderBy: { createdAt: "desc" } });
  },

  async create(data: CreateVehicleInput) {
    try {
      return await prisma.vehicle.create({
        data: {
          vehicle_name: data.vehicleName,
          plate_number: data.plateNumber,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        throw new ConflictError("A vehicle with this plate number already exists.");
      }
      throw error;
    }
  },
};
