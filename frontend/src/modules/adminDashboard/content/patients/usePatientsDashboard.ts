import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { archivePatientLog, fetchPatientLogs, reviewPatientLog, type PatientLogRecord } from "@/api/patients";
import { useAuth } from "@/store/useAuth";
import { getPageCount } from "@/utils/pagination";
import { createPatientPdf } from "./patientPdf";
import {
  getMostCommonAgeRange,
  getMostCommonRequest,
  getPatientAverageResponseTime,
  isPatientLogThisMonth,
  PATIENT_PAGE_SIZE,
  toPatientRow,
  type PatientRow,
} from "./patientUtils";

type ReviewAction = "authorize" | "validate" | "reject";

export function usePatientsDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedRecordId = searchParams.get("reportFormId") ?? searchParams.get("recordId");
  const { session } = useAuth();
  const accessToken = session?.accessToken;
  const role = session?.user.role;
  const [records, setRecords] = useState<PatientLogRecord[]>([]);
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
  const [selectedRecord, setSelectedRecord] = useState<PatientLogRecord | null>(null);
  const [reviewTarget, setReviewTarget] = useState<{ row: PatientRow; action: ReviewAction } | null>(null);
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
      setRecords(await fetchPatientLogs(accessToken));
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not load patient records.");
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

    const matchingRecord = records.find((record) => record.patient_log_id === requestedRecordId);
    if (!matchingRecord) return;

    setSelectedRecord(matchingRecord);
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete("recordId");
    nextSearchParams.delete("reportFormId");
    setSearchParams(nextSearchParams, { replace: true });
  }, [loading, records, requestedRecordId, searchParams, setSearchParams]);

  const allRows = useMemo(() => records.map(toPatientRow), [records]);
  const matchingRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return allRows.filter((row) => {
      if (statusFilter !== "all" && row.status !== statusFilter) return false;
      if (!term) return true;
      return [row.id, row.name, row.assessment, row.waiverDescription, row.address, row.submittedBy, row.requestType]
        .some((value) => value.toLowerCase().includes(term));
    });
  }, [allRows, search, statusFilter]);

  const pendingRows = useMemo(() => matchingRows.filter((row) => row.status === "PENDING"), [matchingRows]);
  const reviewedRows = useMemo(() => matchingRows.filter((row) => row.status === "VALIDATED" || row.status === "REJECTED"), [matchingRows]);
  const selectedRows = reviewedRows.filter((row) => selectedIds.includes(row.patientLogId));
  const selectedPendingRows = pendingRows.filter((row) => selectedIds.includes(row.patientLogId));
  const visiblePendingRows = pendingRows.slice((pendingPage - 1) * PATIENT_PAGE_SIZE, pendingPage * PATIENT_PAGE_SIZE);
  const visibleReviewedRows = reviewedRows.slice((reviewedPage - 1) * PATIENT_PAGE_SIZE, reviewedPage * PATIENT_PAGE_SIZE);
  const currentMonthRows = allRows.filter(isPatientLogThisMonth);
  const stats = [
    { label: "Total records", value: allRows.length.toLocaleString(), sub: "Active patient logs", variant: "primary" as const },
    { label: "New patient records", value: currentMonthRows.length.toLocaleString(), sub: "Patient logs submitted this month" },
    { label: "Emergency response average time", value: getPatientAverageResponseTime(records), sub: "Average dispatch departure-to-arrival time" },
    { label: "Most common age range", value: getMostCommonAgeRange(allRows), unit: "yrs", sub: "Based on recorded patient ages" },
    { label: "Most common type of request", value: getMostCommonRequest(currentMonthRows), sub: "For this month" },
  ];

  const canReview = role !== undefined && role !== "MEMBER";
  const canReject = role === "TEAM_LEADER" || role === "SUPER_ADMIN" || role === "DEPARTMENT_HEAD" || role === "DEPUTY";
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

  function openReview(row: PatientRow, action: "approve" | "reject") {
    const resolvedAction = action === "reject" ? "reject" : "validate";
    setPinError("");
    setReviewTarget({ row, action: resolvedAction });
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
        const action = bulkReviewAction === "reject" ? "reject" : "validate";
        const reviewResults = await Promise.allSettled(selectedPendingRows.map((row) =>
          reviewPatientLog(accessToken, row.patientLogId, action, pin, rejectedReason),
        ));
        const successfulCount = reviewResults.filter((result) => result.status === "fulfilled").length;
        const failedIds = selectedPendingRows
          .filter((_row, index) => reviewResults[index].status === "rejected")
          .map((row) => row.patientLogId);
        setSelectedIds(failedIds);
        setBulkReviewAction(null);
        setSuccessMessage(`${successfulCount} patient report${successfulCount === 1 ? " was" : "s were"} ${bulkReviewAction === "reject" ? "rejected" : "approved"}.`);
        await loadRecords();
        if (failedIds.length > 0) setPageError(`${failedIds.length} selected report${failedIds.length === 1 ? " was" : "s were"} not updated.`);
        return;
      }

      if (!reviewTarget) return;
      await reviewPatientLog(accessToken, reviewTarget.row.patientLogId, reviewTarget.action, pin, rejectedReason);
      const actionMessage = reviewTarget.action === "authorize" ? "sent for administrator review" : reviewTarget.action === "validate" ? "approved" : "rejected";
      setSuccessMessage(`${reviewTarget.row.id} was ${actionMessage}.`);
      setReviewTarget(null);
      await loadRecords();
    } catch (error) {
      setPinError(error instanceof Error ? error.message : "Could not update this patient report.");
    } finally {
      setBusy(false);
    }
  }

  function toggleSelection(patientLogId: string) {
    setSelectedIds((current) => current.includes(patientLogId)
      ? current.filter((id) => id !== patientLogId)
      : [...current, patientLogId]);
  }

  function printSelectedRecords() {
    if (selectedRows.length === 0) return;
    try {
      createPatientPdf(selectedRows.map((row) => row.record));
      setPdfConfirmationOpen(false);
      setSelectedIds([]);
      setSuccessMessage(`${selectedRows.length} patient record${selectedRows.length === 1 ? "" : "s"} downloaded as PDF.`);
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not create the patient report PDF.");
    }
  }

  async function archiveSelectedRecords() {
    if (!accessToken || selectedRows.length === 0 || busy) return;
    setBusy(true);
    setPageError("");
    try {
      const archiveResults = await Promise.allSettled(
        selectedRows.map((row) => archivePatientLog(accessToken, row.patientLogId)),
      );
      const archivedIds = selectedRows
        .filter((_row, index) => archiveResults[index].status === "fulfilled")
        .map((row) => row.patientLogId);
      const failedIds = selectedRows
        .filter((_row, index) => archiveResults[index].status === "rejected")
        .map((row) => row.patientLogId);
      const archivedCount = archivedIds.length;

      setArchiveConfirmationOpen(false);
      setSelectedIds(failedIds);
      if (archivedCount > 0) {
        setSuccessMessage(`${archivedCount} patient record${archivedCount === 1 ? "" : "s"} archived.`);
      }
      await loadRecords();
      if (failedIds.length > 0) {
        setPageError(`${failedIds.length} selected record${failedIds.length === 1 ? " was" : "s were"} not archived. You can retry the remaining selection.`);
      }
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not archive the selected patient records.");
    } finally {
      setBusy(false);
    }
  }

  return {
    role, loading, loadRecords, busy, pageError, successMessage, search, statusFilter, filterOpen,
    pendingPage, reviewedPage, selectedIds, selectedRecord, reviewTarget, pinError,
    pdfConfirmationOpen, archiveConfirmationOpen, stats, pendingRows, reviewedRows,
    selectedRows, selectedPendingRows, visiblePendingRows, visibleReviewedRows, canReview, canReject, canArchive,
    bulkReviewAction,
    pendingPageCount: getPageCount(pendingRows.length, PATIENT_PAGE_SIZE),
    reviewedPageCount: getPageCount(reviewedRows.length, PATIENT_PAGE_SIZE),
    setFilterOpen, setPendingPage, setReviewedPage, setSelectedIds, setSelectedRecord,
    setReviewTarget, setBulkReviewAction, setPinError, setPdfConfirmationOpen, setArchiveConfirmationOpen,
    updateSearch, updateStatusFilter, openReview, openBulkReview, handleReview, toggleSelection,
    printSelectedRecords, archiveSelectedRecords,
  };
}
