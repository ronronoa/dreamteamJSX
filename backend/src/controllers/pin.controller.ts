import { z } from "zod"
import type { Request, Response, NextFunction } from "express";
import { SetPinSchema, VerifyPinSchema } from "@/schemas/pin.schema";
import { UnauthorizedError, ValidationError } from "@/shared/errors";
import { pinService } from "@/services/pin.service";
import { parse } from "node:path";

function getFirstZodIssue(error: z.ZodError): z.ZodIssue {
    const issue = error.issues[0]
    if(!issue) throw new Error("Zod error has no issues")
        return issue;
}

export const pinController = {
    async setPin(req: Request, res: Response, next: NextFunction ) {
        try {
            const parsed = SetPinSchema.safeParse(req.body)

            if(!parsed.success) {
                const firstIssue = getFirstZodIssue(parsed.error)
                throw new ValidationError(firstIssue.message, {[firstIssue.path.join(".")]: [firstIssue.message],})
            }

            if(!req.user) throw new UnauthorizedError("Authentication required")

            const result = await pinService.setPin(req.user.userId, parsed.data)

            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    },

    async verifyPin(req: Request, res: Response, next: NextFunction) {
        try {
            const parsed = VerifyPinSchema.safeParse(req.body)

            if(!parsed.success) {
                const firstIssue = getFirstZodIssue(parsed.error)
                throw new ValidationError(firstIssue.message, {[firstIssue.path.join(".")]: [firstIssue.message],});
            }

            if (!req.user) throw new UnauthorizedError("Authentication required")
            const result = await pinService.verifyPin(req.user.userId, parsed.data)

            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }
}