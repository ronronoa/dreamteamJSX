import { reportFormsController } from "@/controllers/reportForms.controller";
import { operationController } from "@/controllers/operation.controller";
import { patientLogController } from "@/controllers/patientLog.controller";
import { vehicularDispatchReportController } from "@/controllers/vehicularDispatchReport.controller";
import { optionalAuth, requireAuth, requireRole } from "@/middleware/auth.middleware";
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
reportFormsRoutes.post("/operations/:id/validate", requireAuth, requireRole("TEAM_LEADER", "SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY"), operationController.validate);
reportFormsRoutes.post("/operations/:id/reject", requireAuth, requireRole("TEAM_LEADER", "SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY"), operationController.reject);

reportFormsRoutes.post("/operations/:id/persons", requireAuth, operationController.addPerson);
reportFormsRoutes.delete("/operations/:id/persons/:personId", requireAuth, operationController.removePerson);
reportFormsRoutes.post("/operations/:id/responders", requireAuth, operationController.addResponder);
reportFormsRoutes.delete("/operations/:id/responders/:userId", requireAuth, operationController.removeResponder);
reportFormsRoutes.post("/operations/:id/images", requireAuth, operationController.addImage);
reportFormsRoutes.delete("/operations/:id/images/:attachmentId", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD"), operationController.removeImage);

reportFormsRoutes.get("/patient-logs", requireAuth, patientLogController.list);
reportFormsRoutes.get("/patient-logs/:id", requireAuth, patientLogController.getById);
reportFormsRoutes.post("/patient-logs/:id/authorize", requireAuth, requireRole("TEAM_LEADER"), patientLogController.review);
reportFormsRoutes.post("/patient-logs/:id/authenticate", requireAuth, patientLogController.review);
reportFormsRoutes.post("/patient-logs/:id/validate", requireAuth, requireRole("TEAM_LEADER", "DEPARTMENT_HEAD", "DEPUTY", "SUPER_ADMIN"), patientLogController.review);
reportFormsRoutes.post("/patient-logs/:id/reject", requireAuth, requireRole("TEAM_LEADER", "DEPARTMENT_HEAD", "DEPUTY", "SUPER_ADMIN"), patientLogController.review);

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

// no requireAuth for this, any member/non signed-in users can submit
reportFormsRoutes.get("/report-forms/operations/options", reportFormsController.getOperationOptions);
reportFormsRoutes.get("/report-forms/:formType/suggestions", reportFormsController.getReportFormSuggestions);
reportFormsRoutes.get("/report-forms/patients/options", reportFormsController.getPatientOptions);
reportFormsRoutes.get("/report-forms/inventory/last-selection", reportFormsController.getLastInventorySelection);
reportFormsRoutes.get("/report-forms/operations/latest", reportFormsController.getLatestOperationReport);
reportFormsRoutes.get("/report-forms/patients/latest", reportFormsController.getLatestPatientReport);
reportFormsRoutes.post("/report-forms/operations", optionalAuth, reportFormPinLimiter, parseImages, reportFormsController.submitOperation);
reportFormsRoutes.post("/report-forms/patients", optionalAuth, reportFormPinLimiter, parseImages, reportFormsController.submitPatient);
reportFormsRoutes.get("/report-forms/vehicular-dispatches/options", vehicularDispatchReportController.getOptions);
reportFormsRoutes.get("/report-forms/vehicular-dispatches/latest", vehicularDispatchReportController.getLatest);
reportFormsRoutes.post("/report-forms/vehicular-dispatches", optionalAuth, reportFormPinLimiter, vehicularDispatchReportController.submit);

reportFormsRoutes.get("/vehicular-dispatches/:id", requireAuth, vehicularDispatchReportController.getById);
reportFormsRoutes.post("/vehicular-dispatches/:id/:action", requireAuth, vehicularDispatchReportController.review);
reportFormsRoutes.get("/vehicular-dispatches", requireAuth, vehicularDispatchReportController.list);
