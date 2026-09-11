import { Paperclip } from "lucide-react"

import CommonFormSection from "../CommonFormSection"
import SummaryField from "../SummaryField"
import ImagePreviewModal from "./ImagePreviewModal"

import type { OperationLogData, Person, PersonName } from "../../../types/operationLog"
import { useState } from "react"

type OperationStep4Props = {
  formData: OperationLogData
}

const formatPersonName = (name: PersonName) => {
  const mi = name.middleInitial ? `${name.middleInitial}.` : ""
  return `${name.surname}, ${name.firstName} ${mi} ${name.suffix}`.replace(/\s+/g, " ").trim()
}

const formatPersonAddress = (person: Person) => {
  const { phase, package: pkg, block, lot } = person.address
  return `P${phase} PK${pkg} B${block} L${lot}`
}

export default function OperationStep4({ formData }: OperationStep4Props) {
  const { operationDetails, dispatch, people, operationDescription, inventory } = formData
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)

  const previewFile =
    previewIndex !== null
      ? operationDescription.images[previewIndex]
      : null

  return (
    <main className="flex w-full flex-col gap-4">

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CommonFormSection title="OPERATION DETAILS" standardHeight={false}>
          <div className="grid grid-cols-2 gap-4">
            <SummaryField label="Submitter Name" value={operationDetails.submitterName} />
            <SummaryField label="Date" value={operationDetails.date} />
            <SummaryField label="Nature of Operation" value={operationDetails.natureOfOperation} />
            <SummaryField label="Caller" value={formatPersonName(operationDetails.caller)} />
            <SummaryField label="Team Assigned" value={operationDetails.teamAssigned.join(", ")} />
            <SummaryField label="Responders" value={operationDetails.responders.join(", ")} />
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
            <SummaryField label="Odometer In" value={dispatch.odometerIn && `${dispatch.odometerIn} km`} />
            <SummaryField label="Odometer Out" value={dispatch.odometerOut && `${dispatch.odometerOut} km`} />
          </div>
        </CommonFormSection>
      </section>

      <CommonFormSection title="PEOPLE INVOLVED" standardHeight={false}>
        <div className="overflow-x-auto rounded-md border border-purple-400">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#180024] text-left text-white">
                <th className="border-r border-gray-600 px-3 py-2">Name</th>
                <th className="w-16 border-r border-gray-600 px-3 py-2">Age</th>
                <th className="w-16 border-r border-gray-600 px-3 py-2">Sex</th>
                <th className="w-36 border-r border-gray-600 px-3 py-2">Contact Number</th>
                <th className="px-3 py-2">Address</th>
              </tr>
            </thead>

            <tbody>
              {people.map((person) => (
                <tr key={person.id} className="border-b border-gray-200">
                  <td className="border-r border-gray-200 px-3 py-2">{formatPersonName(person.name)}</td>
                  <td className="border-r border-gray-200 px-3 py-2">{person.age}</td>
                  <td className="border-r border-gray-200 px-3 py-2">{person.sex}</td>
                  <td className="border-r border-gray-200 px-3 py-2">{person.contactNumber}</td>
                  <td className="px-3 py-2">{formatPersonAddress(person)}</td>
                </tr>
              ))}

              {people.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-4 text-center text-gray-400">
                    No people added.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CommonFormSection>

      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <div className="flex w-full flex-col gap-4 sm:min-h-0">
          <CommonFormSection
            title="OPERATION DESCRIPTION"
            standardHeight={false}
            scrollable
            className="lg:min-h-[200px] sm:flex-1"
          >
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-900">
              {operationDescription.description || "—"}
            </p>
          </CommonFormSection>

          <CommonFormSection
            title="INVENTORY USED"
            standardHeight={false}
            scrollable
            className="lg:min-h-[250px] lg:max-h-[500px]"
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

        <CommonFormSection title="ATTACHED IMAGE" standardHeight={false} scrollable className="w-full sm:min-h-0">
          <div className="space-y-2">
            {operationDescription.images.map((file, index) => (
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

                <span className="shrink-0 text-xs uppercase tracking-wide text-gray-400">View</span>
              </button>
            ))}

            {operationDescription.images.length === 0 && (
              <p className="text-sm text-gray-400">No images attached.</p>
            )}
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
