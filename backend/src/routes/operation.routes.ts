import { operationController } from "@/controllers/operation.controller";
import { requireAuth, requireRole } from "@/middleware/auth.middleware";
import { Router } from "express";

export const operationRoutes = Router()

// Response Team
operationRoutes.get("/teams", requireAuth, operationController.listTeams)
operationRoutes.get("/teams/:id", requireAuth, operationController.getTeamById)
operationRoutes.post("/teams", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD"), operationController.createTeam)
operationRoutes.patch("/teams/:id", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD"), operationController.updateTeam)
operationRoutes.delete("/teams/:id", requireAuth, requireRole("SUPER_ADMIN"), operationController.deleteTeam)

// Operation Log
operationRoutes.get("/operations", requireAuth, operationController.list)
operationRoutes.get("/operations/:id", requireAuth, operationController.getById)
operationRoutes.post("/operations", requireAuth, operationController.create)
operationRoutes.patch("/operations/:id", requireAuth, operationController.update)
operationRoutes.delete("/operations/:id", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD"), operationController.delete)

// Status Transition

operationRoutes.post("/operations/:id/submit", requireAuth, operationController.submit)
operationRoutes.post("/operations/:id/validate", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD"), operationController.setStatus)
operationRoutes.post("/operations/:id/reject", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD"), operationController.setStatus)

// Persons Involved
operationRoutes.post("/operations/:id/persons", requireAuth, operationController.addPerson)
operationRoutes.delete("/operations/:id/persons/:personId", requireAuth, operationController.removePerson)

// Operation Responders
operationRoutes.post("/operations/:id/responders", requireAuth, operationController.addResponder)
operationRoutes.delete("/operations/:id/responders/:userId", requireAuth, operationController.removeResponder)

// Image Attachments
operationRoutes.post("/operations/:id/images", requireAuth, operationController.addImage)
operationRoutes.delete("/operations/:id/images/:attachmentId", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD"), operationController.removeImage)