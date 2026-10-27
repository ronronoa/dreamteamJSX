import { getReportReviewError, getBulkReportReviewError } from "@/utils/reportReviewError";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import {
  archiveOperation,
  fetchOperations,
  rejectOperation,
  validateOperation,
  type OperationRecord,
} from "@/api/operations";
import { useAuth } from "@/store/useAuth";
import { createOperationPdf } from "./operationPdf";
import { getPageCount } from "@/utils/pagination";
import { formatDate } from "@/utils/dateTime";
import {
  getAverageResponseTime,
  getMostFrequent,
  isCurrentMonth,
  OPERATION_PAGE_SIZE,
  toOperationRow,
  type OperationRow,
  type ReviewAction,
} from "./operationUtils";

export function useOperationsDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedRecordId = searchParams.get("reportFormId") ?? searchParams.get("recordId");
  const { session } = useAuth();
  const accessToken = session?.accessToken;
  const role = session?.user.role;
  const [records, setRecords] = useState<OperationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [pageError, setPageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [pendingPage, setPendingPage] = useState(1);
  const [reviewedPage, setReviewedPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<OperationRecord | null>(null);
  const [reviewTarget, setReviewTarget] = useState<{ row: OperationRow; action: ReviewAction } | null>(null);
  const [bulkReviewAction, setBulkReviewAction] = useState<"approve" | "reject" | null>(null);
  const [pinError, setPinError] = useState("");
  const [pdfConfirmationOpen, setPdfConfirmationOpen] = useState(false);
  const [archiveConfirmationOpen, setArchiveConfirmationOpen] = useState(false);

  const loadRecords = useCallback(async () => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setPageError("");
    try {
      setRecords(await fetchOperations(accessToken));
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not load operation records.");
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    void (async () => {
      await Promise.resolve();
      await loadRecords();
    })();
  }, [loadRecords]);

  useEffect(() => {
    if (!requestedRecordId || loading) return;

    const matchingRecord = records.find((record) => record.operation_id === requestedRecordId);
    if (!matchingRecord) return;

    setSelectedRecord(matchingRecord);
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete("recordId");
    nextSearchParams.delete("reportFormId");
    setSearchParams(nextSearchParams, { replace: true });
  }, [loading, records, requestedRecordId, searchParams, setSearchParams]);

  const allRows = useMemo(() => records.map(toOperationRow), [records]);
  const matchingRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return allRows.filter((row) => {
      if (statusFilter !== "all" && row.status !== statusFilter) return false;
      const reportDate = formatDate(row.date, "YYYY-MM-DD");
      if (fromDate && reportDate < fromDate) return false;
      if (toDate && reportDate > toDate) return false;
      if (!term) return true;
      return [row.id, row.caller, row.incident, row.location, row.team, row.submittedBy]
        .some((value) => value.toLowerCase().includes(term));
    });
  }, [allRows, fromDate, search, statusFilter, toDate]);

  const pendingRows = useMemo(
    () => matchingRows.filter((row) => row.status === "PENDING"),
    [matchingRows],
  );
  const reviewedRows = useMemo(
    () => matchingRows.filter((row) => row.status === "VALIDATED" || row.status === "REJECTED"),
    [matchingRows],
  );
  const selectedRows = reviewedRows.filter((row) => selectedIds.includes(row.operationId));
  const pdfSelectedRows = matchingRows.filter((row) => selectedIds.includes(row.operationId));
  const selectedPendingRows = pendingRows.filter((row) => selectedIds.includes(row.operationId));
  const visiblePendingRows = pendingRows.slice((pendingPage - 1) * OPERATION_PAGE_SIZE, pendingPage * OPERATION_PAGE_SIZE);
  const visibleReviewedRows = reviewedRows.slice((reviewedPage - 1) * OPERATION_PAGE_SIZE, reviewedPage * OPERATION_PAGE_SIZE);
  const monthlyRows = allRows.filter((row) => isCurrentMonth(row.date));

  const stats = [
    { label: "Total records", value: allRows.length.toLocaleString(), sub: "Active operation logs", variant: "primary" as const },
    { label: "This month", value: monthlyRows.length.toLocaleString(), sub: "Operation logs submitted this month" },
    { label: "Response average time", value: getAverageResponseTime(records), sub: "Average departure-to-arrival duration" },
    { label: "Most frequent type of operation", value: getMostFrequent(monthlyRows.map((row) => row.incident)), sub: "For this month" },
    { label: "Most frequent area of operation", value: getMostFrequent(monthlyRows.map((row) => row.location)), sub: "For this month" },
  ];

  const canReview = role === "SUPER_ADMIN" || role === "DEPARTMENT_HEAD" || role === "DEPUTY" || role === "TEAM_LEADER";
  const canReject = canReview;
  const canArchive = role === "SUPER_ADMIN" || role === "DEPARTMENT_HEAD";

  function updateSearch(value: string) {
    setSearch(value);
    setPendingPage(1);
    setReviewedPage(1);
    setSelectedIds([]);
  }

  function updateStatusFilter(value: string) {
    setStatusFilter(value);
    setPendingPage(1);
    setReviewedPage(1);
    setSelectedIds([]);
    setFilterOpen(false);
  }

  function resetPagesAndSelection() {
    setPendingPage(1);
    setReviewedPage(1);
    setSelectedIds([]);
  }

  function updateFromDate(value: string) {
    setFromDate(value);
    resetPagesAndSelection();
  }

  function updateToDate(value: string) {
    setToDate(value);
    resetPagesAndSelection();
  }

  function clearDateFilter() {
    setFromDate("");
    setToDate("");
    resetPagesAndSelection();
  }

  function openReview(row: OperationRow, action: ReviewAction) {
    setPinError("");
    setReviewTarget({ row, action });
  }

  function openBulkReview(action: "approve" | "reject") {
    if (selectedPendingRows.length === 0) return;
    setPinError("");
    setBulkReviewAction(action);
  }

  async function handleReview(pin: string, rejectedReason = "") {
    if (!accessToken || (!reviewTarget && !bulkReviewAction) || busy) return;

    setBusy(true);
    setPinError("");
    setPageError("");
    setSuccessMessage("");
    try {
      if (bulkReviewAction) {
        const reviewResults = await Promise.allSettled(selectedPendingRows.map((row) =>
          bulkReviewAction === "reject"
            ? rejectOperation(accessToken, row.operationId, pin, rejectedReason)
            : validateOperation(accessToken, row.operationId, pin),
        ));
        const successfulCount = reviewResults.filter((result) => result.status === "fulfilled").length;
        const failedIds = selectedPendingRows
          .filter((_row, index) => reviewResults[index].status === "rejected")
          .map((row) => row.operationId);
        setSelectedIds(failedIds);
        if (successfulCount > 0) {
          setSuccessMessage(`${successfulCount} operation report${successfulCount === 1 ? " was" : "s were"} ${bulkReviewAction === "reject" ? "rejected" : "approved"}.`);
          await loadRecords();
        }
        if (failedIds.length > 0) {
          setPinError(getBulkReportReviewError(reviewResults));
          return;
        }
        setBulkReviewAction(null);
        return;
      }

      if (!reviewTarget) return;

      if (reviewTarget.action === "reject") {
        await rejectOperation(accessToken, reviewTarget.row.operationId, pin, rejectedReason);
        setSuccessMessage(`${reviewTarget.row.id} was rejected.`);
      } else {
        await validateOperation(accessToken, reviewTarget!.row.operationId, pin);
        setSuccessMessage(`${reviewTarget.row.id} was approved.`);
      }

      setReviewTarget(null);
      setPendingPage(1);
      setReviewedPage(1);
      await loadRecords();
    } catch (error) {
      setPinError(getReportReviewError(error));
    } finally {
      setBusy(false);
    }
  }

  function toggleSelection(operationId: string) {
    setSelectedIds((current) => current.includes(operationId)
      ? current.filter((id) => id !== operationId)
      : [...current, operationId]);
  }

  async function printSelectedRecords() {
    if (pdfSelectedRows.length === 0) return;

    try {
      await createOperationPdf(pdfSelectedRows.map((row) => row.record));
      setPdfConfirmationOpen(false);
      setSelectedIds([]);
      setSuccessMessage(`${pdfSelectedRows.length} operation record${pdfSelectedRows.length === 1 ? "" : "s"} downloaded as PDF.`);
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not create the PDF.");
    }
  }

  async function archiveSelectedRecords() {
    if (!accessToken || selectedRows.length === 0 || busy) return;

    setBusy(true);
    setPageError("");
    setSuccessMessage("");
    try {
      await Promise.all(selectedRows.map((row) => archiveOperation(accessToken, row.operationId)));
      const archivedCount = selectedRows.length;
      setArchiveConfirmationOpen(false);
      setSelectedIds([]);
      setSuccessMessage(`${archivedCount} operation record${archivedCount === 1 ? "" : "s"} archived.`);
      await loadRecords();
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not archive the selected operation records.");
    } finally {
      setBusy(false);
    }
  }

  return {
    role,
    loading,
    loadRecords,
    busy,
    pageError,
    successMessage,
    search,
    fromDate,
    toDate,
    statusFilter,
    filterOpen,
    pendingPage,
    reviewedPage,
    selectedIds,
    selectedRecord,
    reviewTarget,
    bulkReviewAction,
    pinError,
    pdfConfirmationOpen,
    archiveConfirmationOpen,
    stats,
    pendingRows,
    pendingPageCount: getPageCount(pendingRows.length, OPERATION_PAGE_SIZE),
    reviewedRows,
    selectedRows,
    pdfSelectedRows,
    selectedPendingRows,
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
    setBulkReviewAction,
    setPinError,
    setPdfConfirmationOpen,
    setArchiveConfirmationOpen,
    updateSearch,
    updateStatusFilter,
    updateFromDate,
    updateToDate,
    clearDateFilter,
    openReview,
    openBulkReview,
    handleReview,
    toggleSelection,
    printSelectedRecords,
    archiveSelectedRecords,
  };
}
