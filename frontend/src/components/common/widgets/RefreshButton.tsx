import { RefreshCw } from "lucide-react";

interface RefreshButtonProps {
  label: string;
  loading: boolean;
  onRefresh: () => void | Promise<void>;
}

export default function RefreshButton({ label, loading, onRefresh }: RefreshButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={loading}
      onClick={() => void onRefresh()}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
    </button>
  );
}
