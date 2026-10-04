export interface ActivityLog {
  id: string;
  date: Date;
  user: string;
  userId: string;
  role: string;
  module: string;
  action: string;
  recordId: string;
  status: "Success" | "Failed" | "Warning";
}
