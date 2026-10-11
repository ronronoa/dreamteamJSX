import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronRight, Filter, RotateCcw } from "lucide-react";
import { fetchArchives, restoreArchiveRecord, type ArchiveRecord } from "@/api/archives";
import { useAuth } from "@/context/AuthContext";
import DataTable from "@/components/common/DataTable";
import Modal from "@/components/common/modals/Modal";
import AreYouSureModal from "@/components/common/modals/AreYouSure";
import CommonButton from "@/components/common/widgets/CommonButton";
import TableSearch from "../component/TableSearch";
import TablePagination from "../component/TablePagination";
import DateCell from "../component/DateCell";
import StatCard from "../component/StatCard";

const PAGE_SIZE = 10;
const EMPTY_STATS = {
  totalCount: 0,
  operationCount: 0,
  patientCount: 0,
  vehicleCount: 0,
  inventoryCount: 0,
  activityCount: 0,
};
const ARCHIVE_FILTERS = [
  { value: "all", label: "All record types" },
  { value: "operation", label: "Operation logs" },
  { value: "patient", label: "Patient logs" },
  { value: "vehicle", label: "Vehicle logs" },
  { value: "inventory", label: "Inventory items" },
  { value: "activity", label: "Activity logs" },
];

export default function Archives() {
  const { session } = useAuth();
  const accessToken = session?.accessToken;
  const [records, setRecords] = useState<ArchiveRecord[]>([]);
  const [totalMatching, setTotalMatching] = useState(0);
  const [stats, setStats] = useState(EMPTY_STATS);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sourceType, setSourceType] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [restoreTarget, setRestoreTarget] = useState<ArchiveRecord | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<ArchiveRecord | null>(null);
  const [restoring, setRestoring] = useState(false);

  const loadArchives = useCallback(async () => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setPageError("");
    try {
      const result = await fetchArchives(accessToken, {
        page,
        pageSize: PAGE_SIZE,
        search,
        sourceType,
      });
      setRecords(result.records);
      setTotalMatching(result.totalMatching);
      setStats(result.stats);
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not load archived records.");
    } finally {
      setLoading(false);
    }
  }, [accessToken, page, search, sourceType]);

  useEffect(() => {
    void loadArchives();
  }, [loadArchives]);

  const pageCount = Math.max(1, Math.ceil(totalMatching / PAGE_SIZE));
  const statCards = useMemo(() => [
    { label: "Archived records", value: stats.totalCount.toLocaleString(), sub: "Total archived entries", variant: "primary" as const },
    { label: "Operation Log", value: stats.operationCount.toLocaleString(), sub: "Archived operations" },
    { label: "Patient Log", value: stats.patientCount.toLocaleString(), sub: "Archived patient records" },
    { label: "Vehicle Log", value: stats.vehicleCount.toLocaleString(), sub: "Archived dispatches" },
    { label: "Inventory", value: stats.inventoryCount.toLocaleString(), sub: "Archived items" },
    { label: "Activity Logs", value: stats.activityCount.toLocaleString(), sub: "Archived audit entries" },
  ], [stats]);

  async function handleRestore() {
    if (!accessToken || !restoreTarget || restoring) return;

    setRestoring(true);
    setPageError("");
    try {
      await restoreArchiveRecord(accessToken, restoreTarget.sourceType, restoreTarget.sourceId);
      setRestoreTarget(null);
      if (page > 1 && records.length === 1) {
        setPage(page - 1);
      } else {
        await loadArchives();
      }
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not restore this record.");
    } finally {
      setRestoring(false);
    }
  }

  function updateSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function updateSourceType(value: string) {
    setSourceType(value);
    setPage(1);
    setFilterOpen(false);
  }

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
              <Detail label="Archived date" value={selectedRecord.archivedDate.toLocaleString()} />
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
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <DataTable
              rows={records}
              loading={loading}
              rowKey={(record) => record.archiveId}
              emptyMessage="No archived records match your search."
              columns={[
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
