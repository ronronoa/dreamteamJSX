import { Paperclip } from "lucide-react"

import CommonFormSection from "../component/CommonFormSection"
import SummaryField from "../component/SummaryField"
import ImagePreviewModal from "../modal/ImagePreviewModal"

import type {
  PatientLogData,
  PersonName,
} from "../../../types/patientLog"
import { useState } from "react"

type PatientStep4Props = {
  formData: PatientLogData
}

const formatPersonName = (name: PersonName) => {
  const mi = name.middleInitial ? `${name.middleInitial}.` : ""
  return `${name.surname}, ${name.firstName} ${mi} ${name.suffix}`
    .replace(/\s+/g, " ")
    .trim()
}

export default function PatientStep4({ formData }: PatientStep4Props) {
  const {
    responderDetails,
    dispatch,
    patientDetails,
    firstAidHospital,
    waiverForm,
    inventory,
  } = formData

  const [previewIndex, setPreviewIndex] = useState<number | null>(null)

  const previewFile =
    previewIndex !== null ? waiverForm.images[previewIndex] : null

  const { phase, package: pkg, block, lot } = patientDetails.address

  return (
    <main className="flex w-full flex-col gap-4">
      {/* ---------------- RESPONDER + DISPATCH ---------------- */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CommonFormSection title="RESPONDER DETAILS" standardHeight={false}>
          <div className="grid grid-cols-2 gap-4">
            <SummaryField label="Submitter Name" value={responderDetails.submitterName} />
            <SummaryField label="Date" value={responderDetails.date} />
            <SummaryField label="Type of Request" value={responderDetails.typeOfRequest} />
            <SummaryField label="Caller" value={formatPersonName(responderDetails.caller)} />
            <SummaryField label="Team Assigned" value={responderDetails.teamAssigned.join(", ")} />
            <SummaryField label="Responders" value={responderDetails.responders.join(", ")} />
          </div>
        </CommonFormSection>

        <CommonFormSection title="VEHICULAR DISPATCH" standardHeight={false}>
          <div className="grid grid-cols-2 gap-4">
            <SummaryField label="From" value={dispatch.from} />
            <SummaryField label="To" value={dispatch.to} />
            <SummaryField label="Vehicle" value={dispatch.vehicle} />
            <SummaryField label="Driver" value={dispatch.driver} />
            <SummaryField
              label="Depart"
              value={dispatch.departTime && `${dispatch.departTime} ${dispatch.departPeriod}`}
            />
            <SummaryField
              label="Arrival"
              value={dispatch.arrivalTime && `${dispatch.arrivalTime} ${dispatch.arrivalPeriod}`}
            />
            <SummaryField
              label="Odometer In"
              value={dispatch.odometerIn && `${dispatch.odometerIn} km`}
            />
            <SummaryField
              label="Odometer Out"
              value={dispatch.odometerOut && `${dispatch.odometerOut} km`}
            />
          </div>
        </CommonFormSection>
      </section>

      {/* ---------------- PATIENT DETAILS ---------------- */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CommonFormSection title="PATIENT DETAILS" standardHeight={false}>
          <div className="grid grid-cols-2 gap-4">
            <SummaryField label="Patient Name" value={formatPersonName(patientDetails.name)} />
            <SummaryField label="Birthdate" value={patientDetails.birthdate} />
            <SummaryField label="Age" value={patientDetails.age !== "" ? String(patientDetails.age) : ""} />
            <SummaryField label="Sex" value={patientDetails.sex} />
            <SummaryField label="Contact Person" value={formatPersonName(patientDetails.contactPerson)} />
            <SummaryField label="Contact Number" value={patientDetails.contactNumber} />
            <SummaryField
              label="Address"
              value={`P${phase} PK${pkg} B${block} L${lot}`}
            />
          </div>
        </CommonFormSection>

        {/* ---------------- FIRST AID & HOSPITAL ---------------- */}
        <CommonFormSection title="FIRST AID & HOSPITAL DETAILS" standardHeight={false}>
          <div className="grid grid-cols-2 gap-4">
            <SummaryField label="BP" value={firstAidHospital.bp} />
            <SummaryField label="PR" value={firstAidHospital.pr} />
            <SummaryField label="SPO2" value={firstAidHospital.spo2} />
            <SummaryField label="Temp" value={firstAidHospital.temp} />
            <SummaryField label="Hospital Name" value={firstAidHospital.hospitalName} />
            <SummaryField
              label="Hospital Representative"
              value={formatPersonName(firstAidHospital.hospitalRepresentative)}
            />
            <SummaryField
              label="Hospital In"
              value={
                firstAidHospital.hospitalInTime &&
                  `${firstAidHospital.hospitalInTime} ${firstAidHospital.hospitalInPeriod}`
              }
            />
            <SummaryField
              label="Hospital Out"
              value={
                firstAidHospital.hospitalOutTime &&
                  `${firstAidHospital.hospitalOutTime} ${firstAidHospital.hospitalOutPeriod}`
              }
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <p className="mb-1 text-sm font-semibold text-slate-700">Medical Assessment</p>
              <p className="whitespace-pre-wrap rounded-md border border-gray-200 bg-gray-50 p-3 text-sm text-slate-900">
                {firstAidHospital.medicalAssessment || "—"}
              </p>
            </div>

            <div>
              <p className="mb-1 text-sm font-semibold text-slate-700">First Aid Given</p>
              <p className="whitespace-pre-wrap rounded-md border border-gray-200 bg-gray-50 p-3 text-sm text-slate-900">
                {firstAidHospital.firstAidGiven || "—"}
              </p>
            </div>
          </div>
        </CommonFormSection>
      </section>

      {/* ---------------- INVENTORY + WAIVER ---------------- */}
      <div className="flex w-full flex-col gap-4 lg:flex-row">

        <CommonFormSection
          title="WAIVER FORM"
          standardHeight={false}
          scrollable
          className="w-full sm:min-h-0"
        >
          <div className="space-y-2">
            {waiverForm.images.map((file, index) => (
              <button
                key={`${file.name}-${index}`}
                type="button"
                onClick={() => setPreviewIndex(index)}
                className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm italic text-gray-700 transition hover:border-purple-400 hover:bg-gray-50"
              >
                <span className="flex items-center gap-2 truncate">
                  <Paperclip size={14} className="shrink-0 text-orange-500" />
                  {file.name}
                </span>

                <span className="shrink-0 text-xs uppercase tracking-wide text-gray-400">
                  View
                </span>
              </button>
            ))}

            {waiverForm.images.length === 0 && (
              <p className="text-sm text-gray-400">No images attached.</p>
            )}
          </div>
        </CommonFormSection>

        <CommonFormSection
          title="INVENTORY USED"
          standardHeight={false}
          scrollable
          className="w-full lg:max-h-[500px]"
        >
          <div className="overflow-x-auto rounded-md">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#180024] text-left text-white">
                  <th className="px-3 py-2">Item Name</th>
                  <th className="px-3 py-2 text-right">Quantity</th>
                </tr>
              </thead>

              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="px-3 py-2">{item.itemName}</td>
                    <td className="px-3 py-2 text-right">{item.quantity}</td>
                  </tr>
                ))}

                {inventory.length === 0 && (
                  <tr>
                    <td colSpan={2} className="px-3 py-4 text-center text-gray-400">
                      No items added.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CommonFormSection>
      </div>

      <ImagePreviewModal
        open={previewIndex !== null}
        onClose={() => setPreviewIndex(null)}
        file={previewFile}
      />
    </main>
  )
}
