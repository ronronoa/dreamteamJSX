import { Check, ChevronRight, Filter, Printer, X } from "lucide-react";
import DataTable from "@/components/common/DataTable";
import AreYouSureModal from "@/components/common/modals/AreYouSure";
import Modal from "@/components/common/modals/Modal";
import CommonButton from "@/components/common/widgets/CommonButton";
import PinModal from "@/modules/reportForms/modal/PinModal";
import StatCard from "../component/StatCard";
import DateCell from "../component/DateCell";
import TablePagination from "../component/TablePagination";
import TableSearch from "../component/TableSearch";
import PatientDetails from "./patients/PatientDetails";
import PatientStatusBadge from "./patients/PatientStatusBadge";
import { PATIENT_PAGE_SIZE, type PatientRow } from "./patients/patientUtils";
import { usePatientsDashboard } from "./patients/usePatientsDashboard";

const STATUS_FILTERS = [
  { value: "all", label: "All statuses" },
  { value: "PENDING", label: "Pending" },
  { value: "TO_REVIEW", label: "To review" },
  { value: "VALIDATED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

export default function Patients() {
  const dashboard = usePatientsDashboard();
  const pendingCountLabel = dashboard.pendingRows.length === 1 ? "1 request" : `${dashboard.pendingRows.length} requests`;
  const reviewedCountLabel = dashboard.reviewedRows.length === 1 ? "1 record" : `${dashboard.reviewedRows.length} records`;
  const reviewTitle = dashboard.reviewTarget?.action === "reject"
    ? "Reject patient report"
    : dashboard.reviewTarget?.action === "authorize"
      ? "Send patient report for review"
      : "Approve patient report";

  return (
    <>
      <PinModal
        title={reviewTitle}
        open={dashboard.reviewTarget !== null}
        onClose={() => { dashboard.setReviewTarget(null); dashboard.setPinError(""); }}
        onSubmit={(pin) => { void dashboard.handleReview(pin); }}
        requireRejectionReason={dashboard.reviewTarget?.action === "reject"}
        onSubmitReview={(pin, reason) => { void dashboard.handleReview(pin, reason); }}
        loading={dashboard.busy}
        error={dashboard.pinError}
      />
      <AreYouSureModal
        open={dashboard.pdfConfirmationOpen}
        onClose={() => dashboard.setPdfConfirmationOpen(false)}
        onConfirm={dashboard.printSelectedRecords}
        title="Create PDF for selected records?"
        description={`${dashboard.selectedRows.length} patient record${dashboard.selectedRows.length === 1 ? "" : "s"} will be included in the PDF.`}
        confirmLabel="Confirm"
      />
      <AreYouSureModal
        open={dashboard.archiveConfirmationOpen}
        onClose={() => dashboard.setArchiveConfirmationOpen(false)}
        onConfirm={dashboard.archiveSelectedRecords}
        title="Archive selected patient records?"
        description={`${dashboard.selectedRows.length} patient record${dashboard.selectedRows.length === 1 ? "" : "s"} will be moved to Archives.`}
        confirmLabel={dashboard.busy ? "Archiving..." : "Archive"}
        variant="danger"
      />
      <Modal large open={dashboard.selectedRecord !== null} onClose={() => dashboard.setSelectedRecord(null)} className="max-w-5xl">
        {dashboard.selectedRecord && <PatientDetails record={dashboard.selectedRecord} onClose={() => dashboard.setSelectedRecord(null)} />}
      </Modal>

      <div className="space-y-7">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {dashboard.stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
        </div>

        {dashboard.pageError && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{dashboard.pageError}</p>}
        {dashboard.successMessage && <p role="status" className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{dashboard.successMessage}</p>}

        <section>
          <div className="mb-3 flex items-center gap-3">
            <h2 className="text-sm font-bold text-gray-900">Pending Approval Requests</h2>
            <span className="rounded-full bg-pink-100 px-2.5 py-0.5 text-[10px] font-semibold text-pink-700">{pendingCountLabel}</span>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <DataTable
              rows={dashboard.visiblePendingRows}
              loading={dashboard.loading}
              rowKey={(row) => row.patientLogId}
              emptyMessage="No patient reports are waiting for review."
              columns={[
                { label: "Patient ID", accessor: "id" },
                { label: "Date", render: (row) => <DateCell date={row.date} /> },
                { label: "Name of patient", accessor: "name" },
                { label: "Age", accessor: "age" },
                { label: "Address", accessor: "address" },
                { label: "Assessment", accessor: "assessment" },
                {
                  label: "Waiver Description",
                  render: (row) => <span className="block max-w-56 truncate" title={row.waiverDescription}>{row.waiverDescription}</span>,
                },
                { label: "Submitted by", accessor: "submittedBy" },
                { label: "Status", render: (row) => <PatientStatusBadge status={row.status} /> },
                {
                  label: "Actions",
                  align: "right",
                  render: (row) => (
                    <div className="flex items-center justify-end gap-4">
                      <button type="button" aria-label={`View ${row.id}`} title="View report" onClick={() => dashboard.setSelectedRecord(row.record)} className="text-gray-400 hover:text-gray-700"><ChevronRight size={16} /></button>
                      {dashboard.canReview && (
                        <button
                          type="button"
                          aria-label={`Approve ${row.id}`}
                          title="Approve report"
                          disabled={dashboard.busy}
                          onClick={() => dashboard.openReview(row, "approve")}
                          className="text-emerald-600 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                        ><Check size={16} strokeWidth={2.5} /></button>
                      )}
                      {dashboard.canReject && <button type="button" aria-label={`Reject ${row.id}`} title="Reject report" disabled={dashboard.busy} onClick={() => dashboard.openReview(row, "reject")} className="text-red-500 hover:text-red-600 disabled:opacity-40"><X size={16} strokeWidth={2.5} /></button>}
                    </div>
                  ),
                },
              ]}
            />
            {dashboard.pendingRows.length > PATIENT_PAGE_SIZE && <div className="flex justify-end border-t border-gray-100 px-4 py-3"><TablePagination currentPage={dashboard.pendingPage} pageCount={dashboard.pendingPageCount} onPageChange={dashboard.setPendingPage} /></div>}
          </div>
        </section>

        <section>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-gray-900">Reviewed Patient Records</h2>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">{reviewedCountLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              <TableSearch value={dashboard.search} onChange={dashboard.updateSearch} placeholder="Search patient records" ariaLabel="Search patient records" />
              <div className="relative">
                <button type="button" aria-label="Filter patient records" aria-expanded={dashboard.filterOpen} onClick={() => dashboard.setFilterOpen((open) => !open)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"><Filter size={14} /></button>
                {dashboard.filterOpen && <div className="absolute right-0 z-10 mt-2 w-44 rounded-lg border border-gray-200 bg-white p-2 shadow-lg"><label htmlFor="patient-status-filter" className="mb-1 block px-1 text-xs font-semibold text-gray-600">Status</label><select id="patient-status-filter" value={dashboard.statusFilter} onChange={(event) => dashboard.updateStatusFilter(event.target.value)} className="w-full rounded-md border border-gray-200 bg-white px-2 py-2 text-xs text-gray-700 outline-none focus:border-purple-400">{STATUS_FILTERS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>}
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <DataTable
              rows={dashboard.visibleReviewedRows}
              loading={dashboard.loading}
              rowKey={(row) => row.patientLogId}
              emptyMessage="No reviewed patient records match your search or filter."
              columns={[
                { label: "Select", align: "center", render: (row: PatientRow) => <input type="checkbox" aria-label={`Select ${row.id}`} checked={dashboard.selectedIds.includes(row.patientLogId)} onChange={() => dashboard.toggleSelection(row.patientLogId)} className="h-4 w-4 rounded border-gray-300 accent-purple-700" /> },
                { label: "Patient ID", accessor: "id" },
                { label: "Date", render: (row) => <DateCell date={row.date} /> },
                { label: "Name of patient", accessor: "name" },
                { label: "Age", accessor: "age" },
                { label: "Address", accessor: "address" },
                { label: "Assessment", accessor: "assessment" },
                {
                  label: "Waiver Description",
                  render: (row) => <span className="block max-w-56 truncate" title={row.waiverDescription}>{row.waiverDescription}</span>,
                },
                { label: "Submitted by", accessor: "submittedBy" },
                { label: "Status", render: (row) => <PatientStatusBadge status={row.status} /> },
                { label: "Actions", align: "right", render: (row) => <button type="button" aria-label={`View ${row.id}`} title="View report" onClick={() => dashboard.setSelectedRecord(row.record)} className="text-gray-400 hover:text-gray-700"><ChevronRight size={16} /></button> },
              ]}
            />
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-4 py-3">
              <TablePagination currentPage={dashboard.reviewedPage} pageCount={dashboard.reviewedPageCount} onPageChange={dashboard.setReviewedPage} />
              <div className="flex items-center gap-2">
                {dashboard.canArchive && <CommonButton compact variant="gray" disabled={dashboard.busy || dashboard.selectedRows.length === 0} onClick={() => dashboard.setArchiveConfirmationOpen(true)}>Archive</CommonButton>}
                <CommonButton compact variant="gray" disabled={dashboard.selectedIds.length === 0 || dashboard.busy} onClick={() => dashboard.setSelectedIds([])}>Cancel</CommonButton>
                <CommonButton compact variant="orange" disabled={dashboard.loading || dashboard.busy || dashboard.selectedRows.length === 0} onClick={() => dashboard.setPdfConfirmationOpen(true)}><Printer size={13} /> Print PDF</CommonButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
