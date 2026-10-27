import { useCallback, useEffect, useMemo, useState } from "react";
import { archiveActivityLogs, exportActivityLogs, fetchActivityLogs } from "@/api/activityLogs";
import type { ActivityLogFilters, ActivityLogRecord } from "@/api/activityLogs";
import { useAuth } from "@/store/useAuth";
import { formatDate } from "@/utils/dateTime";
import { getPageCount } from "@/utils/pagination";
import { EMPTY_STATS, PAGE_SIZE } from "./activityLogConfig";

const ACTIVITY_STATS_POLL_INTERVAL_MS = 60_000;

export function useActivityLogsDashboard() {
  const { session } = useAuth();
  const accessToken = session?.accessToken;
  const [logs, setLogs] = useState<ActivityLogRecord[]>([]);
  const [stats, setStats] = useState(EMPTY_STATS);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<ActivityLogFilters["status"] | "">("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [totalMatchingCount, setTotalMatchingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [pageError, setPageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<ActivityLogRecord | null>(null);

  const loadLogs = useCallback(async (showLoading = true) => {
    if (!accessToken) {
      if (showLoading) setLoading(false);
      return;
    }
    if (showLoading) {
      setLoading(true);
      setPageError("");
    }
    try {
      const result = await fetchActivityLogs(accessToken, page, PAGE_SIZE, {
        search,
        module: moduleFilter,
        role: roleFilter,
        status: statusFilter || undefined,
        from: fromDate,
        to: toDate,
      });
      setLogs(result.logs);
      setStats(result.stats);
      setTotalMatchingCount(result.totalMatchingCount);
    } catch (error) {
      if (showLoading) {
        setPageError(error instanceof Error ? error.message : "Could not load activity logs.");
      }
    } finally {
      if (showLoading) setLoading(false);
    }
  }, [accessToken, page, search, moduleFilter, roleFilter, statusFilter, fromDate, toDate]);

  useEffect(() => {
    void (async () => {
      await Promise.resolve();
      await loadLogs();
    })();
  }, [loadLogs]);

  useEffect(() => {
    const pollingInterval = window.setInterval(() => {
      void loadLogs(false);
    }, ACTIVITY_STATS_POLL_INTERVAL_MS);

    return () => window.clearInterval(pollingInterval);
  }, [loadLogs]);

  const pageCount = useMemo(() => getPageCount(totalMatchingCount, PAGE_SIZE), [totalMatchingCount]);
  const statCards = [
    { label: "Total Activities", value: stats.totalCount.toLocaleString(), sub: "All recorded system actions" },
    { label: "Today's Activities", value: stats.todayCount.toLocaleString(), sub: formatDate(new Date(), "dddd, D MMM YYYY") },
    {
      label: "Active Users",
      value: `${stats.currentActiveCount.toLocaleString()}/${stats.loggedInTodayCount.toLocaleString()}`,
      sub: "Active now / logged in today · active within 30 minutes",
    },
    { label: "Security / Important Actions", value: stats.importantActionCount.toLocaleString(), sub: "User and authentication actions today" },
  ];

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
      downloadLink.download = `activity-ledger-${formatDate(new Date(), "YYYY-MM-DD")}.csv`;
      downloadLink.click();
      URL.revokeObjectURL(fileUrl);
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not export the activity log.");
    } finally {
      setBusy(false);
    }
  }

  function updateFilter<T>(setter: (value: T) => void, value: T) {
    setPage(1);
    setter(value);
  }

  return {
    logs, stats, page, setPage, loading, busy, pageError, successMessage,
    archiveModalOpen, setArchiveModalOpen, selectedLog, setSelectedLog,
    pageCount, totalMatchingCount, search, moduleFilter, roleFilter, statusFilter, fromDate, toDate,
    updateSearch: (value: string) => updateFilter(setSearch, value),
    updateModuleFilter: (value: string) => updateFilter(setModuleFilter, value),
    updateRoleFilter: (value: string) => updateFilter(setRoleFilter, value),
    updateStatusFilter: (value: ActivityLogFilters["status"] | "") => updateFilter(setStatusFilter, value),
    updateFromDate: (value: string) => updateFilter(setFromDate, value),
    updateToDate: (value: string) => updateFilter(setToDate, value),
    statCards, handleArchive, handleExport, loadLogs,
  };
}
