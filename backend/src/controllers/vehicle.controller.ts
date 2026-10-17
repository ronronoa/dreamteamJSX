import {
  CreateVehicleSchema,
  UpdateVehicleAvailabilitySchema,
  UpdateVehicleOdometerSchema,
  UpdateVehicleDetailsSchema,
} from "@/schemas/vehicle.schema";
import { vehicleService } from "@/services/vehicle.service";
import { validateOrThrow } from "@/shared/utils";
import type { Request, Response, NextFunction } from "express";

function getVehicleId(req: Request) {
  const vehicleId = req.params["id"];
  return Array.isArray(vehicleId) ? vehicleId[0] ?? "" : vehicleId ?? "";
}

export const vehicleController = {
  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const vehicles = await vehicleService.list();
      res.status(200).json({ vehicles });
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = validateOrThrow(CreateVehicleSchema.safeParse(req.body));
      const vehicle = await vehicleService.create(data);
      res.status(201).json({ vehicle });
    } catch (error) {
      next(error);
    }
  },

  async updateOdometer(req: Request, res: Response, next: NextFunction) {
    try {
      const data = validateOrThrow(UpdateVehicleOdometerSchema.safeParse(req.body));
      const vehicle = await vehicleService.updateOdometer(getVehicleId(req), data);
      res.status(200).json({ vehicle });
    } catch (error) {
      next(error);
    }
  },

  async updateDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const data = validateOrThrow(UpdateVehicleDetailsSchema.safeParse(req.body));
      const vehicle = await vehicleService.updateDetails(getVehicleId(req), data);
      res.status(200).json({ vehicle });
    } catch (error) {
      next(error);
    }
  },

  async updateAvailability(req: Request, res: Response, next: NextFunction) {
    try {
      const data = validateOrThrow(UpdateVehicleAvailabilitySchema.safeParse(req.body));
      const vehicle = await vehicleService.updateAvailability(getVehicleId(req), data);
      res.status(200).json({ vehicle });
    } catch (error) {
      next(error);
    }
  },
};
