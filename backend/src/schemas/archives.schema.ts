import { z } from "zod";

export const ArchiveQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().max(100).default(""),
  sourceType: z.enum(["all", "operation", "patient", "vehicle", "inventory", "activity"]).default("all"),
});

export const ArchiveRestoreParamsSchema = z.object({
  type: z.enum(["operation", "patient", "vehicle", "inventory", "activity"]),
  id: z.uuid(),
});
