import { PatientLogParamsSchema, PatientLogReviewParamsSchema, PatientLogReviewSchema } from "@/schemas/patientLog.schema";
import { patientLogService } from "@/services/patientLog.service";
import { validateOrThrow } from "@/shared/utils";
import type { Request, Response, NextFunction } from "express";

export const patientLogController = {
  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const patientLogs = await patientLogService.list();
      res.status(200).json({ patientLogs });
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = validateOrThrow(PatientLogParamsSchema.safeParse(req.params));
      const patientLog = await patientLogService.getById(id);
      res.status(200).json({ patientLog });
    } catch (error) {
      next(error);
    }
  },

  async review(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, action } = validateOrThrow(PatientLogReviewParamsSchema.safeParse(req.params));
      const { pin } = validateOrThrow(PatientLogReviewSchema.safeParse(req.body));
      const patientLog = await patientLogService.review(id, req.user!, pin, action);
      res.status(200).json({ patientLog });
    } catch (error) {
      next(error);
    }
  },
};
