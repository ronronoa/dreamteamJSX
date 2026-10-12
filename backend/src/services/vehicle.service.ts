import { prisma } from "@/lib/prisma";
import { ConflictError, NotFoundError } from "@/shared/errors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import type {
  CreateVehicleInput,
  UpdateVehicleAvailabilityInput,
  UpdateVehicleOdometerInput,
} from "@/schemas/vehicle.schema";

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

  async updateOdometer(vehicleId: string, data: UpdateVehicleOdometerInput) {
    const result = await prisma.vehicle.updateMany({
      where: { vehicle_id: vehicleId },
      data: { current_odometer: data.currentOdometer },
    });
    if (result.count === 0) throw new NotFoundError("Vehicle", vehicleId);
    return prisma.vehicle.findUniqueOrThrow({ where: { vehicle_id: vehicleId } });
  },

  async updateAvailability(vehicleId: string, data: UpdateVehicleAvailabilityInput) {
    const result = await prisma.vehicle.updateMany({
      where: { vehicle_id: vehicleId },
      data: { status: data.available ? "AVAILABLE" : "MAINTENANCE" },
    });
    if (result.count === 0) throw new NotFoundError("Vehicle", vehicleId);
    return prisma.vehicle.findUniqueOrThrow({ where: { vehicle_id: vehicleId } });
  },
};
