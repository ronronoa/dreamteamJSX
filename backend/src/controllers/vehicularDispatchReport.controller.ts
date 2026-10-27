import type { Request, Response, NextFunction } from "express"
import { pinService } from "@/services/pin.service"
import { vehicularDispatchReportService } from "@/services/vehicularDispatchReport.service"
import { VerifyPinSchema } from "@/schemas/pin.schema"
import { VehicularDispatchReportSchema } from "@/schemas/vehicularDispatchReport.schema"
import { VehicularDispatchParamsSchema, VehicularDispatchReviewParamsSchema, VehicularDispatchReviewSchema } from "@/schemas/vehicularDispatchReview.schema"
import { ValidationError } from "@/shared/errors"
import { validateOrThrow } from "@/shared/utils"

function parseFormData(value: unknown) {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) return value
  if (typeof value !== "string") {
    throw new ValidationError("Vehicular dispatch form data is required.", {
      formData: ["Vehicular dispatch form data is required."],
    })
  }

  try {
    const parsed: unknown = JSON.parse(value)
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Expected an object.")
    return parsed
  } catch {
    throw new ValidationError("Vehicular dispatch form data must be valid JSON.", {
      formData: ["Vehicular dispatch form data must be valid JSON."],
    })
  }
}

export const vehicularDispatchReportController = {
  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const dispatches = await vehicularDispatchReportService.list()
      res.status(200).json({ dispatches })
    } catch (error) {
      next(error)
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = validateOrThrow(VehicularDispatchParamsSchema.safeParse(req.params))
      const dispatch = await vehicularDispatchReportService.getById(id)
      res.status(200).json({ dispatch })
    } catch (error) {
      next(error)
    }
  },

  async review(req: Request, res: Response, next: NextFunction) {
    try {
      let requestedAction = req.params["action"]
      if (requestedAction === "authenticate") {
        requestedAction = "validate"
      }
      const { id, action } = validateOrThrow(VehicularDispatchReviewParamsSchema.safeParse({
        ...req.params,
        action: requestedAction,
      }))
      const { pin, rejected_reason } = validateOrThrow(VehicularDispatchReviewSchema.safeParse(req.body))
      const dispatch = await vehicularDispatchReportService.review(id, req.user!, pin, action, rejected_reason)
      res.status(200).json({ dispatch })
    } catch (error) {
      next(error)
    }
  },

  async getOptions(_req: Request, res: Response, next: NextFunction) {
    try {
      const options = await vehicularDispatchReportService.getOptions()
      res.status(200).json(options)
    } catch (error) {
      next(error)
    }
  },

  async getLatest(_req: Request, res: Response, next: NextFunction) {
    try {
      const report = await vehicularDispatchReportService.getLatest()
      res.status(200).json({ report })
    } catch (error) {
      next(error)
    }
  },

  async submit(req: Request, res: Response, next: NextFunction) {
    try {
      const pinResult = VerifyPinSchema.safeParse({ pin: req.body.pinNumber })
      if (!pinResult.success) {
        throw new ValidationError("Enter your four-digit report PIN.", {
          pinNumber: ["Enter your four-digit report PIN."],
        })
      }
      const pinUsage = await pinService.verifyReportFormPin(pinResult.data)

      const parsedForm = VehicularDispatchReportSchema.safeParse(parseFormData(req.body.formData))
      if (!parsedForm.success) {
        const fields: Record<string, string[]> = {}
        for (const issue of parsedForm.error.issues) {
          const field = issue.path.join(".") || "formData"
          fields[field] = [...(fields[field] ?? []), issue.message]
        }
        throw new ValidationError("Review the vehicular dispatch fields and try again.", fields)
      }

      const dispatch = await vehicularDispatchReportService.create(parsedForm.data, pinUsage)
      res.locals["activityActorId"] = pinUsage.ownerId
      res.locals["activityActorName"] = pinUsage.ownerName
      res.locals["activityRecordId"] = dispatch.dispatch_id
      res.locals["activityPinType"] = pinUsage.type
      res.locals["activityPinOwnerId"] = pinUsage.ownerId
      res.locals["activityPinOwnerName"] = pinUsage.ownerName
      res.locals["activityPinOwnerRole"] = pinUsage.ownerRole
      res.status(201).json({ dispatch })
    } catch (error) {
      next(error)
    }
  },
}
