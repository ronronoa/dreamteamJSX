import Detail from "../component/Detail";
import { Download, Eye, Search } from "lucide-react";
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
    pageCount, totalMatchingCount, search, moduleFilter, roleFilter, statusFilter, fromDate, toDate,
    updateSearch, updateModuleFilter, updateRoleFilter, updateStatusFilter, updateFromDate, updateToDate,
    statCards, handleArchive, handleExport, loadLogs,
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
              <span className="text-xs text-gray-600/60">Latest activity first · {totalMatchingCount.toLocaleString()} matching records</span>
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
            <div className="grid grid-cols-1 gap-3 border-b border-gray-100 bg-gray-50 p-3 sm:grid-cols-2 xl:grid-cols-7">
              <label className="sm:col-span-2">
                <span className="mb-1 block text-[11px] font-semibold text-gray-600">Search activity</span>
                <span className="flex h-9 items-center gap-2 rounded-md border border-gray-200 bg-white px-3 focus-within:border-purple-400">
                  <Search size={14} className="shrink-0 text-gray-400" />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => updateSearch(event.target.value)}
                    placeholder="User, action, record ID, details…"
                    className="w-full bg-transparent text-xs text-gray-700 outline-none placeholder:text-gray-400"
                  />
                </span>
              </label>

              <label>
                <span className="mb-1 block text-[11px] font-semibold text-gray-600">Module</span>
                <select value={moduleFilter} onChange={(event) => updateModuleFilter(event.target.value)} className="h-9 w-full rounded-md border border-gray-200 bg-white px-2 text-xs text-gray-700 outline-none focus:border-purple-400">
                  <option value="">All modules</option>
                  {["Authentication", "Users", "Operations", "Patients", "Dispatch", "Inventory", "System"].map((module) => <option key={module} value={module}>{module}</option>)}
                </select>
              </label>

              <label>
                <span className="mb-1 block text-[11px] font-semibold text-gray-600">Role</span>
                <select value={roleFilter} onChange={(event) => updateRoleFilter(event.target.value)} className="h-9 w-full rounded-md border border-gray-200 bg-white px-2 text-xs text-gray-700 outline-none focus:border-purple-400">
                  <option value="">All roles</option>
                  {["SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY", "TEAM_LEADER", "MEMBER", "Unknown"].map((role) => <option key={role} value={role}>{ROLE_LABELS[role] ?? role}</option>)}
                </select>
              </label>

              <label>
                <span className="mb-1 block text-[11px] font-semibold text-gray-600">Status</span>
                <select value={statusFilter} onChange={(event) => updateStatusFilter(event.target.value as typeof statusFilter)} className="h-9 w-full rounded-md border border-gray-200 bg-white px-2 text-xs text-gray-700 outline-none focus:border-purple-400">
                  <option value="">All statuses</option>
                  <option value="Success">Success</option>
                  <option value="Warning">Warning</option>
                  <option value="Failed">Failed</option>
                </select>
              </label>

              <label>
                <span className="mb-1 block text-[11px] font-semibold text-gray-600">From date</span>
                <input type="date" value={fromDate} max={toDate || undefined} onChange={(event) => updateFromDate(event.target.value)} className="h-9 w-full rounded-md border border-gray-200 bg-white px-2 text-xs text-gray-700 outline-none focus:border-purple-400" />
              </label>

              <label>
                <span className="mb-1 block text-[11px] font-semibold text-gray-600">To date</span>
                <input type="date" value={toDate} min={fromDate || undefined} onChange={(event) => updateToDate(event.target.value)} className="h-9 w-full rounded-md border border-gray-200 bg-white px-2 text-xs text-gray-700 outline-none focus:border-purple-400" />
              </label>
            </div>

            <DataTable
              rows={logs}
              loading={loading}
              rowKey={(row) => row.id}
              emptyMessage={totalMatchingCount === 0 ? "No activity matches these filters." : "No activity has been recorded yet."}
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
