import { reportFormsController } from "@/controllers/reportForms.controller";
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
reportFormsRoutes.post("/report-forms/operations", reportFormPinLimiter, parseImages, reportFormsController.submitOperation);
reportFormsRoutes.post("/report-forms/patients", reportFormPinLimiter, parseImages, reportFormsController.submitPatient);
