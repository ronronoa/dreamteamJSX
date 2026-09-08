import { userController } from "@/controllers/user.controller";
import { requireAuth, requireRole } from "@/middleware/auth.middleware";
import { Router } from "express";

export const userRoutes = Router()

userRoutes.use(requireAuth, requireRole("SUPER_ADMIN"))

userRoutes.get("/users", userController.list)
userRoutes.get("/users/:id", userController.getById)
userRoutes.post("/users", userController.create)
userRoutes.patch("/users/:id", userController.update)
userRoutes.post("/users/:id/reset-password", userController.resetPassword)
userRoutes.delete("/users/:id", userController.delete)
