import { archivesController } from "@/controllers/archives.controller";
import { requireAuth, requireRole } from "@/middleware/auth.middleware";
import { Router } from "express";

export const archivesRoutes = Router();
const archiveManagers = [requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD")];

archivesRoutes.get("/archives", ...archiveManagers, archivesController.list);
archivesRoutes.post("/archives/:type/:id", ...archiveManagers, archivesController.archive);
archivesRoutes.post("/archives/:type/:id/restore", ...archiveManagers, archivesController.restore);
