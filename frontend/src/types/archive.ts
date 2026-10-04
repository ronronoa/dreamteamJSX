export interface ArchiveRecord {
  id: string;
  archivedDate: Date;
  type: "Operation Log" | "Patient Log" | "Vehicle Log";
  archivedBy: string;
  record: string;
}
