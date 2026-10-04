type StatusVariant =
| "pending"
| "dispatched"
| "completed"
| "emergency"
| "non-emergency"
| "available"
| "lowStock"
| "expired";

const styles: Record<StatusVariant, string> = {
  pending: "bg-amber-100 text-amber-800",
  dispatched: "bg-blue-100 text-blue-800",
  completed: "bg-emerald-100 text-emerald-800",
  emergency: "bg-red-100 text-red-800",
  "non-emergency": "bg-gray-100 text-gray-700",
  available: "bg-emerald-100 text-emerald-800",
  lowStock:  "bg-red-100 text-red-800",
  expired:   "bg-red-100 text-red-800",
} as const;

const labels: Record<StatusVariant, string> = {
  pending: "Pending",
  dispatched: "Dispatched",
  completed: "Completed",
  emergency: "Emergency",
  "non-emergency": "Non-Emergency",
  available: "Available",
  lowStock:  "Low Stock",
  expired:   "Expired",
} as const;

export default function TableStatus({ variant }: { variant: StatusVariant }) {
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${styles[variant]}`}>
      {labels[variant]}
    </span>
  );
}


