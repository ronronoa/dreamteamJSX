import type { ReportStatus } from "@/api/operations";
import TableStatus from "../../component/TableStatus";

const STATUS_VARIANTS: Record<ReportStatus, "pending" | "approved" | "rejected" | "archived"> = {
  PENDING: "pending",
  VALIDATED: "approved",
  REJECTED: "rejected",
  ARCHIVED: "archived",
};

export default function ReportStatusBadge({ status }: { status: ReportStatus }) {
  return <TableStatus variant={STATUS_VARIANTS[status]} />;
}
