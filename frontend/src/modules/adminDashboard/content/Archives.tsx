import Detail from "../component/Detail";
import { ChevronRight, Filter, RotateCcw } from "lucide-react";
import DataTable from "@/components/common/DataTable";
import Modal from "@/components/common/modals/Modal";
import AreYouSureModal from "@/components/common/modals/AreYouSure";
import CommonButton from "@/components/common/widgets/CommonButton";
import RefreshButton from "@/components/common/widgets/RefreshButton";
import TableSearch from "../component/TableSearch";
import TablePagination from "../component/TablePagination";
import DateCell from "../component/DateCell";
import StatCard from "../component/StatCard";
import { formatDateTime } from "@/utils/dateTime";
import { ARCHIVE_FILTERS } from "./archives/archiveConfig";
import { useArchivesDashboard } from "./archives/useArchivesDashboard";

export default function Archives() {
  const {
    records, totalMatching, page, search, sourceType, filterOpen,
    setFilterOpen, loading, pageError, restoreTarget, setRestoreTarget,
    selectedRecord, setSelectedRecord, restoring, pageCount, statCards,
    selectedRecords, allPageRecordsSelected, bulkRestoreOpen, setBulkRestoreOpen, restoreMessage,
    handleRestore, handleRestoreSelected, toggleRecordSelection, toggleSelectAllPage,
    clearSelectedRecords, updateSearch, updateSourceType, loadArchives, changePage,
  } = useArchivesDashboard();

  return (
    <>
      <AreYouSureModal
        open={restoreTarget !== null}
        onClose={() => setRestoreTarget(null)}
        onConfirm={handleRestore}
        title="Restore archived record?"
        description={restoreTarget
          ? `“${restoreTarget.record}” will be returned to its active records.`
          : "This record will be returned to the active records."}
        confirmLabel={restoring ? "Restoring…" : "Restore record"}
      />
      <AreYouSureModal
        open={bulkRestoreOpen}
        onClose={() => setBulkRestoreOpen(false)}
        onConfirm={handleRestoreSelected}
        title={`Restore ${selectedRecords.length} selected records?`}
        description="The selected archived records will be returned to their active records."
        confirmLabel={restoring ? "Restoring…" : "Restore selected"}
      />

      <Modal open={selectedRecord !== null} onClose={() => setSelectedRecord(null)}>
        {selectedRecord && (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-700">Archived {selectedRecord.type}</p>
              <h2 className="mt-1 text-lg font-bold text-gray-900">{selectedRecord.record}</h2>
            </div>
            <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <Detail label="Record ID" value={selectedRecord.id} />
              <Detail label="Archived by" value={selectedRecord.archivedBy} />
              <Detail label="Archived date" value={formatDateTime(selectedRecord.archivedDate)} />
              <Detail label="Details" value={selectedRecord.details || "No additional details."} />
            </dl>
            <div className="flex justify-end border-t border-gray-100 pt-3">
              <CommonButton variant="gray" onClick={() => setSelectedRecord(null)}>Close</CommonButton>
            </div>
          </div>
        )}
      </Modal>

      <div className="space-y-7">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {statCards.map((stat) => <StatCard key={stat.label} {...stat} />)}
        </div>

        {pageError && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{pageError}</p>}
        {restoreMessage && <p role="status" className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{restoreMessage}</p>}

        <section>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-gray-900">Archived Records</h2>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                {totalMatching} records
              </span>
            </div>

            <div className="flex items-center gap-2">
              <TableSearch
                value={search}
                onChange={updateSearch}
                placeholder="Search archives"
                ariaLabel="Search archived records"
              />
              <div className="relative">
                <button
                  type="button"
                  aria-label="Filter archived records"
                  aria-expanded={filterOpen}
                  onClick={() => setFilterOpen((open) => !open)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                >
                  <Filter size={14} />
                </button>
                {filterOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                    <label htmlFor="archive-type-filter" className="mb-1 block px-1 text-xs font-semibold text-gray-600">
                      Record type
                    </label>
                    <select
                      id="archive-type-filter"
                      value={sourceType}
                      onChange={(event) => updateSourceType(event.target.value)}
                      className="w-full rounded-md border border-gray-200 bg-white px-2 py-2 text-xs text-gray-700 outline-none focus:border-purple-400"
                    >
                      {ARCHIVE_FILTERS.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <RefreshButton label="Refresh archived records" loading={loading} onRefresh={loadArchives} />
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <DataTable
              rows={records}
              loading={loading}
              rowKey={(record) => record.archiveId}
              emptyMessage="No archived records match your search."
              columns={[
                {
                  label: "Select",
                  align: "center",
                  renderHeader: () => (
                    <input
                      type="checkbox"
                      aria-label="Select all archived records on this page"
                      checked={allPageRecordsSelected}
                      onChange={toggleSelectAllPage}
                      disabled={records.length === 0 || loading}
                      className="h-4 w-4 rounded border-gray-300 accent-purple-700"
                    />
                  ),
                  render: (record) => (
                    <input
                      type="checkbox"
                      aria-label={`Select archived record ${record.record}`}
                      checked={selectedRecords.some((selected) => selected.archiveId === record.archiveId)}
                      onChange={() => toggleRecordSelection(record)}
                      className="h-4 w-4 rounded border-gray-300 accent-purple-700"
                    />
                  ),
                },
                { label: "Record ID", accessor: "id" },
                { label: "Archived Date", render: (record) => <DateCell date={record.archivedDate} /> },
                { label: "Type", accessor: "type" },
                { label: "Archived By", accessor: "archivedBy" },
                { label: "Record", accessor: "record" },
                {
                  label: "Actions",
                  align: "center",
                  render: (record) => (
                    <div className="flex items-center justify-center gap-5">
                      <button
                        type="button"
                        aria-label={`Restore ${record.record}`}
                        title="Restore record"
                        onClick={() => setRestoreTarget(record)}
                        className="text-gray-400 hover:text-blue-700"
                      >
                        <RotateCcw size={16} className="text-blue-500" />
                      </button>
                      <button
                        type="button"
                        aria-label={`View ${record.record}`}
                        title="View archive details"
                        onClick={() => setSelectedRecord(record)}
                        className="text-gray-400 hover:text-gray-700"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  ),
                },
              ]}
            />

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-4 py-3">
              <TablePagination currentPage={page} pageCount={pageCount} onPageChange={changePage} />
              <div className="flex items-center gap-2">
                {selectedRecords.length > 0 && (
                  <CommonButton compact variant="gray" disabled={restoring} onClick={clearSelectedRecords}>Cancel</CommonButton>
                )}
                <CommonButton
                  compact
                  variant={selectedRecords.length > 0 ? "orange" : "gray"}
                  disabled={restoring || selectedRecords.length === 0}
                  onClick={() => setBulkRestoreOpen(true)}
                >
                  <RotateCcw size={14} /> Restore selected ({selectedRecords.length})
                </CommonButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
