import { CreateVehicleSchema } from "@/schemas/vehicle.schema";
import { vehicleService } from "@/services/vehicle.service";
import { validateOrThrow } from "@/shared/utils";
import type { Request, Response, NextFunction } from "express";

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
};
