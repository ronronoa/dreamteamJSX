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
  const [previewedImage, setPreviewedImage] = useState<{ name: string; url: string } | null>(null);
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
  const reportDispatch = reportData.dispatch && typeof reportData.dispatch === "object"
    ? reportData.dispatch as Record<string, unknown>
    : {};
  const legacyDisposition = Array.isArray(responderDetails.teamAssigned)
    ? responderDetails.teamAssigned[0]
    : responderDetails.teamAssigned;
  const disposition = responderDetails.dispositionType ?? legacyDisposition;
  const transferLabel = disposition === "PICK_UP" || disposition === "Pick-Up" || disposition === "pick-up"
    ? "Pick-Up"
    : disposition === "DROP_OFF" || disposition === "Drop-Off" || disposition === "drop-off"
      ? "Drop-Off"
      : "";
  const savedOtherResponders = Array.isArray(responderDetails.otherResponders)
    ? responderDetails.otherResponders.filter((name): name is string => typeof name === "string")
    : [];
  const responderNames = [
    ...record.responders.map(({ user }) => user.name),
    ...savedOtherResponders,
  ];
  const inventory = Array.isArray(reportData.inventory) ? reportData.inventory as Array<Record<string, unknown>> : [];
  const dispatch = record.dispatches[0];
  const formImagePath = record.form_image;

  function getImagePreviewUrl(imagePath: string) {
    if (/^https?:\/\//i.test(imagePath)) return imagePath;
    return `${apiOrigin}${imagePath}`;
  }

  function openImagePreview(imagePath: string, fallbackName: string) {
    setPreviewedImage({
      name: imagePath.split("/").pop() || fallbackName,
      url: getImagePreviewUrl(imagePath),
    });
  }

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
            ["Transfer", transferLabel],
            ["Submitter", record.submitter?.name ?? record.submitter_name], ["Responders", responderNames.join(", ")],
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
            ["Driver", dispatch.driver_name || String(reportDispatch.driver ?? "")], ["Depart", formatTime(dispatch.depart_time)], ["Arrival", formatTime(dispatch.arrival_time)],
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

      {formImagePath && (
        <DetailsSection title="SCANNED PHYSICAL FORM">
          <button
            type="button"
            onClick={() => openImagePreview(formImagePath, "Scanned patient form")}
            className="block w-full rounded-md border border-gray-200 bg-gray-50 p-3 text-left text-sm text-purple-800 hover:border-purple-300"
          >
            <img
              src={getImagePreviewUrl(formImagePath)}
              alt="Scanned physical patient log form"
              className="max-h-96 w-full rounded object-contain"
            />
            <span className="mt-2 block truncate">
              {formImagePath.split("/").pop() || "Scanned patient form"}
            </span>
          </button>
        </DetailsSection>
      )}

      <DetailsSection title="ATTACHED WAIVER IMAGES">
        {record.patient.images.length === 0 ? <p className="text-sm text-gray-500">No waiver images attached.</p> : (
          <div className="space-y-2">
            {record.patient.images.map((image) => (
              <button key={image.attachment_id} type="button" onClick={() => openImagePreview(image.image_url, "Patient attachment")} className="block w-full truncate rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-left text-sm text-purple-800 hover:border-purple-300">
                {image.image_url.split("/").pop() || "Patient attachment"}
              </button>
            ))}
          </div>
        )}
      </DetailsSection>

      <ImagePreviewModal
        open={previewedImage !== null}
        onClose={() => setPreviewedImage(null)}
        file={null}
        image={previewedImage}
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
