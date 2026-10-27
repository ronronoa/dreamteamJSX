import { useCallback, useEffect, useMemo, useState } from "react";
import { archiveActivityLogs, exportActivityLogs, fetchActivityLogs } from "@/api/activityLogs";
import type { ActivityLogRecord } from "@/api/activityLogs";
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
      const result = await fetchActivityLogs(accessToken, page, PAGE_SIZE);
      setLogs(result.logs);
      setStats(result.stats);
    } catch (error) {
      if (showLoading) {
        setPageError(error instanceof Error ? error.message : "Could not load activity logs.");
      }
    } finally {
      if (showLoading) setLoading(false);
    }
  }, [accessToken, page]);

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

  const pageCount = useMemo(() => getPageCount(stats.totalCount, PAGE_SIZE), [stats.totalCount]);
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

  return {
    logs, stats, page, setPage, loading, busy, pageError, successMessage,
    archiveModalOpen, setArchiveModalOpen, selectedLog, setSelectedLog,
    pageCount, statCards, handleArchive, handleExport, loadLogs,
  };
}
