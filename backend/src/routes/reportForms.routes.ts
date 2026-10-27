import { reportFormsController } from "@/controllers/reportForms.controller";
import { operationController } from "@/controllers/operation.controller";
import { patientLogController } from "@/controllers/patientLog.controller";
import { vehicularDispatchReportController } from "@/controllers/vehicularDispatchReport.controller";
import { ocrController } from "@/controllers/ocr.controller";
import { denyTeamLeaderWrites, optionalAuth, requireAuth, requireRole } from "@/middleware/auth.middleware";
import { createOcrImageUpload, createReportFormUpload } from "@/middleware/upload";
import { ValidationError } from "@/shared/errors";
import { Router } from "express";
import multer from "multer";
import type { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";

const uploadReportImages = createReportFormUpload();
const parseReportImages = uploadReportImages.array("images", 10);
const parsePatientReportImages = uploadReportImages.fields([
  { name: "images", maxCount: 10 },
  { name: "formImage", maxCount: 1 },
]);
const uploadOcrImage = createOcrImageUpload().single("file");
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
reportFormsRoutes.post("/operations", requireAuth, denyTeamLeaderWrites, operationController.create);
reportFormsRoutes.patch("/operations/:id", requireAuth, denyTeamLeaderWrites, operationController.update);

reportFormsRoutes.post("/operations/:id/submit", requireAuth, denyTeamLeaderWrites, operationController.submit);
reportFormsRoutes.post("/operations/:id/authorize", requireAuth, requireRole("DEPARTMENT_HEAD", "DEPUTY", "SUPER_ADMIN"), operationController.authorize);
reportFormsRoutes.post("/operations/:id/validate", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY"), operationController.validate);
reportFormsRoutes.post("/operations/:id/reject", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY"), operationController.reject);

reportFormsRoutes.post("/operations/:id/persons", requireAuth, denyTeamLeaderWrites, operationController.addPerson);
reportFormsRoutes.post("/operations/:id/responders", requireAuth, denyTeamLeaderWrites, operationController.addResponder);
reportFormsRoutes.post("/operations/:id/images", requireAuth, denyTeamLeaderWrites, operationController.addImage);

reportFormsRoutes.get("/patient-logs", requireAuth, patientLogController.list);
reportFormsRoutes.get("/patient-logs/:id", requireAuth, patientLogController.getById);
reportFormsRoutes.post("/patient-logs/:id/authorize", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY"), patientLogController.review);
reportFormsRoutes.post("/patient-logs/:id/authenticate", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY"), patientLogController.review);
reportFormsRoutes.post("/patient-logs/:id/validate", requireAuth, requireRole("DEPARTMENT_HEAD", "DEPUTY", "SUPER_ADMIN"), patientLogController.review);
reportFormsRoutes.post("/patient-logs/:id/reject", requireAuth, requireRole("DEPARTMENT_HEAD", "DEPUTY", "SUPER_ADMIN"), patientLogController.review);

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

function parsePatientImages(req: Request, res: Response, next: NextFunction) {
  parsePatientReportImages(req, res, (error: unknown) => {
    if (error instanceof multer.MulterError) {
      const message = error.code === "LIMIT_FILE_SIZE"
        ? "Each patient log image must be 8 MB or smaller."
        : "Attach up to 10 report images and one scanned form image.";
      next(new ValidationError(message, { images: [message] }));
      return;
    }
    next(error);
  });
}

function parseOcrImage(req: Request, res: Response, next: NextFunction) {
  uploadOcrImage(req, res, (error: unknown) => {
    if (error instanceof multer.MulterError) {
      const message = error.code === "LIMIT_FILE_SIZE"
        ? "The image must be 8 MB or smaller."
        : "Upload one JPG, PNG, or WebP image.";
      next(new ValidationError(message, { file: [message] }));
      return;
    }
    next(error);
  });
}

// no requireAuth for this, any member/non signed-in users can submit
reportFormsRoutes.get("/report-forms/operations/options", reportFormsController.getOperationOptions);
reportFormsRoutes.get("/report-forms/:formType/suggestions", reportFormsController.getReportFormSuggestions);
reportFormsRoutes.get("/report-forms/patients/options", reportFormsController.getPatientOptions);
reportFormsRoutes.get("/report-forms/inventory/last-selection", reportFormsController.getLastInventorySelection);
reportFormsRoutes.get("/report-forms/operations/latest", reportFormsController.getLatestOperationReport);
reportFormsRoutes.get("/report-forms/patients/latest", reportFormsController.getLatestPatientReport);
reportFormsRoutes.post("/report-forms/patients/scan", optionalAuth, parseOcrImage, ocrController.scanPatientLogImage);
reportFormsRoutes.post("/report-forms/operations", optionalAuth, denyTeamLeaderWrites, reportFormPinLimiter, parseImages, reportFormsController.submitOperation);
reportFormsRoutes.post("/report-forms/patients", optionalAuth, denyTeamLeaderWrites, reportFormPinLimiter, parsePatientImages, reportFormsController.submitPatient);
reportFormsRoutes.get("/report-forms/vehicular-dispatches/options", vehicularDispatchReportController.getOptions);
reportFormsRoutes.get("/report-forms/vehicular-dispatches/latest", vehicularDispatchReportController.getLatest);
reportFormsRoutes.post("/report-forms/vehicular-dispatches", optionalAuth, denyTeamLeaderWrites, reportFormPinLimiter, vehicularDispatchReportController.submit);

reportFormsRoutes.get("/vehicular-dispatches/:id", requireAuth, vehicularDispatchReportController.getById);
reportFormsRoutes.post("/vehicular-dispatches/:id/:action", requireAuth, vehicularDispatchReportController.review);
reportFormsRoutes.get("/vehicular-dispatches", requireAuth, vehicularDispatchReportController.list);
