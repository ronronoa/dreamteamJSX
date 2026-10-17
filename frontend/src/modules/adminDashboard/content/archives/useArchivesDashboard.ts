import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchArchives, restoreArchiveRecord } from "@/api/archives";
import type { ArchiveRecord } from "@/api/archives";
import { useAuth } from "@/context/AuthContext";
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

  return {
    records, totalMatching, stats, page, setPage, search, sourceType,
    filterOpen, setFilterOpen, loading, pageError, restoreTarget, setRestoreTarget,
    selectedRecord, setSelectedRecord, restoring, pageCount, statCards,
    handleRestore, updateSearch, updateSourceType,
  };
}
