import type { PatientLogStatus } from "@/api/patients";

const STATUS_LABELS: Record<PatientLogStatus, string> = {
  PENDING: "Pending",
  TO_REVIEW: "To review",
  VALIDATED: "Approved",
  REJECTED: "Rejected",
  ARCHIVED: "Archived",
};

const STATUS_CLASSES: Record<PatientLogStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  TO_REVIEW: "bg-blue-100 text-blue-800",
  VALIDATED: "bg-emerald-100 text-emerald-800",
  REJECTED: "bg-red-100 text-red-800",
  ARCHIVED: "bg-gray-100 text-gray-700",
};

export default function PatientStatusBadge({ status }: { status: PatientLogStatus }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${STATUS_CLASSES[status]}`}>{STATUS_LABELS[status]}</span>;
}
