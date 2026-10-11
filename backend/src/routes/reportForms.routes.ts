import { reportFormsController } from "@/controllers/reportForms.controller";
import { operationController } from "@/controllers/operation.controller";
import { requireAuth, requireRole } from "@/middleware/auth.middleware";
import { createReportFormUpload } from "@/middleware/upload";
import { ValidationError } from "@/shared/errors";
import { Router } from "express";
import multer from "multer";
import type { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";

const uploadReportImages = createReportFormUpload();
const parseReportImages = uploadReportImages.array("images", 10);
const reportFormPinLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many report submissions. Try again later." },
});
export const reportFormsRoutes = Router();

// Operation-log read, edit, and review APIs share this route module with form submissions.
reportFormsRoutes.get("/operations", requireAuth, operationController.list);
reportFormsRoutes.get("/operations/:id", requireAuth, operationController.getById);
reportFormsRoutes.post("/operations", requireAuth, operationController.create);
reportFormsRoutes.patch("/operations/:id", requireAuth, operationController.update);
reportFormsRoutes.delete("/operations/:id", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD"), operationController.delete);

reportFormsRoutes.post("/operations/:id/submit", requireAuth, operationController.submit);
reportFormsRoutes.post("/operations/:id/authorize", requireAuth, requireRole("TEAM_LEADER", "DEPARTMENT_HEAD", "DEPUTY", "SUPER_ADMIN"), operationController.authorize);
reportFormsRoutes.post("/operations/:id/validate", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY"), operationController.validate);
reportFormsRoutes.post("/operations/:id/reject", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY"), operationController.reject);

reportFormsRoutes.post("/operations/:id/persons", requireAuth, operationController.addPerson);
reportFormsRoutes.delete("/operations/:id/persons/:personId", requireAuth, operationController.removePerson);
reportFormsRoutes.post("/operations/:id/responders", requireAuth, operationController.addResponder);
reportFormsRoutes.delete("/operations/:id/responders/:userId", requireAuth, operationController.removeResponder);
reportFormsRoutes.post("/operations/:id/images", requireAuth, operationController.addImage);
reportFormsRoutes.delete("/operations/:id/images/:attachmentId", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD"), operationController.removeImage);

function parseImages(req: Request, res: Response, next: NextFunction) {
  parseReportImages(req, res, (error: unknown) => {
    if (error instanceof multer.MulterError) {
      const message = error.code === "LIMIT_FILE_SIZE"
        ? "Each report attachment must be 8 MB or smaller."
        : "Attach no more than 10 JPG, PNG, or WebP images.";
      next(new ValidationError(message, { images: [message] }));
      return;
    }
    next(error);
  });
}

reportFormsRoutes.get("/report-forms/operations/options", reportFormsController.getOperationOptions);
reportFormsRoutes.get("/report-forms/patients/options", reportFormsController.getPatientOptions);
reportFormsRoutes.get("/report-forms/inventory/last-selection", reportFormsController.getLastInventorySelection);
reportFormsRoutes.post("/report-forms/operations/latest", reportFormPinLimiter, reportFormsController.getLatestOperationReport);
reportFormsRoutes.get("/report-forms/patients/latest", reportFormsController.getLatestPatientReport);
reportFormsRoutes.post("/report-forms/operations", reportFormPinLimiter, parseImages, reportFormsController.submitOperation);
reportFormsRoutes.post("/report-forms/patients", reportFormPinLimiter, parseImages, reportFormsController.submitPatient);
