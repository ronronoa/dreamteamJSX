import { z } from "zod";

export const ActivityLogsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().max(200).optional(),
  module: z.string().trim().max(50).optional(),
  role: z.string().trim().max(50).optional(),
  status: z.enum(["Success", "Failed", "Warning"]).optional(),
  from: z.iso.date().optional(),
  to: z.iso.date().optional(),
}).refine((query) => !query.from || !query.to || query.from <= query.to, {
  message: "The start date must be on or before the end date.",
  path: ["from"],
});
