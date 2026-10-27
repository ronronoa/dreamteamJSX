import { ReportPinSchema } from "./pin.schema";
import { z } from "zod";

export const PatientLogParamsSchema = z.object({
  id: z.uuid(),
  action: z.enum(["authorize", "validate", "reject"]).optional(),
});
export const PatientLogReviewParamsSchema = PatientLogParamsSchema.extend({
  action: z.enum(["authorize", "authenticate", "validate", "reject"]),
});
export const PatientLogReviewSchema = z.object({
  pin: ReportPinSchema,
  rejected_reason: z.string().trim().min(1, "A rejection reason is required.").max(1000).optional(),
});
