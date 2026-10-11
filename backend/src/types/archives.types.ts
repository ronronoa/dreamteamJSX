import type { ArchiveQuerySchema, ArchiveRestoreParamsSchema } from "@/schemas/archives.schema";
import type { z } from "zod";

export type ArchiveQuery = z.infer<typeof ArchiveQuerySchema>;
export type ArchiveRestoreParams = z.infer<typeof ArchiveRestoreParamsSchema>;
export type ArchiveSourceType = ArchiveRestoreParams["type"];

export interface ArchiveListRow {
  id: string;
  archiveId: string;
  sourceId: string;
  archivedDate: Date;
  type: string;
  archivedBy: string;
  record: string;
  details: string;
  sourceType: ArchiveSourceType;
}

export interface ArchiveStats {
  totalCount: number;
  operationCount: number;
  patientCount: number;
  vehicleCount: number;
  inventoryCount: number;
  activityCount: number;
}
