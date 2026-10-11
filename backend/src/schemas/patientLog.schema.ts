import { z } from "zod";

export const PatientLogParamsSchema = z.object({
  id: z.uuid(),
  action: z.enum(["authorize", "validate", "reject"]).optional(),
});
export const PatientLogReviewParamsSchema = PatientLogParamsSchema.extend({
  action: z.enum(["authorize", "validate", "reject"]),
});
export const PatientLogReviewSchema = z.object({
  pin: z.string().regex(/^\d{4,6}$/, "PIN must be 4-6 digits."),
});
