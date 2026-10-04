type StatusVariant =
  | "pending"
  | "dispatched"
  | "completed"
  | "emergency"
  | "non-emergency"
  | "available"
  | "lowStock"
  | "expired"
  | "active"
  | "inactive"
  | "success"
  | "failed"
  | "warning"
  | "approved"
  | "rejected"
  | "archived"
  | "draft";

const styles: Record<StatusVariant, string> = {
  pending:         "bg-amber-100 text-amber-800",
  dispatched:      "bg-blue-100 text-blue-800",
  completed:       "bg-emerald-100 text-emerald-800",
  emergency:       "bg-red-100 text-red-800",
  "non-emergency": "bg-gray-100 text-gray-700",
  available:       "bg-emerald-100 text-emerald-800",
  lowStock:        "bg-red-100 text-red-800",
  expired:         "bg-red-100 text-red-800",
  active:          "bg-emerald-100 text-emerald-800",
  inactive:        "bg-gray-100 text-gray-700",
  success:         "bg-emerald-100 text-emerald-800",
  failed:          "bg-red-100 text-red-800",
  warning:         "bg-amber-100 text-amber-800",
  approved:        "bg-emerald-100 text-emerald-800",
  rejected:        "bg-red-100 text-red-800",
  archived:        "bg-gray-100 text-gray-600",
  draft:           "bg-slate-100 text-slate-700",
};

const labels: Record<StatusVariant, string> = {
  pending:         "Pending",
  dispatched:      "Dispatched",
  completed:       "Completed",
  emergency:       "Emergency",
  "non-emergency": "Non-Emergency",
  available:       "Available",
  lowStock:        "Low Stock",
  expired:         "Expired",
  active:          "Active",
  inactive:        "Inactive",
  success:         "Success",
  failed:          "Failed",
  warning:         "Warning",
  approved:        "Approved",
  rejected:        "Rejected",
  archived:        "Archived",
  draft:           "Draft",
};

export default function TableStatus({ variant }: { variant: StatusVariant }) {
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${styles[variant]}`}>
      {labels[variant]}
    </span>
  );
}


