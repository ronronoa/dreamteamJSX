import { apiFetch } from "./apiFetch";

export type ArchiveSourceType = "operation" | "patient" | "vehicle" | "inventory" | "activity";

export interface ArchiveRecord {
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

export interface ArchiveListResult {
  records: ArchiveRecord[];
  totalMatching: number;
  stats: ArchiveStats;
  page: number;
  pageSize: number;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.message ?? `Request failed (${response.status})`);
  }
  return result as T;
}

export async function fetchArchives(
  accessToken: string,
  input: { page: number; pageSize: number; search: string; sourceType: string },
): Promise<ArchiveListResult> {
  const query = new URLSearchParams({
    page: String(input.page),
    pageSize: String(input.pageSize),
    search: input.search,
    sourceType: input.sourceType,
  });
  const response = await apiFetch(`/archives?${query.toString()}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const result = await parseResponse<Omit<ArchiveListResult, "records"> & {
    records: Array<Omit<ArchiveRecord, "archivedDate"> & { archivedDate: string }>;
  }>(response);

  return {
    ...result,
    records: result.records.map((record) => ({
      ...record,
      archivedDate: new Date(record.archivedDate),
    })),
  };
}

export async function restoreArchiveRecord(
  accessToken: string,
  sourceType: ArchiveSourceType,
  sourceId: string,
) {
  const response = await apiFetch(`/archives/${sourceType}/${sourceId}/restore`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return parseResponse<{ restored: boolean }>(response);
}

export async function archiveRecord(
  accessToken: string,
  sourceType: ArchiveSourceType,
  sourceId: string,
) {
  const response = await apiFetch(`/archives/${sourceType}/${sourceId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return parseResponse<{ archived: boolean }>(response);
}
