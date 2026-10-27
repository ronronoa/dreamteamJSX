import { inventoryController } from "@/controllers/inventory.controller";
import { requireAuth, requireRole } from "@/middleware/auth.middleware";
import { Router } from "express";

export const inventoryRoutes = Router();

const inventoryManagers = ["SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY"] as const;

inventoryRoutes.get("/inventory/report-form-options", inventoryController.listForReport);
inventoryRoutes.get("/inventory", requireAuth, inventoryController.list);
inventoryRoutes.post("/inventory", requireAuth, requireRole(...inventoryManagers), inventoryController.create);
inventoryRoutes.patch("/inventory/:id", requireAuth, requireRole(...inventoryManagers), inventoryController.update);
inventoryRoutes.post("/inventory/stock-in", requireAuth, requireRole(...inventoryManagers), inventoryController.stockIn);
inventoryRoutes.post("/inventory/adjust", requireAuth, requireRole("SUPER_ADMIN"), inventoryController.adjust);
inventoryRoutes.get("/inventory/:id/transactions", requireAuth, inventoryController.transactions);
