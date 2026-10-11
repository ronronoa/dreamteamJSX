import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Check, ChevronRight, Filter, Printer, X } from "lucide-react";

import {
  authorizeOperation,
  fetchOperations,
  rejectOperation,
  validateOperation,
  type OperationRecord,
  type OperationStatus,
} from "@/api/operations";
import { archiveRecord } from "@/api/archives";
import { API_URL } from "@/api/config";
import { useAuth } from "@/context/AuthContext";
import DataTable from "@/components/common/DataTable";
import Modal from "@/components/common/modals/Modal";
import AreYouSureModal from "@/components/common/modals/AreYouSure";
import CommonButton from "@/components/common/widgets/CommonButton";
import PinModal from "@/modules/reportForms/modal/PinModal";
import ImagePreviewModal from "@/modules/reportForms/modal/ImagePreviewModal";
import StatCard from "../component/StatCard";
import DateCell from "../component/DateCell";
import TableSearch from "../component/TableSearch";
import TablePagination from "../component/TablePagination";
import TableStatus from "../component/TableStatus";

const PAGE_SIZE = 10;
const STATUS_FILTERS = [
  { value: "all", label: "All statuses" },
  { value: "PENDING", label: "Pending" },
  { value: "TO_REVIEW", label: "To review" },
  { value: "VALIDATED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

interface OperationRow {
  id: string;
  operationId: string;
  date: Date;
  caller: string;
  incident: string;
  location: string;
  team: string;
  submittedBy: string;
  status: OperationStatus;
  record: OperationRecord;
}

type ReviewAction = "approve" | "reject";

function formatOperationId(id: string) {
  return `OP-${id.slice(0, 8).toUpperCase()}`;
}

function getPersonAddress(record: OperationRecord) {
  const person = record.personsInvolved[0];
  if (!person) return "";

  const addressParts = [
    person.address_phase && `Phase ${person.address_phase}`,
    person.address_package && `Package ${person.address_package}`,
    person.address_block && `Block ${person.address_block}`,
    person.address_lot && `Lot ${person.address_lot}`,
  ].filter(Boolean).join(" ");
  return addressParts || person.address || "";
}

function toOperationRow(record: OperationRecord): OperationRow {
  const dispatch = record.dispatches[0];
  const teams = record.teamAssignments.map(({ team }) => team.team_name);
  return {
    id: formatOperationId(record.operation_id),
    operationId: record.operation_id,
    date: new Date(record.operation_date),
    caller: record.name_of_caller,
    incident: record.nature_of_operation,
    location: getPersonAddress(record) || dispatch?.to_location || dispatch?.from_location || "—",
    team: teams.length > 0 ? teams.join(", ") : record.team.team_name,
    submittedBy: record.submitter?.name ?? record.submitter_name ?? "Unknown submitter",
    status: record.status,
    record,
  };
}

function getMostFrequent(values: string[]) {
  const counts = new Map<string, number>();
  for (const value of values) {
    const normalized = value.trim();
    if (normalized && normalized !== "—") counts.set(normalized, (counts.get(normalized) ?? 0) + 1);
  }

  let mostFrequent = "—";
  let highestCount = 0;
  for (const [value, count] of counts) {
    if (count > highestCount) {
      mostFrequent = value;
      highestCount = count;
    }
  }
  return mostFrequent;
}

function getAverageResponseTime(records: OperationRecord[]) {
  const durations = records.flatMap((record) => record.dispatches.flatMap((dispatch) => {
    if (!dispatch.depart_time || !dispatch.arrival_time) return [];
    const duration = new Date(dispatch.arrival_time).getTime() - new Date(dispatch.depart_time).getTime();
    return duration >= 0 ? [duration] : [];
  }));

  if (durations.length === 0) return "—";
  const averageSeconds = Math.round(durations.reduce((sum, duration) => sum + duration, 0) / durations.length / 1000);
  return `${Math.floor(averageSeconds / 60)}:${String(averageSeconds % 60).padStart(2, "0")}`;
}

function isCurrentMonth(date: Date) {
  const now = new Date();
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
}

function pageCount(recordCount: number) {
  return Math.max(1, Math.ceil(recordCount / PAGE_SIZE));
}

export default function Operations() {
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
  const archiveableRows = reviewedRows.filter((row) => row.status === "VALIDATED");
  const selectedArchiveCount = selectedIds.filter((id) => archiveableRows.some((row) => row.operationId === id)).length;
  const visiblePendingRows = pendingRows.slice((pendingPage - 1) * PAGE_SIZE, pendingPage * PAGE_SIZE);
  const visibleReviewedRows = reviewedRows.slice((reviewedPage - 1) * PAGE_SIZE, reviewedPage * PAGE_SIZE);
  const canReview = role !== undefined && role !== "MEMBER";
  const canReject = role === "SUPER_ADMIN" || role === "DEPARTMENT_HEAD" || role === "DEPUTY";
  const canArchive = role === "SUPER_ADMIN" || role === "DEPARTMENT_HEAD";
  const monthlyRows = allRows.filter((row) => isCurrentMonth(row.date));

  const stats = [
    { label: "Total records", value: allRows.length.toLocaleString(), sub: "Active operation logs", variant: "primary" as const },
    { label: "This month", value: monthlyRows.length.toLocaleString(), sub: "Operation logs submitted this month" },
    { label: "Response average time", value: getAverageResponseTime(records), unit: "min", sub: "Based on recorded dispatch times" },
    { label: "Most frequent type of operation", value: getMostFrequent(monthlyRows.map((row) => row.incident)), sub: "For this month" },
    { label: "Most frequent area of operation", value: getMostFrequent(monthlyRows.map((row) => row.location)), sub: "For this month" },
  ];

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

  function toggleArchiveSelection(operationId: string) {
    setSelectedIds((current) => current.includes(operationId)
      ? current.filter((id) => id !== operationId)
      : [...current, operationId]);
  }

  async function archiveSelectedRecords() {
    if (!accessToken || !canArchive || busy) return;

    setBusy(true);
    setPageError("");
    setSuccessMessage("");
    try {
      const idsToArchive = selectedIds.filter((id) => archiveableRows.some((row) => row.operationId === id));
      for (const operationId of idsToArchive) {
        await archiveRecord(accessToken, "operation", operationId);
      }
      setArchiveConfirmationOpen(false);
      setSelectedIds([]);
      setReviewedPage(1);
      setSuccessMessage(`${idsToArchive.length} operation record${idsToArchive.length === 1 ? "" : "s"} archived.`);
      await loadRecords();
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not archive selected records.");
      await loadRecords();
    } finally {
      setBusy(false);
    }
  }

  const pendingCountLabel = pendingRows.length === 1 ? "1 request" : `${pendingRows.length} requests`;
  const reviewedCountLabel = reviewedRows.length === 1 ? "1 record" : `${reviewedRows.length} records`;

  return (
    <>
      <PinModal
        title={reviewTarget?.action === "reject" ? "Reject operation report" : "Review operation report"}
        open={reviewTarget !== null}
        onClose={() => { setReviewTarget(null); setPinError(""); }}
        onSubmit={(pin) => { void handleReview(pin); }}
        loading={busy}
        error={pinError}
      />
      <AreYouSureModal
        open={archiveConfirmationOpen}
        onClose={() => setArchiveConfirmationOpen(false)}
        onConfirm={archiveSelectedRecords}
        title="Archive selected operation records?"
        description={`${selectedArchiveCount} validated record${selectedArchiveCount === 1 ? "" : "s"} will move to Archives. You can restore them later.`}
        confirmLabel={busy ? "Archiving…" : "Archive records"}
        variant="danger"
      />
      <Modal large open={selectedRecord !== null} onClose={() => setSelectedRecord(null)} className="max-w-5xl">
        {selectedRecord && <OperationDetails record={selectedRecord} onClose={() => setSelectedRecord(null)} />}
      </Modal>

      <div className="space-y-7">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
        </div>

        {pageError && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{pageError}</p>}
        {successMessage && <p role="status" className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{successMessage}</p>}

        <section>
          <div className="mb-3 flex items-center gap-3">
            <h2 className="text-sm font-bold text-gray-900">Pending Approval Requests</h2>
            <span className="rounded-full bg-pink-100 px-2.5 py-0.5 text-[10px] font-semibold text-pink-700">{pendingCountLabel}</span>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <DataTable
              rows={visiblePendingRows}
              loading={loading}
              rowKey={(row) => row.operationId}
              emptyMessage="No operation reports are waiting for review."
              columns={[
                { label: "Request ID", accessor: "id" },
                { label: "Date", render: (row) => <DateCell date={row.date} /> },
                { label: "Caller", accessor: "caller" },
                { label: "Incident", accessor: "incident" },
                { label: "Location", accessor: "location" },
                { label: "Team", accessor: "team" },
                { label: "Submitted by", accessor: "submittedBy" },
                { label: "Status", render: (row) => <OperationStatusBadge status={row.status} /> },
                {
                  label: "Actions",
                  align: "right",
                  render: (row) => (
                    <div className="flex items-center justify-end gap-4">
                      <button type="button" aria-label={`View ${row.id}`} title="View report" onClick={() => setSelectedRecord(row.record)} className="text-gray-400 hover:text-gray-700">
                        <ChevronRight size={16} />
                      </button>
                      {canReview && (
                        <button
                          type="button"
                          aria-label={role === "TEAM_LEADER" ? `Send ${row.id} for review` : `Approve ${row.id}`}
                          title={row.status === "TO_REVIEW" && role === "TEAM_LEADER" ? "Waiting for administrator review" : role === "TEAM_LEADER" ? "Send to administrator review" : "Approve report"}
                          disabled={row.status === "TO_REVIEW" && role === "TEAM_LEADER"}
                          onClick={() => openReview(row, "approve")}
                          className="text-emerald-600 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Check size={16} strokeWidth={2.5} />
                        </button>
                      )}
                      {canReject && (
                        <button type="button" aria-label={`Reject ${row.id}`} title="Reject report" onClick={() => openReview(row, "reject")} className="text-red-500 hover:text-red-600">
                          <X size={16} strokeWidth={2.5} />
                        </button>
                      )}
                    </div>
                  ),
                },
              ]}
            />
            {pendingRows.length > PAGE_SIZE && (
              <div className="flex justify-end border-t border-gray-100 px-4 py-3">
                <TablePagination currentPage={pendingPage} pageCount={pageCount(pendingRows.length)} onPageChange={setPendingPage} />
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-gray-900">Reviewed Operation Records</h2>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">{reviewedCountLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              <TableSearch value={search} onChange={updateSearch} placeholder="Search operation records" ariaLabel="Search operation records" />
              <div className="relative">
                <button type="button" aria-label="Filter operation records" aria-expanded={filterOpen} onClick={() => setFilterOpen((open) => !open)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">
                  <Filter size={14} />
                </button>
                {filterOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-44 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                    <label htmlFor="operation-status-filter" className="mb-1 block px-1 text-xs font-semibold text-gray-600">Status</label>
                    <select id="operation-status-filter" value={statusFilter} onChange={(event) => updateStatusFilter(event.target.value)} className="w-full rounded-md border border-gray-200 bg-white px-2 py-2 text-xs text-gray-700 outline-none focus:border-purple-400">
                      {STATUS_FILTERS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <DataTable
              rows={visibleReviewedRows}
              loading={loading}
              rowKey={(row) => row.operationId}
              emptyMessage="No reviewed operation records match your search or filter."
              columns={[
                ...(canArchive ? [{
                  label: "Select",
                  align: "center" as const,
                  render: (row: OperationRow) => row.status === "VALIDATED" ? (
                    <input type="checkbox" aria-label={`Select ${row.id} for archive`} checked={selectedIds.includes(row.operationId)} onChange={() => toggleArchiveSelection(row.operationId)} className="h-4 w-4 rounded border-gray-300 accent-purple-700" />
                  ) : null,
                }] : []),
                { label: "Request ID", accessor: "id" as const },
                { label: "Date", render: (row: OperationRow) => <DateCell date={row.date} /> },
                { label: "Caller", accessor: "caller" as const },
                { label: "Incident", accessor: "incident" as const },
                { label: "Location", accessor: "location" as const },
                { label: "Team", accessor: "team" as const },
                { label: "Submitted by", accessor: "submittedBy" as const },
                { label: "Status", render: (row: OperationRow) => <OperationStatusBadge status={row.status} /> },
                {
                  label: "Actions",
                  align: "right",
                  render: (row: OperationRow) => (
                    <button type="button" aria-label={`View ${row.id}`} title="View report" onClick={() => setSelectedRecord(row.record)} className="text-gray-400 hover:text-gray-700">
                      <ChevronRight size={16} />
                    </button>
                  ),
                },
              ]}
            />
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-4 py-3">
              <TablePagination currentPage={reviewedPage} pageCount={pageCount(reviewedRows.length)} onPageChange={setReviewedPage} />
              <div className="flex items-center gap-2">
                <CommonButton compact variant="gray" disabled={loading || records.length === 0} onClick={() => window.print()}>
                  <Printer size={13} /> Print PDF
                </CommonButton>
                {canArchive && (
                  <CommonButton compact variant="orange" disabled={busy || selectedArchiveCount === 0} onClick={() => setArchiveConfirmationOpen(true)}>
                    Archive{selectedArchiveCount > 0 ? ` (${selectedArchiveCount})` : ""}
                  </CommonButton>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function OperationStatusBadge({ status }: { status: OperationStatus }) {
  const statusVariants: Record<OperationStatus, "pending" | "warning" | "approved" | "rejected" | "archived"> = {
    PENDING: "pending",
    TO_REVIEW: "warning",
    VALIDATED: "approved",
    REJECTED: "rejected",
    ARCHIVED: "archived",
  };
  return <TableStatus variant={statusVariants[status]} />;
}

function OperationDetails({ record, onClose }: { record: OperationRecord; onClose: () => void }) {
  const [previewImage, setPreviewImage] = useState<OperationRecord["images"][number] | null>(null);
  const apiOrigin = API_URL.replace(/\/api\/?$/, "");
  const operationDate = new Date(record.operation_date);
  const submitter = record.submitter?.name ?? record.submitter_name ?? "Unknown submitter";
  const teams = record.teamAssignments.map(({ team }) => team.team_name);

  function formatTime(value: string | null) {
    return value ? new Date(value).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : "—";
  }

  function formatAddress(person: OperationRecord["personsInvolved"][number]) {
    const parts = [
      person.address_phase && `P${person.address_phase}`,
      person.address_package && `PK${person.address_package}`,
      person.address_block && `B${person.address_block}`,
      person.address_lot && `L${person.address_lot}`,
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(" ") : person.address || "—";
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-700">Operation log · {formatOperationId(record.operation_id)}</p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">{record.nature_of_operation}</h2>
          <p className="mt-1 text-xs text-gray-500">{operationDate.toLocaleString()} · Submitted by {submitter}</p>
        </div>
        <OperationStatusBadge status={record.status} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PreviewSection title="OPERATION DETAILS">
          <div className="grid grid-cols-2 gap-4">
            <PreviewField label="Submitter Name" value={submitter} />
            <PreviewField label="Date" value={operationDate.toLocaleDateString()} />
            <PreviewField label="Nature of Operation" value={record.nature_of_operation} />
            <PreviewField label="Caller" value={record.name_of_caller} />
            <PreviewField label="Team Assigned" value={teams.length > 0 ? teams.join(", ") : record.team.team_name} />
            <PreviewField label="Responders" value={record.responders.map(({ user }) => user.name).join(", ")} />
            <PreviewField label="Approved By" value={record.validator?.name ?? "—"} />
          </div>
        </PreviewSection>

        <PreviewSection title="VEHICULAR DISPATCH">
          {record.dispatches.length > 0 ? record.dispatches.map((dispatch) => (
            <div key={dispatch.dispatch_id} className="grid grid-cols-2 gap-4 border-b border-gray-100 py-2 last:border-0">
              <PreviewField label="From" value={dispatch.from_location} />
              <PreviewField label="To" value={dispatch.to_location} />
              <PreviewField label="Vehicle" value={dispatch.vehicle ? `${dispatch.vehicle.vehicle_name} · ${dispatch.vehicle.plate_number}` : "—"} />
              <PreviewField label="Driver" value={dispatch.driver_name} />
              <PreviewField label="Depart" value={formatTime(dispatch.depart_time)} />
              <PreviewField label="Arrival" value={formatTime(dispatch.arrival_time)} />
              <PreviewField label="Odometer In" value={dispatch.odometer_in === null ? "—" : `${dispatch.odometer_in} km`} />
              <PreviewField label="Odometer Out" value={dispatch.odometer_out === null ? "—" : `${dispatch.odometer_out} km`} />
            </div>
          )) : <p className="text-sm text-gray-400">No vehicle dispatch recorded.</p>}
        </PreviewSection>
      </div>

      <PreviewSection title="PEOPLE INVOLVED">
        <div className="overflow-x-auto rounded-md border border-purple-300">
          <table className="w-full border-collapse text-sm">
            <thead><tr className="bg-[#180024] text-left text-white">
              <th className="border-r border-gray-600 px-3 py-2">Name</th>
              <th className="w-16 border-r border-gray-600 px-3 py-2">Age</th>
              <th className="w-16 border-r border-gray-600 px-3 py-2">Sex</th>
              <th className="w-36 border-r border-gray-600 px-3 py-2">Contact Number</th>
              <th className="px-3 py-2">Address</th>
            </tr></thead>
            <tbody>
              {record.personsInvolved.map((person) => (
                <tr key={person.person_id} className="border-b border-gray-200">
                  <td className="border-r border-gray-200 px-3 py-2">{person.full_name}</td>
                  <td className="border-r border-gray-200 px-3 py-2">{person.age}</td>
                  <td className="border-r border-gray-200 px-3 py-2">{person.sex || "—"}</td>
                  <td className="border-r border-gray-200 px-3 py-2">{person.contact_no || "—"}</td>
                  <td className="px-3 py-2">{formatAddress(person)}</td>
                </tr>
              ))}
              {record.personsInvolved.length === 0 && <tr><td colSpan={5} className="px-3 py-4 text-center text-gray-400">No people added.</td></tr>}
            </tbody>
          </table>
        </div>
      </PreviewSection>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PreviewSection title="OPERATION DESCRIPTION" className="min-h-32">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-900">{record.event_description || "—"}</p>
        </PreviewSection>

        <PreviewSection title="INVENTORY USED">
          <div className="overflow-x-auto rounded-md">
            <table className="w-full border-collapse text-sm">
              <thead><tr className="bg-[#180024] text-left text-white"><th className="px-3 py-2">Item Name</th><th className="px-3 py-2 text-right">Quantity</th></tr></thead>
              <tbody>
                {record.inventoryEntries.map((entry) => <tr key={entry.entry_id} className="border-b border-gray-200"><td className="px-3 py-2">{entry.item_name}</td><td className="px-3 py-2 text-right">{entry.quantity} {entry.unit ?? ""}</td></tr>)}
                {record.inventoryEntries.length === 0 && <tr><td colSpan={2} className="px-3 py-4 text-center text-gray-400">No items added.</td></tr>}
              </tbody>
            </table>
          </div>
        </PreviewSection>
      </div>

      <PreviewSection title="ATTACHED IMAGE">
        <div className="space-y-2">
          {record.images.map((image) => (
            <button
              key={image.attachment_id}
              type="button"
              onClick={() => setPreviewImage(image)}
              className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-left text-sm text-gray-700 transition hover:border-purple-400 hover:bg-gray-50"
            >
              <span className="truncate">{image.image_url.split("/").pop() || "Operation attachment"}</span>
              <span className="ml-3 shrink-0 text-xs uppercase tracking-wide text-gray-400">View</span>
            </button>
          ))}
          {record.images.length === 0 && <p className="text-sm text-gray-400">No images attached.</p>}
        </div>
      </PreviewSection>

      <ImagePreviewModal
        open={previewImage !== null}
        onClose={() => setPreviewImage(null)}
        file={null}
        image={previewImage ? {
          name: previewImage.image_url.split("/").pop() || "Operation attachment",
          url: `${apiOrigin}${previewImage.image_url}`,
        } : null}
      />

      <div className="flex justify-end border-t border-gray-200 pt-3">
        <CommonButton variant="gray" onClick={onClose}>Close</CommonButton>
      </div>
    </div>
  );
}

function PreviewSection({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={`flex w-full flex-col rounded-md bg-[#fffdfb] p-5 shadow-md ${className}`}>
      <h3 className="mb-4 border-b border-gray-200 pb-2 text-lg font-bold text-slate-900">{title}</h3>
      {children}
    </section>
  );
}

function PreviewField({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-bold uppercase tracking-wide text-gray-500">{label}</p>
      <p className="break-words text-sm text-slate-900">{value || "—"}</p>
    </div>
  );
}
