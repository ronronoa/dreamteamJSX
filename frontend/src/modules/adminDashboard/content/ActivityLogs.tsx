import { useCallback, useEffect, useMemo, useState } from "react";
import { Download, Eye } from "lucide-react";
import { archiveActivityLogs, exportActivityLogs, fetchActivityLogs } from "@/api/activityLogs";
import type { ActivityLogRecord, ActivityLogStats } from "@/api/activityLogs";
import { useAuth } from "@/context/AuthContext";
import DataTable from "@/components/common/DataTable";
import Modal from "@/components/common/modals/Modal";
import AreYouSureModal from "@/components/common/modals/AreYouSure";
import CommonButton from "@/components/common/widgets/CommonButton";
import StatCard from "../component/StatCard";
import TwoLineCell from "../component/TwoLineCell";
import TableStatus from "../component/TableStatus";
import TablePagination from "../component/TablePagination";
import DateCell from "../component/DateCell";

const PAGE_SIZE = 10;
const EMPTY_STATS: ActivityLogStats = {
  totalCount: 0,
  todayCount: 0,
  activeUserCount: 0,
  importantActionCount: 0,
};
const TODAY_DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "short",
  year: "numeric",
});
const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  DEPARTMENT_HEAD: "Department Head",
  DEPUTY: "Deputy",
  TEAM_LEADER: "Team Leader",
  MEMBER: "Member",
};
const STATUS_VARIANTS = {
  Success: "success",
  Failed: "failed",
  Warning: "warning",
} as const;

function getPageCount(totalCount: number) {
  return Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
}

export default function ActivityLogs() {
  const { session } = useAuth();
  const accessToken = session?.accessToken;
  const [logs, setLogs] = useState<ActivityLogRecord[]>([]);
  const [stats, setStats] = useState(EMPTY_STATS);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [pageError, setPageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<ActivityLogRecord | null>(null);

  const loadLogs = useCallback(async () => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setPageError("");
    try {
      const result = await fetchActivityLogs(accessToken, page, PAGE_SIZE);
      setLogs(result.logs);
      setStats(result.stats);
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not load activity logs.");
    } finally {
      setLoading(false);
    }
  }, [accessToken, page]);

  useEffect(() => {
    void loadLogs();
  }, [loadLogs]);

  const pageCount = useMemo(() => getPageCount(stats.totalCount), [stats.totalCount]);

  async function handleArchive() {
    if (busy) return;
    if (!accessToken) {
      setPageError("Your session expired. Please sign in again.");
      return;
    }

    setBusy(true);
    setPageError("");
    setSuccessMessage("");
    try {
      const result = await archiveActivityLogs(accessToken);
      setSuccessMessage(`${result.archivedCount} activity log${result.archivedCount === 1 ? "" : "s"} archived.`);
      setPage(1);
      setArchiveModalOpen(false);
      if (page === 1) await loadLogs();
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not archive activity logs.");
    } finally {
      setBusy(false);
    }
  }

  async function handleExport() {
    if (busy) return;
    if (!accessToken) {
      setPageError("Your session expired. Please sign in again.");
      return;
    }

    setBusy(true);
    setPageError("");
    try {
      const file = await exportActivityLogs(accessToken);
      const fileUrl = URL.createObjectURL(file);
      const downloadLink = document.createElement("a");
      downloadLink.href = fileUrl;
      downloadLink.download = `activity-ledger-${new Date().toISOString().slice(0, 10)}.csv`;
      downloadLink.click();
      URL.revokeObjectURL(fileUrl);
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not export the activity log.");
    } finally {
      setBusy(false);
    }
  }

  const statCards = [
    { label: "Total Activities", value: stats.totalCount.toLocaleString(), sub: "All recorded system actions" },
    { label: "Today's Activities", value: stats.todayCount.toLocaleString(), sub: TODAY_DATE_FORMAT.format(new Date()) },
    { label: "Active Users", value: stats.activeUserCount.toLocaleString(), sub: "Accounts active today" },
    { label: "Security / Important Actions", value: stats.importantActionCount.toLocaleString(), sub: "User and authentication actions today" },
  ];

  return (
    <>
      <AreYouSureModal
        open={archiveModalOpen}
        onClose={() => setArchiveModalOpen(false)}
        onConfirm={handleArchive}
        title="Archive activity logs?"
        description="All currently active audit entries will be archived and removed from this ledger. Archived entries remain stored in the database."
        confirmLabel={busy ? "Archiving…" : "Archive logs"}
        variant="danger"
      />

      <Modal open={selectedLog !== null} onClose={() => setSelectedLog(null)}>
        {selectedLog && (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-700">Activity details</p>
              <h2 className="mt-1 text-lg font-bold text-gray-900">{selectedLog.action}</h2>
            </div>
            <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <Detail label="Activity ID" value={selectedLog.id} />
              <Detail label="Module" value={selectedLog.module} />
              <Detail
                label="User"
                value={selectedLog.userId === "—" ? selectedLog.user : `${selectedLog.user} (@${selectedLog.userId})`}
              />
              <Detail label="Role" value={ROLE_LABELS[selectedLog.role] ?? selectedLog.role} />
              <Detail label="Record ID" value={selectedLog.recordId ?? "—"} />
              <Detail label="Status" value={selectedLog.status} />
              <Detail label="Date" value={selectedLog.date.toLocaleString()} />
              <Detail label="Request" value={selectedLog.details || "No additional details."} />
            </dl>
            <div className="flex justify-end border-t border-gray-100 pt-3">
              <CommonButton variant="gray" onClick={() => setSelectedLog(null)}>Close</CommonButton>
            </div>
          </div>
        )}
      </Modal>

      <div className="space-y-7">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {statCards.map((stat) => <StatCard key={stat.label} {...stat} />)}
        </div>

        {pageError && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{pageError}</p>}
        {successMessage && <p role="status" className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{successMessage}</p>}

        <section>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col">
              <h2 className="text-sm font-bold text-gray-900">Audit Ledger</h2>
              <span className="text-xs text-gray-600/60">Latest activity first</span>
            </div>

            <div className="flex items-center gap-2">
              <CommonButton compact variant="gray" disabled={busy || stats.totalCount === 0} onClick={() => setArchiveModalOpen(true)}>
                Archive Activity Logs
              </CommonButton>
              <CommonButton compact disabled={busy || stats.totalCount === 0} onClick={() => void handleExport()}>
                <Download size={13} />
                Export Audit Log
              </CommonButton>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <DataTable
              rows={logs}
              loading={loading}
              rowKey={(row) => row.id}
              emptyMessage="No activity has been recorded yet."
              columns={[
                { label: "ID", accessor: "id" },
                { label: "Date", render: (row) => <DateCell date={row.date} /> },
                { label: "User", render: (row) => <TwoLineCell top={row.user} bottom={row.userId === "—" ? row.userId : `@${row.userId}`} /> },
                { label: "Role", render: (row) => ROLE_LABELS[row.role] ?? row.role },
                { label: "Actions", render: (row) => <TwoLineCell top={row.action} bottom={row.module} /> },
                { label: "Record ID", accessor: "recordId" },
                { label: "Status", render: (row) => <TableStatus variant={STATUS_VARIANTS[row.status]} /> },
                {
                  label: "Details",
                  align: "center",
                  render: (row) => (
                    <button
                      type="button"
                      aria-label={`View details for ${row.action}`}
                      onClick={() => setSelectedLog(row)}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <Eye size={16} className="text-purple-700" />
                    </button>
                  ),
                },
              ]}
            />

            <div className="flex items-center justify-center border-t border-gray-100 px-4 py-3">
              <TablePagination currentPage={page} pageCount={pageCount} onPageChange={setPage} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-gray-500">{label}</dt>
      <dd className="break-words text-sm font-medium text-gray-900">{value}</dd>
    </div>
  );
}
