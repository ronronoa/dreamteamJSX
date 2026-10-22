import { archiveRecord, listArchivedRecords, restoreArchivedRecord } from "@/sql/archives";
import type { ArchiveQuery, ArchiveRestoreParams } from "@/types/archives.types";

export const archivesService = {
  list(query: ArchiveQuery) {
    return listArchivedRecords(query);
  },

  restore(params: ArchiveRestoreParams) {
    return restoreArchivedRecord(params);
  },

  archive(params: ArchiveRestoreParams, actorId: string) {
    return archiveRecord(params, actorId);
  },
};
