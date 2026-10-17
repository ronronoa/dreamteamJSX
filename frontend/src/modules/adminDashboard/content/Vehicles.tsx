import { useState } from "react"
import { Check, ChevronRight, Filter, Pencil, RefreshCw, X } from "lucide-react"
import DataTable from "@/components/common/DataTable"
import Modal from "@/components/common/modals/Modal"
import AreYouSureModal from "@/components/common/modals/AreYouSure"
import CommonButton from "@/components/common/widgets/CommonButton"
import PinModal from "@/modules/reportForms/modal/PinModal"
import type { VehicleDispatchRecord, VehicleLogStatus } from "@/api/vehicularDispatches"
import { formatDuration } from "@/utils/dateTime"
import StatCard from "../component/StatCard"
import type { StatCardProps } from "../component/StatCard"
import DateCell from "../component/DateCell"
import TablePagination from "../component/TablePagination"
import TableSearch from "../component/TableSearch"
import TableStatus from "../component/TableStatus"
import VehicularDispatchDetails from "./vehicles/VehicularDispatchDetails"
import { useVehiclesDashboard, VEHICLE_PAGE_SIZE } from "./vehicles/useVehiclesDashboard"
import type { FleetVehicle } from "@/api/vehicles"

const STATUS_FILTERS = [
  { value: "all", label: "All statuses" },
  { value: "PENDING", label: "Pending" },
  { value: "TO_REVIEW", label: "To review" },
  { value: "VALIDATED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
]

function FleetVehicleRow({ vehicle, canEdit, saving, detailsSaving, availabilitySaving, onSave, onSaveDetails, onAvailabilityChange }: {
  vehicle: FleetVehicle
  canEdit: boolean
  saving: boolean
  detailsSaving: boolean
  availabilitySaving: boolean
  onSave: (vehicleId: string, currentOdometer: number) => void
  onSaveDetails: (vehicleId: string, vehicleName: string, plateNumber: string) => Promise<boolean>
  onAvailabilityChange: (vehicle: FleetVehicle) => void
}) {
  const [odometer, setOdometer] = useState(String(vehicle.current_odometer ?? 0))
  const [editingDetails, setEditingDetails] = useState(false)
  const [vehicleName, setVehicleName] = useState(vehicle.vehicle_name)
  const [plateNumber, setPlateNumber] = useState(vehicle.plate_number)
  const parsedOdometer = Number(odometer)
  const isValidOdometer = /^\d+$/.test(odometer) && Number.isSafeInteger(parsedOdometer)
  const hasChanged = odometer !== String(vehicle.current_odometer ?? 0)

  return (
    <tr className="border-b border-gray-50 last:border-0">
      <td className="py-3 font-medium text-gray-800">{editingDetails ? (
        <input aria-label={`Vehicle name for ${vehicle.vehicle_name}`} maxLength={100} value={vehicleName} onChange={(event) => setVehicleName(event.target.value)} className="h-8 w-40 rounded-md border border-gray-200 px-2 text-sm" />
      ) : vehicle.vehicle_name}</td>
      <td className="py-3 text-gray-600">{editingDetails ? (
        <input aria-label={`Plate number for ${vehicle.vehicle_name}`} maxLength={20} value={plateNumber} onChange={(event) => setPlateNumber(event.target.value)} className="h-8 w-32 rounded-md border border-gray-200 px-2 text-sm uppercase" />
      ) : vehicle.plate_number}</td>
      <td className="py-3">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold ${vehicle.status === "AVAILABLE" ? "text-emerald-700" : "text-amber-700"}`}>
            {vehicle.status === "AVAILABLE" ? "Available" : vehicle.status === "IN_USE" ? "In use" : "Unavailable"}
          </span>
          {canEdit && (
            <button
              type="button"
              role="switch"
              aria-checked={vehicle.status === "AVAILABLE"}
              aria-label={`${vehicle.status === "AVAILABLE" ? "Mark" : "Make"} ${vehicle.vehicle_name} ${vehicle.status === "AVAILABLE" ? "unavailable" : "available"}`}
              disabled={availabilitySaving}
              onClick={() => onAvailabilityChange(vehicle)}
              className={`relative h-5 w-9 rounded-full p-0 transition-colors disabled:opacity-60 ${
                vehicle.status === "AVAILABLE" ? "bg-emerald-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                  vehicle.status === "AVAILABLE" ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          )}
        </div>
      </td>
      <td className="py-3">
        {canEdit ? (
          <input
            aria-label={`Current odometer for ${vehicle.vehicle_name}`}
            type="number"
            min={0}
            step={1}
            value={odometer}
            onChange={(event) => setOdometer(event.target.value)}
            className="h-8 w-32 rounded-md border border-gray-200 px-2 text-sm"
          />
        ) : <span className="text-gray-600">{vehicle.current_odometer.toLocaleString()} km</span>}
      </td>
      {canEdit && (
        <td className="py-3 text-right">
          <div className="flex justify-end gap-2">
          {editingDetails ? <>
            <CommonButton compact disabled={detailsSaving || !vehicleName.trim() || !plateNumber.trim()} onClick={() => { void onSaveDetails(vehicle.vehicle_id, vehicleName, plateNumber).then((saved) => { if (saved) setEditingDetails(false) }) }}>
              {detailsSaving ? "Saving…" : "Save details"}
            </CommonButton>
            <button type="button" aria-label={`Cancel editing ${vehicle.vehicle_name}`} onClick={() => { setVehicleName(vehicle.vehicle_name); setPlateNumber(vehicle.plate_number); setEditingDetails(false) }} className="rounded-md p-1 text-gray-500 hover:bg-gray-100"><X size={16} /></button>
          </> : <button type="button" aria-label={`Edit ${vehicle.vehicle_name}`} onClick={() => setEditingDetails(true)} className="rounded-md p-1 text-purple-700 hover:bg-purple-50"><Pencil size={16} /></button>}
          <CommonButton
            compact
            disabled={saving || !hasChanged || !isValidOdometer}
            onClick={() => onSave(vehicle.vehicle_id, parsedOdometer)}
          >
            {saving ? "Saving…" : "Save"}
          </CommonButton>
          </div>
        </td>
      )}
    </tr>
  )
}

function getStatusVariant(status: VehicleLogStatus) {
  if (status === "VALIDATED") return "approved" as const
  if (status === "REJECTED") return "rejected" as const
  if (status === "TO_REVIEW") return "warning" as const
  if (status === "ARCHIVED") return "archived" as const
  return "pending" as const
}

export default function Vehicles() {
  const dashboard = useVehiclesDashboard()
  const pendingCount = dashboard.dispatchRecords.filter(
    (record) => record.status === "PENDING" || record.status === "TO_REVIEW",
  ).length
  const timedRecords = dashboard.dispatchRecords.filter((record) => record.durationMilliseconds !== null)
  const averageDuration = timedRecords.length > 0
    ? formatDuration(timedRecords.reduce((total, record) => total + (record.durationMilliseconds ?? 0), 0) / timedRecords.length)
    : "—"
  const stats: StatCardProps[] = [
    { label: "Total dispatch", value: String(dashboard.dispatchRecords.length), sub: "Vehicle log records", variant: "primary" },
    { label: "Pending review", value: String(pendingCount), sub: "Awaiting approval" },
    { label: "Average dispatch duration", value: averageDuration, sub: `${timedRecords.length} timed records` },
  ]

  return (
    <>
      <PinModal
        title={dashboard.reviewTarget?.action === "reject" ? "Reject vehicle dispatch" : dashboard.reviewTarget?.action === "authorize" ? "Send vehicle dispatch for review" : "Approve vehicle dispatch"}
        open={dashboard.reviewTarget !== null}
        onClose={() => { dashboard.setReviewTarget(null); dashboard.setPinError("") }}
        onSubmit={(pin) => { void dashboard.handleReview(pin) }}
        requireRejectionReason={dashboard.reviewTarget?.action === "reject"}
        onSubmitReview={(pin, reason) => { void dashboard.handleReview(pin, reason) }}
        loading={dashboard.busy}
        error={dashboard.pinError}
      />
      <AreYouSureModal
        open={dashboard.pdfConfirmationOpen}
        onClose={() => dashboard.setPdfConfirmationOpen(false)}
        onConfirm={dashboard.printSelectedRecords}
        title="Create PDF for selected records?"
        description={`${dashboard.selectedRows.length} vehicle record${dashboard.selectedRows.length === 1 ? "" : "s"} will be included in the PDF.`}
        confirmLabel="Confirm"
      />
      <AreYouSureModal
        open={dashboard.archiveConfirmationOpen}
        onClose={() => dashboard.setArchiveConfirmationOpen(false)}
        onConfirm={dashboard.archiveSelectedRecords}
        title="Archive selected vehicle records?"
        description={`${dashboard.selectedRows.length} vehicle record${dashboard.selectedRows.length === 1 ? "" : "s"} will be moved to Archives.`}
        confirmLabel={dashboard.busy ? "Archiving…" : "Archive"}
        variant="danger"
      />
      <Modal large open={dashboard.selectedRecord !== null} onClose={() => dashboard.setSelectedRecord(null)} className="max-w-5xl">
        {dashboard.selectedRecord && <VehicularDispatchDetails record={dashboard.selectedRecord} onClose={() => dashboard.setSelectedRecord(null)} />}
      </Modal>

      <div className="space-y-7">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
        </div>

        {dashboard.dispatchError && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{dashboard.dispatchError}</p>}
        {dashboard.successMessage && <p role="status" className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{dashboard.successMessage}</p>}

        <section>
          <div className="mb-3 flex items-center gap-3">
            <h2 className="text-sm font-bold text-gray-900">Pending Approval Requests</h2>
            <span className="rounded-full bg-pink-100 px-2.5 py-0.5 text-[10px] font-semibold text-pink-700">
              {dashboard.pendingRows.length} {dashboard.pendingRows.length === 1 ? "request" : "requests"}
            </span>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <DataTable
              rows={dashboard.visiblePendingRows}
              rowKey={(record) => record.dispatchId}
              loading={dashboard.dispatchLoading}
              emptyMessage="No vehicle dispatches are waiting for review."
              columns={getVehicleRecordColumns({
                busy: dashboard.busy,
                canReview: dashboard.canReview,
                canReject: dashboard.canReject,
                role: dashboard.role,
                onView: dashboard.openDetails,
                onApprove: (record) => dashboard.openReview(record, "approve"),
                onReject: (record) => dashboard.openReview(record, "reject"),
              })}
            />
            {dashboard.pendingRows.length > VEHICLE_PAGE_SIZE && (
              <div className="flex justify-end border-t border-gray-100 px-4 py-3">
                <TablePagination currentPage={dashboard.pendingPage} pageCount={dashboard.pendingPageCount} onPageChange={dashboard.setPendingPage} />
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-gray-900">Reviewed Vehicle Records</h2>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                {dashboard.reviewedRows.length} {dashboard.reviewedRows.length === 1 ? "record" : "records"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TableSearch value={dashboard.search} onChange={dashboard.updateSearch} placeholder="Search vehicle records" ariaLabel="Search vehicle records" />
              <div className="relative">
                <button type="button" aria-label="Filter vehicle records" aria-expanded={dashboard.filterOpen} onClick={() => dashboard.setFilterOpen((open) => !open)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">
                  <Filter size={14} />
                </button>
                {dashboard.filterOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-44 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                    <label htmlFor="vehicle-status-filter" className="mb-1 block px-1 text-xs font-semibold text-gray-600">Status</label>
                    <select id="vehicle-status-filter" value={dashboard.statusFilter} onChange={(event) => dashboard.updateStatusFilter(event.target.value)} className="w-full rounded-md border border-gray-200 bg-white px-2 py-2 text-xs text-gray-700 outline-none focus:border-purple-400">
                      {STATUS_FILTERS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                  </div>
                )}
              </div>
              <button type="button" aria-label="Refresh vehicle logs" title="Refresh vehicle logs" onClick={() => void dashboard.loadDispatchRecords()} className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">
                <RefreshCw size={14} />
              </button>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <DataTable
              rows={dashboard.visibleReviewedRows}
              rowKey={(record) => record.dispatchId}
              loading={dashboard.dispatchLoading}
              emptyMessage="No reviewed vehicle records match your search or filter."
              columns={getVehicleRecordColumns({
                busy: dashboard.busy,
                selectedIds: dashboard.selectedIds,
                onToggleSelection: dashboard.toggleSelection,
                onView: dashboard.openDetails,
              })}
            />
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-4 py-3">
              <TablePagination currentPage={dashboard.reviewedPage} pageCount={dashboard.reviewedPageCount} onPageChange={dashboard.setReviewedPage} />
              <div className="flex items-center gap-2">
                {dashboard.canArchive && <CommonButton compact variant="gray" disabled={dashboard.busy || dashboard.selectedRows.length === 0} onClick={() => dashboard.setArchiveConfirmationOpen(true)}>Archive</CommonButton>}
                <CommonButton compact variant="gray" disabled={dashboard.selectedIds.length === 0 || dashboard.busy} onClick={() => dashboard.setSelectedIds([])}>Cancel</CommonButton>
                <CommonButton compact variant="orange" disabled={dashboard.dispatchLoading || dashboard.busy || dashboard.selectedRows.length === 0} onClick={() => dashboard.setPdfConfirmationOpen(true)}>Print PDF</CommonButton>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-gray-900">Vehicle Fleet</h2>
            <p className="mt-1 text-xs text-gray-500">Register vehicles available for dispatch.</p>
          </div>
          {dashboard.canManageFleet && (
            <form onSubmit={dashboard.handleAddVehicle} className="mb-5 flex flex-wrap items-end gap-3">
              <label className="flex min-w-48 flex-1 flex-col gap-1 text-xs font-medium text-gray-700">
                Vehicle name
                <input required maxLength={100} value={dashboard.vehicleName} onChange={(event) => dashboard.setVehicleName(event.target.value)} className="h-9 rounded-lg border border-gray-200 px-3 text-sm" placeholder="e.g. Barangay Mobile" />
              </label>
              <label className="flex min-w-40 flex-1 flex-col gap-1 text-xs font-medium text-gray-700">
                Plate number
                <input required maxLength={20} value={dashboard.plateNumber} onChange={(event) => dashboard.setPlateNumber(event.target.value)} className="h-9 rounded-lg border border-gray-200 px-3 text-sm uppercase" placeholder="ABC 1234" />
              </label>
              <CommonButton compact type="submit" disabled={dashboard.savingVehicle}>{dashboard.savingVehicle ? "Adding…" : "Add vehicle"}</CommonButton>
            </form>
          )}
          {dashboard.fleetError && <p role="alert" className="mb-3 text-sm text-red-700">{dashboard.fleetError}</p>}
          {dashboard.fleetMessage && <p role="status" className="mb-3 text-sm text-emerald-700">{dashboard.fleetMessage}</p>}
          {dashboard.fleetLoading ? <p className="text-sm text-gray-500">Loading vehicles…</p> : dashboard.fleetVehicles.length === 0 ? (
            <p className="text-sm text-gray-500">No vehicles have been registered yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-100 text-xs text-gray-500">
                  <tr>
                    <th className="py-2">Vehicle</th>
                    <th className="py-2">Plate number</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Current odometer</th>
                    {dashboard.canManageFleet && <th className="py-2" />}
                  </tr>
                </thead>
                <tbody>
                  {dashboard.fleetVehicles.map((vehicle) => (
                    <FleetVehicleRow
                      key={vehicle.vehicle_id}
                      vehicle={vehicle}
                      canEdit={dashboard.canManageFleet}
                      saving={dashboard.savingOdometerId === vehicle.vehicle_id}
                      detailsSaving={dashboard.savingDetailsId === vehicle.vehicle_id}
                      availabilitySaving={dashboard.updatingAvailabilityId === vehicle.vehicle_id}
                      onSave={dashboard.saveVehicleOdometer}
                      onSaveDetails={dashboard.saveVehicleDetails}
                      onAvailabilityChange={dashboard.toggleVehicleAvailability}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </>
  )
}

function getVehicleRecordColumns(actions: {
  busy?: boolean
  canReview?: boolean
  canReject?: boolean
  role?: string
  selectedIds?: string[]
  onToggleSelection?: (dispatchId: string) => void
  onView: (record: VehicleDispatchRecord) => void
  onApprove?: (record: VehicleDispatchRecord) => void
  onReject?: (record: VehicleDispatchRecord) => void
}) {
  return [
    ...(actions.onToggleSelection ? [{
      label: "Select",
      align: "center" as const,
      render: (record: VehicleDispatchRecord) => (
        <input
          type="checkbox"
          aria-label={`Select ${record.id}`}
          checked={actions.selectedIds?.includes(record.dispatchId) ?? false}
          disabled={actions.busy}
          onChange={() => actions.onToggleSelection?.(record.dispatchId)}
          className="h-4 w-4 rounded border-gray-300 accent-purple-700"
        />
      ),
    }] : []),
    { label: "Dispatch ID", accessor: "id" as const },
    { label: "Date", render: (record: VehicleDispatchRecord) => <DateCell date={record.date} /> },
    { label: "Vehicle", accessor: "vehicle" as const },
    { label: "Driver", accessor: "driver" as const },
    { label: "Responders", render: (record: VehicleDispatchRecord) => record.responders.join(", ") || "—" },
    { label: "Destination", accessor: "destination" as const },
    { label: "Total Time", accessor: "totalTime" as const },
    { label: "Transfer", render: (record: VehicleDispatchRecord) => record.transfers.join(", ") || "—" },
    { label: "Status", render: (record: VehicleDispatchRecord) => <TableStatus variant={getStatusVariant(record.status)} /> },
    {
      label: "Actions",
      align: "right" as const,
      render: (record: VehicleDispatchRecord) => (
        <div className="flex items-center justify-end gap-4">
          <button type="button" aria-label={`View ${record.id}`} title="View report" onClick={() => actions.onView(record)} className="text-gray-400 hover:text-gray-700">
            <ChevronRight size={16} />
          </button>
          {actions.canReview && actions.onApprove && (
            <button
              type="button"
              aria-label={actions.role === "TEAM_LEADER" ? `Send ${record.id} for review` : `Approve ${record.id}`}
              title={
                record.status ===
                  "TO_REVIEW" && actions.role === "TEAM_LEADER" 
                  ? "Waiting for administrator review" 
                  : actions.role === "TEAM_LEADER"
                    ? "Send to administrator review"
                    : "Approve report"
                }
              disabled={actions.busy || (record.status === "TO_REVIEW" && actions.role === "TEAM_LEADER")}
              onClick={() => actions.onApprove?.(record)}
              className="text-emerald-600 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Check size={16} strokeWidth={2.5} />
            </button>
          )}
          {actions.canReject && actions.onReject && (
            <button type="button" aria-label={`Reject ${record.id}`} title="Reject report" disabled={actions.busy} onClick={() => actions.onReject?.(record)} className="text-red-500 hover:text-red-600 disabled:opacity-40">
              <X size={16} strokeWidth={2.5} />
            </button>
          )}
        </div>
      ),
    },
  ]
}
