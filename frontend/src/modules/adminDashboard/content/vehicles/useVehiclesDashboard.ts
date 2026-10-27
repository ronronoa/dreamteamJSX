import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { useAuth } from "@/store/useAuth";
import {
  createFleetVehicle,
  fetchFleetVehicles,
  updateFleetVehicleAvailability,
  updateFleetVehicleDetails,
  updateFleetVehicleOdometer,
  type FleetVehicle,
} from "@/api/vehicles";
import { fetchVehicularDispatchRecords, reviewVehicularDispatch, type VehicleDispatchRecord } from "@/api/vehicularDispatches";
import { archiveRecord } from "@/api/archives";
import { getPageCount } from "@/utils/pagination";
import { createVehiclePdf } from "./vehiclePdf";
import { formatDate } from "@/utils/dateTime";

export const VEHICLE_PAGE_SIZE = 10;
type ReviewAction = "authorize" | "validate" | "reject";

export function useVehiclesDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedRecordId = searchParams.get("reportFormId") ?? searchParams.get("recordId");
  const { session } = useAuth();
  const accessToken = session?.accessToken;
  const [fleetVehicles, setFleetVehicles] = useState<FleetVehicle[]>([]);
  const [dispatchRecords, setDispatchRecords] = useState<VehicleDispatchRecord[]>([]);
  const [vehicleName, setVehicleName] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [fleetLoading, setFleetLoading] = useState(true);
  const [savingVehicle, setSavingVehicle] = useState(false);
  const [savingOdometerId, setSavingOdometerId] = useState<string | null>(null);
  const [savingDetailsId, setSavingDetailsId] = useState<string | null>(null);
  const [updatingAvailabilityId, setUpdatingAvailabilityId] = useState<string | null>(null);
  const [fleetError, setFleetError] = useState("");
  const [fleetMessage, setFleetMessage] = useState("");
  const [dispatchLoading, setDispatchLoading] = useState(true);
  const [dispatchError, setDispatchError] = useState("");
  const [busy, setBusy] = useState(false);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [pendingPage, setPendingPage] = useState(1);
  const [reviewedPage, setReviewedPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<VehicleDispatchRecord["record"] | null>(null);
  const [reviewTarget, setReviewTarget] = useState<{ record: VehicleDispatchRecord; action: ReviewAction } | null>(null);
  const [bulkReviewAction, setBulkReviewAction] = useState<"approve" | "reject" | null>(null);
  const [pinError, setPinError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [pdfConfirmationOpen, setPdfConfirmationOpen] = useState(false);
  const [archiveConfirmationOpen, setArchiveConfirmationOpen] = useState(false);
  const role = session?.user.role;
  const canManageFleet = ["SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY"].includes(role ?? "");
  const canReview = role === "SUPER_ADMIN" || role === "DEPARTMENT_HEAD" || role === "DEPUTY";
  const canReject = canReview;
  const canArchive = role === "SUPER_ADMIN" || role === "DEPARTMENT_HEAD";

  const loadFleet = useCallback(async () => {
    if (!accessToken) {
      setFleetLoading(false);
      return;
    }
    setFleetLoading(true);
    try {
      setFleetVehicles(await fetchFleetVehicles(accessToken));
      setFleetError("");
    } catch (error) {
      setFleetError(error instanceof Error ? error.message : "Could not load the vehicle fleet.");
    } finally {
      setFleetLoading(false);
    }
  }, [accessToken]);

  const allRows = useMemo(() => dispatchRecords, [dispatchRecords]);

  useEffect(() => {
    if (!requestedRecordId || dispatchLoading) return;

    const matchingRecord = dispatchRecords.find((record) =>
      record.dispatchId === requestedRecordId || record.record.dispatch_id === requestedRecordId,
    );
    if (!matchingRecord) return;

    setSelectedRecord(matchingRecord.record);
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete("recordId");
    nextSearchParams.delete("reportFormId");
    setSearchParams(nextSearchParams, { replace: true });
  }, [dispatchLoading, dispatchRecords, requestedRecordId, searchParams, setSearchParams]);

  const matchingRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return allRows.filter((record) => {
      if (statusFilter !== "all" && record.status !== statusFilter) return false;
      const reportDate = formatDate(record.date, "YYYY-MM-DD");
      if (fromDate && reportDate < fromDate) return false;
      if (toDate && reportDate > toDate) return false;
      if (!term) return true;
      return [
        record.id,
        record.vehicle,
        record.driver,
        record.responders.join(" "),
        record.destination,
        record.transfers.join(" "),
        record.status,
      ].some((value) => value.toLowerCase().includes(term));
    });
  }, [allRows, fromDate, search, statusFilter, toDate]);

  const pendingRows = useMemo(
    () => matchingRows.filter((record) => record.status === "PENDING" && ( !record.operation_id || !record.patient_log_id ) ),
    [matchingRows],
  );
  const reviewedRows = useMemo(
    () => matchingRows.filter((record) => record.status === "VALIDATED" || record.status === "REJECTED"),
    [matchingRows],
  );
  const selectedRows = reviewedRows.filter((record) => selectedIds.includes(record.dispatchId));
  const selectedPendingRows = pendingRows.filter((record) => selectedIds.includes(record.dispatchId));
  const visiblePendingRows = pendingRows.slice((pendingPage - 1) * VEHICLE_PAGE_SIZE, pendingPage * VEHICLE_PAGE_SIZE);
  const visibleReviewedRows = reviewedRows.slice((reviewedPage - 1) * VEHICLE_PAGE_SIZE, reviewedPage * VEHICLE_PAGE_SIZE);

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

  function openReview(record: VehicleDispatchRecord, action: "approve" | "reject") {
    const resolvedAction = action === "reject" ? "reject" : "validate";
    setPinError("");
    setReviewTarget({ record, action: resolvedAction });
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
    setDispatchError("");
    setSuccessMessage("");
    try {
      if (bulkReviewAction) {
        const action = bulkReviewAction === "reject" ? "reject" : "validate";
        const reviewResults = await Promise.allSettled(selectedPendingRows.map((record) =>
          reviewVehicularDispatch(accessToken, record.dispatchId, action, pin, rejectedReason),
        ));
        const successfulCount = reviewResults.filter((result) => result.status === "fulfilled").length;
        const failedIds = selectedPendingRows
          .filter((_record, index) => reviewResults[index].status === "rejected")
          .map((record) => record.dispatchId);
        setSelectedIds(failedIds);
        setBulkReviewAction(null);
        setSuccessMessage(`${successfulCount} vehicle dispatch${successfulCount === 1 ? " was" : "es were"} ${bulkReviewAction === "reject" ? "rejected" : "approved"}.`);
        await loadDispatchRecords();
        if (failedIds.length > 0) setDispatchError(`${failedIds.length} selected dispatch${failedIds.length === 1 ? " was" : "es were"} not updated.`);
        return;
      }

      if (!reviewTarget) return;
      await reviewVehicularDispatch(accessToken, reviewTarget.record.dispatchId, reviewTarget.action, pin, rejectedReason);
      const resultMessage = reviewTarget.action === "authorize"
        ? "sent for administrator review"
        : reviewTarget.action === "validate" ? "approved" : "rejected";
      setSuccessMessage(`${reviewTarget.record.id} was ${resultMessage}.`);
      setReviewTarget(null);
      setPendingPage(1);
      setReviewedPage(1);
      await loadDispatchRecords();
    } catch (error) {
      setPinError(error instanceof Error ? error.message : "Could not update this vehicle dispatch.");
    } finally {
      setBusy(false);
    }
  }

  function openDetails(record: VehicleDispatchRecord) {
    setSelectedRecord(record.record);
  }

  function toggleSelection(dispatchId: string) {
    setSelectedIds((currentIds) => currentIds.includes(dispatchId)
      ? currentIds.filter((id) => id !== dispatchId)
      : [...currentIds, dispatchId]);
  }

  function printSelectedRecords() {
    if (selectedRows.length === 0) return;
    try {
      createVehiclePdf(selectedRows.map((record) => record.record));
      setPdfConfirmationOpen(false);
      setSelectedIds([]);
      setSuccessMessage(`${selectedRows.length} vehicle record${selectedRows.length === 1 ? "" : "s"} downloaded as PDF.`);
    } catch (error) {
      setDispatchError(error instanceof Error ? error.message : "Could not create the vehicle dispatch PDF.");
    }
  }

  async function archiveSelectedRecords() {
    if (!accessToken || selectedRows.length === 0 || busy || !canArchive) return;
    setBusy(true);
    setDispatchError("");
    setSuccessMessage("");
    try {
      const archiveResults = await Promise.allSettled(
        selectedRows.map((record) => archiveRecord(accessToken, "vehicle", record.dispatchId)),
      );
      const archivedCount = archiveResults.filter((result) => result.status === "fulfilled").length;
      const failedIds = selectedRows
        .filter((_record, index) => archiveResults[index].status === "rejected")
        .map((record) => record.dispatchId);

      setArchiveConfirmationOpen(false);
      setSelectedIds(failedIds);
      if (archivedCount > 0) {
        setSuccessMessage(`${archivedCount} vehicle record${archivedCount === 1 ? "" : "s"} archived.`);
      }
      await loadDispatchRecords();
      if (failedIds.length > 0) {
        setDispatchError(`${failedIds.length} selected record${failedIds.length === 1 ? " was" : "s were"} not archived. You can retry the remaining selection.`);
      }
    } catch (error) {
      setDispatchError(error instanceof Error ? error.message : "Could not archive the selected vehicle records.");
    } finally {
      setBusy(false);
    }
  }

  const loadDispatchRecords = useCallback(async () => {
    if (!accessToken) {
      setDispatchLoading(false);
      return;
    }
    setDispatchLoading(true);
    try {
      setDispatchRecords(await fetchVehicularDispatchRecords(accessToken));
      setDispatchError("");
    } catch (error) {
      setDispatchError(error instanceof Error ? error.message : "Could not load vehicle log records.");
    } finally {
      setDispatchLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    void (async () => {
      await Promise.resolve();
      await Promise.all([loadFleet(), loadDispatchRecords()]);
    })();
  }, [loadDispatchRecords, loadFleet]);

  async function handleAddVehicle(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accessToken) return;
    setSavingVehicle(true);
    setFleetError("");
    setFleetMessage("");
    try {
      await createFleetVehicle(accessToken, { vehicleName, plateNumber });
      setVehicleName("");
      setPlateNumber("");
      setFleetMessage("Vehicle added to the fleet.");
      await loadFleet();
    } catch (error) {
      setFleetError(error instanceof Error ? error.message : "Could not add this vehicle.");
    } finally {
      setSavingVehicle(false);
    }
  }

  async function saveVehicleOdometer(vehicleId: string, currentOdometer: number) {
    if (!accessToken || savingOdometerId) return;
    setSavingOdometerId(vehicleId);
    setFleetError("");
    setFleetMessage("");
    try {
      await updateFleetVehicleOdometer(accessToken, vehicleId, currentOdometer);
      setFleetMessage("Vehicle odometer updated.");
      await loadFleet();
    } catch (error) {
      setFleetError(error instanceof Error ? error.message : "Could not update the vehicle odometer.");
    } finally {
      setSavingOdometerId(null);
    }
  }

  async function saveVehicleDetails(vehicleId: string, nextVehicleName: string, nextPlateNumber: string): Promise<boolean> {
    if (!accessToken || savingDetailsId) return false;
    setSavingDetailsId(vehicleId);
    setFleetError("");
    setFleetMessage("");
    try {
      await updateFleetVehicleDetails(accessToken, vehicleId, {
        vehicleName: nextVehicleName,
        plateNumber: nextPlateNumber,
      });
      setFleetMessage("Vehicle details updated.");
      await loadFleet();
      return true;
    } catch (error) {
      setFleetError(error instanceof Error ? error.message : "Could not update vehicle details.");
      return false;
    } finally {
      setSavingDetailsId(null);
    }
  }

  async function toggleVehicleAvailability(vehicle: FleetVehicle) {
    if (!accessToken || updatingAvailabilityId) return;
    setUpdatingAvailabilityId(vehicle.vehicle_id);
    setFleetError("");
    setFleetMessage("");
    try {
      const available = vehicle.status !== "AVAILABLE";
      await updateFleetVehicleAvailability(accessToken, vehicle.vehicle_id, available);
      setFleetMessage(`${vehicle.vehicle_name} marked ${available ? "available" : "unavailable"}.`);
      await loadFleet();
    } catch (error) {
      setFleetError(error instanceof Error ? error.message : "Could not update vehicle availability.");
    } finally {
      setUpdatingAvailabilityId(null);
    }
  }

  return {
    fleetVehicles,
    vehicleName,
    setVehicleName,
    plateNumber,
    setPlateNumber,

    fleetLoading,
    loadFleet,
    savingVehicle,
    savingOdometerId,
    savingDetailsId,
    updatingAvailabilityId,
    fleetError,
    fleetMessage,
    canManageFleet,

    dispatchRecords,
    dispatchLoading,
    dispatchError,
    loadDispatchRecords,
    handleAddVehicle,

    role,
    busy,
    search,
    fromDate,
    toDate,
    statusFilter,
    filterOpen,
    pendingPage,
    reviewedPage,

    selectedRecord,
    reviewTarget,
    bulkReviewAction,
    pinError,
    successMessage,
    pendingRows,
    reviewedRows,

    visiblePendingRows,
    visibleReviewedRows,
    selectedIds,
    selectedRows,
    selectedPendingRows,
    canReview,
    canReject,
    canArchive,

    pdfConfirmationOpen,
    archiveConfirmationOpen,

    pendingPageCount: getPageCount(pendingRows.length, VEHICLE_PAGE_SIZE),
    reviewedPageCount: getPageCount(reviewedRows.length, VEHICLE_PAGE_SIZE),
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
    openDetails,
    toggleSelection,

    printSelectedRecords,
    archiveSelectedRecords,

    saveVehicleOdometer,
    saveVehicleDetails,
    toggleVehicleAvailability,
  };
}
