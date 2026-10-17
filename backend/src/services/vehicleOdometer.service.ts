import type { Prisma } from "@/generated/prisma/client";
import { ValidationError } from "@/shared/errors";

export async function saveVehicleOdometerFromDispatch(
  transaction: Prisma.TransactionClient,
  vehicleId: string,
  odometerIn: number,
  odometerOut: number,
) {
  const updatedVehicle = await transaction.vehicle.updateMany({
    where: {
      vehicle_id: vehicleId,
      current_odometer: { lte: odometerIn },
    },
    data: { current_odometer: odometerOut },
  });

  if (updatedVehicle.count === 0) {
    throw new ValidationError(
      "Odometer in cannot be lower than the vehicle's saved odometer.",
      { "dispatch.odometerIn": ["Use the saved vehicle odometer or a higher reading."] },
    );
  }
}
