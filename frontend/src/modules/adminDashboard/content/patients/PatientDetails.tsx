import type { ReactNode } from "react";
import { useState } from "react";
import type { PatientLogRecord } from "@/api/patients";
import { API_URL } from "@/api/config";
import CommonButton from "@/components/common/widgets/CommonButton";
import ImagePreviewModal from "@/modules/reportForms/modal/ImagePreviewModal";
import { formatDate, formatDateTime, formatTime } from "@/utils/dateTime";
import PatientStatusBadge from "./PatientStatusBadge";
import { formatPatientLogId } from "./patientUtils";

export default function PatientDetails({ record, onClose }: { record: PatientLogRecord; onClose: () => void }) {
  const [selectedImage, setSelectedImage] = useState<PatientLogRecord["patient"]["images"][number] | null>(null);
  const apiOrigin = API_URL.replace(/\/api\/?$/, "");
  const reportData = record.report_data && typeof record.report_data === "object"
    ? record.report_data as Record<string, unknown>
    : {};
  const patientDetails = reportData.patientDetails && typeof reportData.patientDetails === "object"
    ? reportData.patientDetails as Record<string, unknown>
    : {};
  const firstAid = reportData.firstAidHospital && typeof reportData.firstAidHospital === "object"
    ? reportData.firstAidHospital as Record<string, unknown>
    : {};
  const responderDetails = reportData.responderDetails && typeof reportData.responderDetails === "object"
    ? reportData.responderDetails as Record<string, unknown>
    : {};
  const inventory = Array.isArray(reportData.inventory) ? reportData.inventory as Array<Record<string, unknown>> : [];
  const dispatch = record.dispatches[0];

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-200 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-700">Patient log · {formatPatientLogId(record.patient_log_id)}</p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">{record.patient.full_name}</h2>
          <p className="mt-1 text-xs text-gray-500">{formatDateTime(record.log_date)} · Submitted by {record.submitter?.name ?? record.submitter_name ?? "Unknown submitter"}</p>
        </div>
        <PatientStatusBadge status={record.status} />
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <DetailsSection title="PATIENT">
          <DetailsGrid fields={[
            ["Name", record.patient.full_name], ["Birthdate", formatDate(record.patient.birthday)],
            ["Age", String(patientDetails.age ?? "—")], ["Sex", record.patient.sex],
            ["Contact Person", record.patient.contact_person], ["Contact Number", record.patient.contact_number],
            ["Address", [record.patient.phase, record.patient.package, record.patient.block, record.patient.lot].filter(Boolean).join(" · ")],
          ]} />
        </DetailsSection>
        <DetailsSection title="REPORT">
          <DetailsGrid fields={[
            ["Request Type", record.type_of_request.replaceAll("_", " ")], ["Caller", record.name_of_caller],
            ["Transfer", Array.isArray(responderDetails.teamAssigned) ? responderDetails.teamAssigned.join(", ") : ""],
            ["Submitter", record.submitter?.name ?? record.submitter_name], ["Responders", record.responders.map(({ user }) => user.name).join(", ")],
            ["Medical Assessment", record.medical_assessment], ["First Aid Given", String(firstAid.firstAidGiven ?? "")],
            ["Waiver Description", record.waiver_description],
          ]} />
        </DetailsSection>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <DetailsSection title="VITALS AND HOSPITAL">
          <DetailsGrid fields={[
            ["BP", record.bp], ["Pulse", record.pr], ["SpO₂", record.spo2], ["Temperature", record.temp],
            ["Hospital", record.hospital_name], ["Representative", record.hospital_representative],
            ["Hospital In", formatTime(record.hospital_in_time)], ["Hospital Out", formatTime(record.hospital_out_time)],
          ]} />
        </DetailsSection>
        <DetailsSection title="VEHICULAR DISPATCH">
          {dispatch ? <DetailsGrid fields={[
            ["From", dispatch.from_location], ["To", dispatch.to_location],
            ["Vehicle", dispatch.vehicle ? `${dispatch.vehicle.vehicle_name} (${dispatch.vehicle.plate_number})` : "—"],
            ["Driver", dispatch.driver_name], ["Depart", formatTime(dispatch.depart_time)], ["Arrival", formatTime(dispatch.arrival_time)],
            ["Odometer In", dispatch.odometer_in === null ? "—" : `${dispatch.odometer_in} km`],
            ["Odometer Out", dispatch.odometer_out === null ? "—" : `${dispatch.odometer_out} km`],
          ]} /> : <p className="text-sm text-gray-500">No dispatch information.</p>}
        </DetailsSection>
      </section>

      <DetailsSection title="INVENTORY USED">
        {inventory.length === 0 ? <p className="text-sm text-gray-500">No inventory was recorded.</p> : (
          <ul className="divide-y divide-gray-100 text-sm">
            {inventory.map((item, index) => <li key={`${String(item.id)}-${index}`} className="flex justify-between gap-4 py-2"><span>{String(item.itemName ?? "Inventory item")}</span><span>{String(item.quantity ?? "")}</span></li>)}
          </ul>
        )}
      </DetailsSection>

      <DetailsSection title="ATTACHED WAIVER IMAGES">
        {record.patient.images.length === 0 ? <p className="text-sm text-gray-500">No waiver images attached.</p> : (
          <div className="space-y-2">
            {record.patient.images.map((image) => (
              <button key={image.attachment_id} type="button" onClick={() => setSelectedImage(image)} className="block w-full truncate rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-left text-sm text-purple-800 hover:border-purple-300">
                {image.image_url.split("/").pop() || "Patient attachment"}
              </button>
            ))}
          </div>
        )}
      </DetailsSection>

      <ImagePreviewModal
        open={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        file={null}
        image={selectedImage ? {
          name: selectedImage.image_url.split("/").pop() || "Patient attachment",
          url: `${apiOrigin}${selectedImage.image_url}`,
        } : null}
      />

      {record.status === "REJECTED" && record.rejected_reason && (
        <section className="rounded-lg border border-red-200 bg-red-50 p-4">
          <h3 className="text-sm font-bold text-red-800">Rejection reason</h3>
          <p className="mt-1 whitespace-pre-wrap text-sm text-red-700">{record.rejected_reason}</p>
        </section>
      )}

      <div className="flex justify-end border-t border-gray-200 pt-3"><CommonButton variant="gray" onClick={onClose}>Close</CommonButton></div>
    </div>
  );
}

function DetailsSection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="rounded-lg border border-gray-200 bg-white p-4"><h3 className="mb-3 border-b border-gray-100 pb-2 text-sm font-bold text-slate-800">{title}</h3>{children}</section>;
}

function DetailsGrid({ fields }: { fields: Array<[string, string | null | undefined]> }) {
  return <dl className="grid grid-cols-2 gap-x-4 gap-y-3">{fields.map(([label, value]) => <div key={label} className="min-w-0"><dt className="text-[10px] font-bold uppercase tracking-wide text-gray-500">{label}</dt><dd className="break-words text-sm text-slate-900">{value || "—"}</dd></div>)}</dl>;
}
