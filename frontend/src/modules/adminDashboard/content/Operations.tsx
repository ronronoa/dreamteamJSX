import { Check, ChevronRight, Filter, Printer, X } from "lucide-react";

import OperationDetails from "./operations/OperationDetails";
import OperationStatusBadge from "./operations/OperationStatusBadge";
import { OPERATION_PAGE_SIZE, type OperationRow } from "./operations/operationUtils";
import { useOperationsDashboard } from "./operations/useOperationsDashboard";
import { getPageCount } from "@/utils/pagination";
import DataTable from "@/components/common/DataTable";
import Modal from "@/components/common/modals/Modal";
import AreYouSureModal from "@/components/common/modals/AreYouSure";
import CommonButton from "@/components/common/widgets/CommonButton";
import PinModal from "@/modules/reportForms/modal/PinModal";
import StatCard from "../component/StatCard";
import DateCell from "../component/DateCell";
import TableSearch from "../component/TableSearch";
import TablePagination from "../component/TablePagination";

const STATUS_FILTERS = [
  { value: "all", label: "All statuses" },
  { value: "PENDING", label: "Pending" },
  { value: "TO_REVIEW", label: "To review" },
  { value: "VALIDATED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

export default function Operations() {
  const {
    loading,
    busy,
    pageError,
    successMessage,
    search,
    statusFilter,
    filterOpen,
    pendingPage,
    reviewedPage,
    selectedIds,
    selectedRecord,
    reviewTarget,
    pinError,
    pdfConfirmationOpen,
    archiveConfirmationOpen,
    stats,
    pendingRows,
    reviewedRows,
    selectedRows,
    visiblePendingRows,
    visibleReviewedRows,
    canReview,
    canReject,
    canArchive,
    setFilterOpen,
    setPendingPage,
    setReviewedPage,
    setSelectedIds,
    setSelectedRecord,
    setReviewTarget,
    setPinError,
    setPdfConfirmationOpen,
    setArchiveConfirmationOpen,
    updateSearch,
    updateStatusFilter,
    openReview,
    handleReview,
    toggleSelection,
    printSelectedRecords,
    archiveSelectedRecords,
  } = useOperationsDashboard();

  const pendingCountLabel = pendingRows.length === 1 ? "1 request" : `${pendingRows.length} requests`;
  const reviewedCountLabel = reviewedRows.length === 1 ? "1 record" : `${reviewedRows.length} records`;

  return (
    <>
      <PinModal
        title={reviewTarget?.action === "reject" ? "Reject operation report" : "Review operation report"}
        open={reviewTarget !== null}
        onClose={() => { setReviewTarget(null); setPinError(""); }}
        onSubmit={(pin) => { void handleReview(pin); }}
        requireRejectionReason={reviewTarget?.action === "reject"}
        onSubmitReview={(pin, reason) => { void handleReview(pin, reason); }}
        loading={busy}
        error={pinError}
      />
      <AreYouSureModal
        open={pdfConfirmationOpen}
        onClose={() => setPdfConfirmationOpen(false)}
        onConfirm={printSelectedRecords}
        title="Create PDF for selected records?"
        description={`${selectedRows.length} operation record${selectedRows.length === 1 ? "" : "s"} will be included in the PDF.`}
        confirmLabel="Confirm"
      />
      <AreYouSureModal
        open={archiveConfirmationOpen}
        onClose={() => setArchiveConfirmationOpen(false)}
        onConfirm={archiveSelectedRecords}
        title="Archive selected operation records?"
        description={`${selectedRows.length} operation record${selectedRows.length === 1 ? "" : "s"} will be moved to Archives.`}
        confirmLabel={busy ? "Archiving..." : "Archive"}
        variant="danger"
      />
      <Modal large open={selectedRecord !== null} onClose={() => setSelectedRecord(null)} className="max-w-5xl">
        {selectedRecord && <OperationDetails record={selectedRecord} onClose={() => setSelectedRecord(null)} />}
      </Modal>

      <div className="space-y-7">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
        </div>

        {pageError && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{pageError}</p>}
        {successMessage && <p role="status" className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{successMessage}</p>}

        <section>
          <div className="mb-3 flex items-center gap-3">
            <h2 className="text-sm font-bold text-gray-900">Pending Approval Requests</h2>
            <span className="rounded-full bg-pink-100 px-2.5 py-0.5 text-[10px] font-semibold text-pink-700">{pendingCountLabel}</span>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <DataTable
              rows={visiblePendingRows}
              loading={loading}
              rowKey={(row) => row.operationId}
              emptyMessage="No operation reports are waiting for review."
              columns={[
                { label: "Request ID", accessor: "id" },
                { label: "Date", render: (row) => <DateCell date={row.date} /> },
                { label: "Caller", accessor: "caller" },
                { label: "Incident", accessor: "incident" },
                { label: "Location", accessor: "location" },
                { label: "Team", accessor: "team" },
                { label: "Submitted by", accessor: "submittedBy" },
                { label: "Status", render: (row) => <OperationStatusBadge status={row.status} /> },
                {
                  label: "Actions",
                  align: "right",
                  render: (row) => (
                    <div className="flex items-center justify-end gap-4">
                      <button type="button" aria-label={`View ${row.id}`} title="View report" onClick={() => setSelectedRecord(row.record)} className="text-gray-400 hover:text-gray-700">
                        <ChevronRight size={16} />
                      </button>
                      {canReview && (
                        <button
                          type="button"
                          aria-label={`Approve ${row.id}`}
                          title="Approve report"
                          onClick={() => openReview(row, "approve")}
                          className="text-emerald-600 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Check size={16} strokeWidth={2.5} />
                        </button>
                      )}
                      {canReject && (
                        <button type="button" aria-label={`Reject ${row.id}`} title="Reject report" onClick={() => openReview(row, "reject")} className="text-red-500 hover:text-red-600">
                          <X size={16} strokeWidth={2.5} />
                        </button>
                      )}
                    </div>
                  ),
                },
              ]}
            />
                {pendingRows.length > OPERATION_PAGE_SIZE && (
              <div className="flex justify-end border-t border-gray-100 px-4 py-3">
                <TablePagination currentPage={pendingPage} pageCount={getPageCount(pendingRows.length, OPERATION_PAGE_SIZE)} onPageChange={setPendingPage} />
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-gray-900">Reviewed Operation Records</h2>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">{reviewedCountLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              <TableSearch value={search} onChange={updateSearch} placeholder="Search operation records" ariaLabel="Search operation records" />
              <div className="relative">
                <button type="button" aria-label="Filter operation records" aria-expanded={filterOpen} onClick={() => setFilterOpen((open) => !open)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">
                  <Filter size={14} />
                </button>
                {filterOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-44 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                    <label htmlFor="operation-status-filter" className="mb-1 block px-1 text-xs font-semibold text-gray-600">Status</label>
                    <select id="operation-status-filter" value={statusFilter} onChange={(event) => updateStatusFilter(event.target.value)} className="w-full rounded-md border border-gray-200 bg-white px-2 py-2 text-xs text-gray-700 outline-none focus:border-purple-400">
                      {STATUS_FILTERS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <DataTable
              rows={visibleReviewedRows}
              loading={loading}
              rowKey={(row) => row.operationId}
              emptyMessage="No reviewed operation records match your search or filter."
              columns={[
                {
                  label: "Select",
                  align: "center" as const,
                  render: (row: OperationRow) => (
                    <input type="checkbox" aria-label={`Select ${row.id} for PDF`} checked={selectedIds.includes(row.operationId)} onChange={() => toggleSelection(row.operationId)} className="h-4 w-4 rounded border-gray-300 accent-purple-700" />
                  ),
                },
                { label: "Request ID", accessor: "id" as const },
                { label: "Date", render: (row: OperationRow) => <DateCell date={row.date} /> },
                { label: "Caller", accessor: "caller" as const },
                { label: "Incident", accessor: "incident" as const },
                { label: "Location", accessor: "location" as const },
                { label: "Team", accessor: "team" as const },
                { label: "Submitted by", accessor: "submittedBy" as const },
                { label: "Status", render: (row: OperationRow) => <OperationStatusBadge status={row.status} /> },
                {
                  label: "Actions",
                  align: "right",
                  render: (row: OperationRow) => (
                    <button type="button" aria-label={`View ${row.id}`} title="View report" onClick={() => setSelectedRecord(row.record)} className="text-gray-400 hover:text-gray-700">
                      <ChevronRight size={16} />
                    </button>
                  ),
                },
              ]}
            />
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-4 py-3">
              <TablePagination currentPage={reviewedPage} pageCount={getPageCount(reviewedRows.length, OPERATION_PAGE_SIZE)} onPageChange={setReviewedPage} />
              <div className="flex items-center gap-2">
                {canArchive && (
                  <CommonButton compact variant="gray" disabled={busy || selectedRows.length === 0} onClick={() => setArchiveConfirmationOpen(true)}>
                    Archive
                  </CommonButton>
                )}
                <CommonButton compact variant="gray" disabled={busy || selectedIds.length === 0} onClick={() => setSelectedIds([])}>
                  Cancel
                </CommonButton>
                <CommonButton compact variant="orange" disabled={loading || busy || selectedRows.length === 0} onClick={() => setPdfConfirmationOpen(true)}>
                  <Printer size={13} /> Print PDF
                </CommonButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
