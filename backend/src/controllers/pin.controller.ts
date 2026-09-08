import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { SetPinSchema, VerifyPinSchema } from "@/schemas/pin.schema";
import { ValidationError, UnauthorizedError } from "@/shared/errors/app-error";
import { pinService } from "@/services/pin.service";

function getFirstZodIssue(error: z.ZodError): z.ZodIssue {
  const issue = error.issues[0];
  if (!issue) throw new Error("Zod error has no issues");
  return issue;
}

export const pinController = {
  async setPin(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = SetPinSchema.safeParse(req.body);

      if (!parsed.success) {
        const firstIssue = getFirstZodIssue(parsed.error);
        throw new ValidationError(firstIssue.message, {
          [firstIssue.path.join(".")]: [firstIssue.message],
        });
      }

      if (!req.user) {
        throw new UnauthorizedError("Authentication required");
      }

      const result = await pinService.setPin(req.user.userId, parsed.data);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async verifyPin(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = VerifyPinSchema.safeParse(req.body);

      if (!parsed.success) {
        const firstIssue = getFirstZodIssue(parsed.error);
        throw new ValidationError(firstIssue.message, {
          [firstIssue.path.join(".")]: [firstIssue.message],
        });
      }

      if (!req.user) {
        throw new UnauthorizedError("Authentication required");
      }

      const result = await pinService.verifyPin(req.user.userId, parsed.data);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
