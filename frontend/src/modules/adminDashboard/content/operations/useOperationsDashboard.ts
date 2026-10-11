import { useCallback, useEffect, useMemo, useState } from "react";
import {
  archiveOperation,
  authorizeOperation,
  fetchOperations,
  rejectOperation,
  validateOperation,
  type OperationRecord,
} from "@/api/operations";
import { useAuth } from "@/context/AuthContext";
import { createOperationPdf } from "./operationPdf";
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
  const { session } = useAuth();
  const accessToken = session?.accessToken;
  const role = session?.user.role;
  const [records, setRecords] = useState<OperationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [pageError, setPageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [pendingPage, setPendingPage] = useState(1);
  const [reviewedPage, setReviewedPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<OperationRecord | null>(null);
  const [reviewTarget, setReviewTarget] = useState<{ row: OperationRow; action: ReviewAction } | null>(null);
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

  const allRows = useMemo(() => records.map(toOperationRow), [records]);
  const matchingRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return allRows.filter((row) => {
      if (statusFilter !== "all" && row.status !== statusFilter) return false;
      if (!term) return true;
      return [row.id, row.caller, row.incident, row.location, row.team, row.submittedBy]
        .some((value) => value.toLowerCase().includes(term));
    });
  }, [allRows, search, statusFilter]);

  const pendingRows = useMemo(
    () => matchingRows.filter((row) => row.status === "PENDING" || row.status === "TO_REVIEW"),
    [matchingRows],
  );
  const reviewedRows = useMemo(
    () => matchingRows.filter((row) => row.status === "VALIDATED" || row.status === "REJECTED"),
    [matchingRows],
  );
  const selectedRows = reviewedRows.filter((row) => selectedIds.includes(row.operationId));
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

  const canReview = role !== undefined && role !== "MEMBER";
  const canReject = role === "SUPER_ADMIN" || role === "DEPARTMENT_HEAD" || role === "DEPUTY";
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

  function openReview(row: OperationRow, action: ReviewAction) {
    setPinError("");
    setReviewTarget({ row, action });
  }

  async function handleReview(pin: string) {
    if (!accessToken || !reviewTarget || busy) return;

    setBusy(true);
    setPinError("");
    setPageError("");
    setSuccessMessage("");
    try {
      if (reviewTarget.action === "reject") {
        await rejectOperation(accessToken, reviewTarget.row.operationId, pin);
        setSuccessMessage(`${reviewTarget.row.id} was rejected.`);
      } else if (role === "TEAM_LEADER") {
        await authorizeOperation(accessToken, reviewTarget.row.operationId, pin);
        setSuccessMessage(`${reviewTarget.row.id} was sent for administrator review.`);
      } else {
        await validateOperation(accessToken, reviewTarget.row.operationId, pin);
        setSuccessMessage(`${reviewTarget.row.id} was approved.`);
      }

      setReviewTarget(null);
      setPendingPage(1);
      setReviewedPage(1);
      await loadRecords();
    } catch (error) {
      setPinError(error instanceof Error ? error.message : "Could not update this operation report.");
    } finally {
      setBusy(false);
    }
  }

  function toggleSelection(operationId: string) {
    setSelectedIds((current) => current.includes(operationId)
      ? current.filter((id) => id !== operationId)
      : [...current, operationId]);
  }

  function printSelectedRecords() {
    if (selectedRows.length === 0) return;

    try {
      createOperationPdf(selectedRows.map((row) => row.record));
      setPdfConfirmationOpen(false);
      setSelectedIds([]);
      setSuccessMessage(`${selectedRows.length} operation record${selectedRows.length === 1 ? "" : "s"} downloaded as PDF.`);
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
  };
}
