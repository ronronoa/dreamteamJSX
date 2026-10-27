import { useState } from "react";
import type { ReactNode } from "react";
import type { OperationRecord } from "@/api/operations";
import { API_URL } from "@/api/config";
import { formatDate, formatDateTime, formatTime } from "@/utils/dateTime";
import CommonButton from "@/components/common/widgets/CommonButton";
import ImagePreviewModal from "@/modules/reportForms/modal/ImagePreviewModal";
import { formatOperationId, formatPersonAddress } from "./operationUtils";
import ReportStatusBadge from "./ReportStatusBadge";
import { formatReportUser } from "@/utils/reportUser";

export default function OperationDetails({ record, onClose }: { record: OperationRecord; onClose: () => void }) {
  const [previewImage, setPreviewImage] = useState<OperationRecord["images"][number] | null>(null);
  const apiOrigin = API_URL.replace(/\/api\/?$/, "");
  const submitter = record.submitter?.name ?? record.submitter_name ?? "Unknown submitter";
  const submitterPinOwner = formatReportUser(record.submitter, "Unknown PIN owner");
  const reviewer = formatReportUser(record.validator, "—");
  const showReviewer = record.status === "VALIDATED" || record.status === "REJECTED";
  const reviewerLabel = record.status === "REJECTED" ? "Rejected by" : "Approved by";
  const teams = record.teamAssignments.map(({ team }) => team.team_name);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-200 pb-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-700">Operation log · {formatOperationId(record.operation_id)}</p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">{record.nature_of_operation}</h2>
          <p className="mt-1 text-xs text-gray-500">{formatDateTime(record.operation_date)} · Submitted by {submitter}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2 text-right">
          <ReportStatusBadge status={record.status} />
          {showReviewer && <p className="text-xs text-gray-500">
            <span className="font-semibold text-gray-700">{reviewerLabel}</span><br />{reviewer}
          </p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PreviewSection title="OPERATION DETAILS">
          <div className="grid grid-cols-2 gap-4">
            <PreviewField label="Submitter Name" value={submitter} />
            <PreviewField label="Submitted using PIN" value={submitterPinOwner} />
            <PreviewField label="Date" value={formatDate(record.operation_date)} />
            <PreviewField label="Nature of Operation" value={record.nature_of_operation} />
            <PreviewField label="Caller" value={record.name_of_caller} />
            <PreviewField label="Team Assigned" value={teams.length > 0 ? teams.join(", ") : record.team.team_name} />
            <PreviewField label="Responders" value={[...record.responders.map(({ user }) => user.name), ...record.other_responders].join(", ")} />
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
                  <td className="px-3 py-2">{formatPersonAddress(person)}</td>
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

      {record.status === "REJECTED" && record.rejected_reason && (
        <section className="rounded-md border border-red-200 bg-red-50 p-4">
          <h3 className="text-sm font-bold text-red-800">Rejection reason</h3>
          <p className="mt-1 whitespace-pre-wrap text-sm text-red-700">{record.rejected_reason}</p>
        </section>
      )}

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
