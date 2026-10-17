import type { OperationStatus } from "@/api/operations";
import TableStatus from "../../component/TableStatus";

const STATUS_VARIANTS: Record<OperationStatus, "pending" | "warning" | "approved" | "rejected" | "archived"> = {
  PENDING: "pending",
  TO_REVIEW: "warning",
  VALIDATED: "approved",
  REJECTED: "rejected",
  ARCHIVED: "archived",
};

export default function OperationStatusBadge({ status }: { status: OperationStatus }) {
  return <TableStatus variant={STATUS_VARIANTS[status]} />;
}
