import CommonFormSection from "../component/CommonFormSection"
import SummaryField from "../component/SummaryField"
import type { Person } from "../../../types/vehicularDispatchReport"
import type { VehicularDispatchReportData } from "../../../types/vehicularDispatchReport"
import type { VehicularDispatchErrors } from "./formValidation"

type VehicularStep3Props = {
  formData: VehicularDispatchReportData
  vehicleLabel: string
  responderLabels: string[]
  onEditStep: (step: number) => void
  errors: VehicularDispatchErrors
}

function formatPersonName(person: Person): string {
  const { surname, firstName, middleInitial, suffix } = person.name
  const middleName = middleInitial ? `${middleInitial}.` : ""
  return `${surname}, ${firstName} ${middleName} ${suffix}`.replace(/\s+/g, " ").trim()
}

function formatPersonAddress(person: Person): string {
  const { phase, package: packageNumber, block, lot } = person.address
  return [phase && `Phase ${phase}`, packageNumber && `Package ${packageNumber}`, block && `Block ${block}`, lot && `Lot ${lot}`]
    .filter(Boolean)
    .join(", ") || "—"
}

export default function VehicularStep3({ formData, vehicleLabel, responderLabels, onEditStep, errors }: VehicularStep3Props) {
  const { details, dispatch, passengers } = formData

  return (
    <main className="flex w-full flex-col gap-4">
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CommonFormSection title="RESPONDER DETAILS" standardHeight={false} onClick={() => onEditStep(1)} hasError={hasErrorsForPrefix(errors, "details")}>
          <div className="grid grid-cols-2 gap-4">
            <SummaryField label="Submitter Name" value={details.submitterName} />
            <SummaryField label="Date" value={details.date} />
            <SummaryField label="Time" value={details.time} />
            <SummaryField label="Responders" value={responderLabels.join(", ")} />
            <SummaryField label="Transfer" value={details.transfers.join(", ")} />
          </div>
        </CommonFormSection>

        <CommonFormSection title="VEHICULAR DISPATCH" standardHeight={false} onClick={() => onEditStep(1)} hasError={hasErrorsForPrefix(errors, "dispatch")}>
          <div className="grid grid-cols-2 gap-4">
            <SummaryField label="From" value={dispatch.from} />
            <SummaryField label="To" value={dispatch.to} />
            <SummaryField label="Vehicle" value={dispatch.vehicle === "none" ? "None" : dispatch.vehicle === "other" ? dispatch.vehicleOther : vehicleLabel} />
            <SummaryField label="Driver" value={dispatch.vehicle === "none" ? "—" : dispatch.driver} />
            <SummaryField label="Depart" value={dispatch.departTime && `${dispatch.departTime} ${dispatch.departPeriod}`} />
            <SummaryField label="Arrival" value={dispatch.arrivalTime && `${dispatch.arrivalTime} ${dispatch.arrivalPeriod}`} />
            <SummaryField label="Odometer In" value={dispatch.odometerIn && `${dispatch.odometerIn} km`} />
            <SummaryField label="Odometer Out" value={dispatch.odometerOut && `${dispatch.odometerOut} km`} />
          </div>
        </CommonFormSection>
      </section>

      <CommonFormSection title="CIVILIAN PASSENGERS" standardHeight={false} onClick={() => onEditStep(2)} hasError={hasErrorsForPrefix(errors, "passengers")}>
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
              {passengers.map((person) => (
                <tr key={person.id} className="border-b border-gray-200">
                  <td className="border-r border-gray-200 px-3 py-2">{formatPersonName(person)}</td>
                  <td className="border-r border-gray-200 px-3 py-2">{person.age}</td>
                  <td className="border-r border-gray-200 px-3 py-2">{person.gender}</td>
                  <td className="border-r border-gray-200 px-3 py-2">{person.contactNumber || "—"}</td>
                  <td className="px-3 py-2">{formatPersonAddress(person)}</td>
                </tr>
              ))}
              {passengers.length === 0 && (
                <tr><td colSpan={5} className="px-3 py-4 text-center text-gray-500">No passengers added.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </CommonFormSection>
    </main>
  )
}

function hasErrorsForPrefix(errors: VehicularDispatchErrors, prefix: string): boolean {
  return Object.keys(errors).some((field) => field === prefix || field.startsWith(`${prefix}.`))
}
