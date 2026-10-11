import type { Request, Response, NextFunction } from "express";
import { ValidationError } from "@/shared/errors";
import { pinService } from "@/services/pin.service";
import { reportFormsService } from "@/services/reportForms.service";
import { VerifyPinSchema } from "@/schemas/pin.schema";
import { OperationReportSchema } from "@/schemas/operationReport.schema";
import { PatientReportSchema } from "@/schemas/patientReport.schema";
import { unlink } from "node:fs/promises";

async function removeUploadedFiles(req: Request) {
  const files = req.files as Express.Multer.File[] | undefined;
  if (!files) return;

  await Promise.all(files.map(async (file) => {
    try {
      await unlink(file.path);
    } catch {
      // A failed request should not be replaced by an upload cleanup error.
    }
  }));
}

function parseJsonField(value: unknown, fieldName: string) {
  if (typeof value !== "string") {
    throw new ValidationError(`${fieldName} is required.`, { [fieldName]: [`${fieldName} is required.`] });
  }
  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Expected an object.");
    return parsed as Record<string, unknown>;
  } catch {
    throw new ValidationError(`${fieldName} must contain valid JSON.`, { [fieldName]: [`${fieldName} must contain valid JSON.`] });
  }
}

function getPin(req: Request) {
  const parsed = VerifyPinSchema.safeParse({ pin: req.body.pinNumber });
  if (!parsed.success) {
    throw new ValidationError("Enter a valid 4-6 digit PIN.", { pinNumber: ["Enter a valid 4-6 digit PIN."] });
  }
  return parsed.data;
}

export const reportFormsController = {
  async getOperationOptions(_req: Request, res: Response, next: NextFunction) {
    try {
      const options = await reportFormsService.getOperationFormOptions();
      res.status(200).json(options);
    } catch (error) {
      next(error);
    }
  },

  async getPatientOptions(_req: Request, res: Response, next: NextFunction) {
    try {
      const options = await reportFormsService.getPatientFormOptions();
      res.status(200).json(options);
    } catch (error) {
      next(error);
    }
  },

  async getLastInventorySelection(_req: Request, res: Response, next: NextFunction) {
    try {
      const selection = await reportFormsService.getLastReportFormInventorySelection();
      res.status(200).json(selection ? {
        inventoryItemId: selection.inventoryItemId,
        quantity: selection.quantity,
      } : null);
    } catch (error) {
      next(error);
    }
  },

  async getLatestOperationReport(req: Request, res: Response, next: NextFunction) {
    try {
      await pinService.verifyReportFormPin(getPin(req));
      const report = await reportFormsService.getLatestOperationReport();
      res.status(200).json({ report });
    } catch (error) {
      next(error);
    }
  },

  async getLatestPatientReport(_req: Request, res: Response, next: NextFunction) {
    try {
      // Previously gated by the report PIN; prefill is now available without a PIN.
      const report = await reportFormsService.getLatestPatientReport();
      res.status(200).json({ report });
    } catch (error) {
      next(error);
    }
  },

  async submitOperation(req: Request, res: Response, next: NextFunction) {
    try {
      await pinService.verifyReportFormPin(getPin(req));
      const submittedForm = parseJsonField(req.body.formData, "formData");
      const parsedForm = OperationReportSchema.safeParse(submittedForm);
      if (!parsedForm.success) {
        const fields: Record<string, string[]> = {};
        for (const issue of parsedForm.error.issues) {
          const field = issue.path.join(".") || "formData";
          fields[field] = [...(fields[field] ?? []), issue.message];
        }
        throw new ValidationError("Review the operation report fields and try again.", fields);
      }
      const files = (req.files ?? []) as Express.Multer.File[];
      if (files.length === 0) {
        throw new ValidationError("Attach at least one report image.", { images: ["Attach at least one report image."] });
      }
      const record = await reportFormsService.createOperation(parsedForm.data, files);
      res.status(201).json({ operation: record });
    } catch (error) {
      await removeUploadedFiles(req);
      next(error);
    }
  },

  async submitPatient(req: Request, res: Response, next: NextFunction) {
    try {
      await pinService.verifyReportFormPin(getPin(req));
      const form = parseJsonField(req.body.formData, "formData");
      const parsedForm = PatientReportSchema.safeParse(form);
      if (!parsedForm.success) {
        const fields: Record<string, string[]> = {};
        for (const issue of parsedForm.error.issues) {
          const field = issue.path.join(".") || "formData";
          fields[field] = [...(fields[field] ?? []), issue.message];
        }
        throw new ValidationError("Review the patient report fields and try again.", fields);
      }
      const files = (req.files ?? []) as Express.Multer.File[];
      if (files.length === 0) {
        throw new ValidationError("Attach at least one report image.", { images: ["Attach at least one report image."] });
      }
      const record = await reportFormsService.createPatient(parsedForm.data, files);
      res.status(201).json({ patientLog: record });
    } catch (error) {
      await removeUploadedFiles(req);
      next(error);
    }
  },
};
