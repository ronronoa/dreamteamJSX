import { vehicleController } from "@/controllers/vehicle.controller";
import { requireAuth, requireRole } from "@/middleware/auth.middleware";
import { Router } from "express";

export const vehicleRoutes = Router();

vehicleRoutes.get("/vehicles/fleet", requireAuth, vehicleController.list);
vehicleRoutes.post(
  "/vehicles/fleet",
  requireAuth,
  requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY"),
  vehicleController.create,
);
vehicleRoutes.patch(
  "/vehicles/fleet/:id",
  requireAuth,
  requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY"),
  vehicleController.updateDetails,
);
vehicleRoutes.patch(
  "/vehicles/fleet/:id/odometer",
  requireAuth,
  requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY"),
  vehicleController.updateOdometer,
);
vehicleRoutes.patch(
  "/vehicles/fleet/:id/availability",
  requireAuth,
  requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY"),
  vehicleController.updateAvailability,
);
