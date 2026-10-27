import Detail from "../component/Detail";
import { Download, Eye } from "lucide-react";
import DataTable from "@/components/common/DataTable";
import Modal from "@/components/common/modals/Modal";
import AreYouSureModal from "@/components/common/modals/AreYouSure";
import CommonButton from "@/components/common/widgets/CommonButton";
import RefreshButton from "@/components/common/widgets/RefreshButton";
import StatCard from "../component/StatCard";
import TwoLineCell from "../component/TwoLineCell";
import TableStatus from "../component/TableStatus";
import TablePagination from "../component/TablePagination";
import DateCell from "../component/DateCell";
import { formatDateTime } from "@/utils/dateTime";

import { ROLE_LABELS, STATUS_VARIANTS } from "./activityLogs/activityLogConfig";
import { useActivityLogsDashboard } from "./activityLogs/useActivityLogsDashboard";

export default function ActivityLogs() {
  const {
    logs, stats, page, setPage, loading, busy, pageError, successMessage,
    archiveModalOpen, setArchiveModalOpen, selectedLog, setSelectedLog,
    pageCount, statCards, handleArchive, handleExport, loadLogs,
  } = useActivityLogsDashboard();

  function getPinUsageLabel(log: (typeof logs)[number]) {
    if (!log.pinType) return "—";
    if (log.pinType === "GLOBAL") return "Global PIN";

    const pinRole = log.pinType === "USER"
      ? ROLE_LABELS[log.pinOwnerRole ?? ""] ?? "User"
      : ROLE_LABELS[log.pinType] ?? log.pinType.replaceAll("_", " ");
    const ownerName = log.pinOwnerName ?? log.pinOwnerId;
    return ownerName ? `${pinRole} PIN · ${ownerName}` : `${pinRole} PIN`;
  }

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
              <Detail label="PIN used" value={getPinUsageLabel(selectedLog)} />
              <Detail label="Date" value={formatDateTime(selectedLog.date)} />
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
              <RefreshButton label="Refresh activity logs" loading={loading} onRefresh={() => loadLogs()} />
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
                { label: "PIN used", render: (row) => getPinUsageLabel(row) },
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
