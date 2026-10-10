import { userController } from "@/controllers/user.controller";
import { requireAuth, requireRole } from "@/middleware/auth.middleware";
import { Router } from "express";
import multer from "multer";
import { createProfileImageUpload } from "@/middleware/upload";
import { ValidationError } from "@/shared/errors";

export const userRoutes = Router()
const profileImageUpload = createProfileImageUpload();

function uploadProfileImage(req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) {
  profileImageUpload.single("image")(req, res, (error: unknown) => {
    if (error instanceof multer.MulterError) {
      const message = error.code === "LIMIT_FILE_SIZE"
        ? "Profile photos must be 5 MB or smaller."
        : "Upload one JPG or PNG profile photo.";
      next(new ValidationError(message, { image: [message] }));
      return;
    }
    next(error);
  });
}

// Self-service routes must be registered before the Super Admin-only user routes.
userRoutes.get("/users/me", requireAuth, userController.getOwnProfile)
userRoutes.patch("/users/me", requireAuth, userController.updateOwnProfile)
userRoutes.post("/users/me/avatar", requireAuth, uploadProfileImage, userController.uploadOwnProfileImage)

// userRoutes.use(requireAuth, requireRole("SUPER_ADMIN"))
// removed as this applies globally on every route

userRoutes.use(
  "/users",
  requireAuth,
  requireRole("SUPER_ADMIN")
);

userRoutes.get("/users", userController.list)
userRoutes.get("/users/:id", userController.getById)
userRoutes.post("/users", userController.create)
userRoutes.patch("/users/:id", userController.update)
userRoutes.post("/users/:id/reset-password", userController.resetPassword)
userRoutes.delete("/users/:id", userController.delete)
