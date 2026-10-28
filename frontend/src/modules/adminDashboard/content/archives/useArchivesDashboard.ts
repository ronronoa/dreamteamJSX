import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchArchives, restoreArchiveRecord } from "@/api/archives";
import type { ArchiveRecord } from "@/api/archives";
import { useAuth } from "@/store/useAuth";
import { getPageCount } from "@/utils/pagination";
import { EMPTY_STATS, PAGE_SIZE } from "./archiveConfig";

export function useArchivesDashboard() {
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
  const [selectedRecords, setSelectedRecords] = useState<ArchiveRecord[]>([]);
  const [bulkRestoreOpen, setBulkRestoreOpen] = useState(false);
  const [restoreMessage, setRestoreMessage] = useState("");
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
      const result = await fetchArchives(accessToken, { page, pageSize: PAGE_SIZE, search, sourceType });
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
    void (async () => {
      await Promise.resolve();
      await loadArchives();
    })();
  }, [loadArchives]);

  const pageCount = getPageCount(totalMatching, PAGE_SIZE);
  const allPageRecordsSelected = records.length > 0
    && records.every((record) => selectedRecords.some((selected) => selected.archiveId === record.archiveId));
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
      setSelectedRecords((current) => current.filter((record) => record.archiveId !== restoreTarget.archiveId));
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

  async function handleRestoreSelected() {
    if (!accessToken || selectedRecords.length === 0 || restoring) return;

    setRestoring(true);
    setPageError("");
    setRestoreMessage("");
    try {
      const results = await Promise.allSettled(selectedRecords.map((record) =>
        restoreArchiveRecord(accessToken, record.sourceType, record.sourceId),
      ));
      const failedRecords = selectedRecords.filter((_record, index) => results[index]?.status === "rejected");
      const restoredCount = selectedRecords.length - failedRecords.length;

      setSelectedRecords(failedRecords);
      setBulkRestoreOpen(false);
      setRestoreMessage(`${restoredCount} archived record${restoredCount === 1 ? "" : "s"} restored.`);

      if (page > 1 && restoredCount >= records.length) {
        setPage(page - 1);
      } else {
        await loadArchives();
      }

      if (failedRecords.length > 0) {
        setPageError(`${failedRecords.length} record${failedRecords.length === 1 ? "" : "s"} could not be restored. You can retry the selected records.`);
      }
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not restore the selected records.");
    } finally {
      setRestoring(false);
    }
  }

  function toggleRecordSelection(record: ArchiveRecord) {
    setSelectedRecords((current) => current.some((selected) => selected.archiveId === record.archiveId)
      ? current.filter((selected) => selected.archiveId !== record.archiveId)
      : [...current, record]);
  }

  function toggleSelectAllPage() {
    setSelectedRecords((current) => {
      if (allPageRecordsSelected) {
        return current.filter((selected) => !records.some((record) => record.archiveId === selected.archiveId));
      }

      const selectedIds = new Set(current.map((record) => record.archiveId));
      return [...current, ...records.filter((record) => !selectedIds.has(record.archiveId))];
    });
  }

  function changePage(nextPage: number) {
    setSelectedRecords([]);
    setPage(nextPage);
  }

  function clearSelectedRecords() {
    setSelectedRecords([]);
  }

  function updateSearch(value: string) {
    setSearch(value);
    setSelectedRecords([]);
    setPage(1);
  }

  function updateSourceType(value: string) {
    setSourceType(value);
    setSelectedRecords([]);
    setPage(1);
    setFilterOpen(false);
  }

  return {
    records, totalMatching, stats, page, changePage, search, sourceType,
    filterOpen, setFilterOpen, loading, pageError, restoreTarget, setRestoreTarget,
    selectedRecord, setSelectedRecord, restoring, pageCount, statCards,
    selectedRecords, allPageRecordsSelected, bulkRestoreOpen, setBulkRestoreOpen, restoreMessage,
    handleRestore, handleRestoreSelected, toggleRecordSelection, toggleSelectAllPage,
    clearSelectedRecords, updateSearch, updateSourceType, loadArchives,
  };
}
