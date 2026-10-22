import { z } from "zod"

export const VehicularDispatchParamsSchema = z.object({ id: z.uuid() })
export const VehicularDispatchReviewParamsSchema = VehicularDispatchParamsSchema.extend({
  action: z.enum(["authorize", "validate", "reject"]),
})
export const VehicularDispatchReviewSchema = z.object({
  pin: z.string().regex(/^\d{4,6}$/, "PIN must be 4-6 digits."),
  rejected_reason: z.string().trim().min(1, "A rejection reason is required.").max(1000).optional(),
})
