import { operationController } from "@/controllers/operation.controller";
import { requireAuth, requireRole } from "@/middleware/auth.middleware";
import { Router } from "express";

export const teamRoutes = Router();

teamRoutes.get("/teams", requireAuth, operationController.listTeams);
teamRoutes.get("/teams/:id", requireAuth, operationController.getTeamById);
teamRoutes.post("/teams", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD"), operationController.createTeam);
teamRoutes.patch("/teams/:id", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD"), operationController.updateTeam);
teamRoutes.delete("/teams/:id", requireAuth, requireRole("SUPER_ADMIN"), operationController.deleteTeam);
