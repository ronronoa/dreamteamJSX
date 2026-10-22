import type { ReactNode } from "react"
import type { VehicleDispatchDetailRecord } from "@/api/vehicularDispatches"
import CommonButton from "@/components/common/widgets/CommonButton"
import TableStatus from "../../component/TableStatus"
import { formatDate, formatTime } from "@/utils/dateTime"
import { formatVehicularDispatchId } from "@/api/vehicularDispatches"

const STATUS_VARIANTS = {
  PENDING: "pending",
  VALIDATED: "approved",
  REJECTED: "rejected",
  ARCHIVED: "archived",
} as const

export default function VehicularDispatchDetails({
  record,
  onClose,
}: {
  record: VehicleDispatchDetailRecord
  onClose: () => void
}) {
  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-200 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-700">
            Vehicle dispatch · {formatVehicularDispatchId(record.dispatch_id)}
          </p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">{record.from_location} to {record.to_location}</h2>
          <p className="mt-1 text-xs text-gray-500">
            {formatDate(record.dispatch_date)} · Submitted by {record.submitter_name || "Unknown submitter"}
          </p>
        </div>
        <TableStatus variant={STATUS_VARIANTS[record.status]} />
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <DetailsSection title="DISPATCH DETAILS">
          <DetailsGrid fields={[
            ["From", record.from_location], ["To", record.to_location],
            ["Vehicle", record.plate_number ? `${record.vehicle_name} (${record.plate_number})` : record.vehicle_name],
            ["Driver", record.driver_name], ["Departure", formatTime(record.depart_time)],
            ["Arrival", formatTime(record.arrival_time)], ["Transfer", record.transfers.join(", ")],
            ["Responders", record.responders.join(", ")],
            ["Odometer out", record.odometer_out === null ? "—" : `${record.odometer_out} km`],
            ["Odometer in", record.odometer_in === null ? "—" : `${record.odometer_in} km`],
          ]} />
        </DetailsSection>

        <DetailsSection title="PASSENGERS">
          {record.passengers.length === 0 ? <p className="text-sm text-gray-500">No passengers were recorded.</p> : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-100 text-xs text-gray-500">
                  <tr><th className="py-2 pr-3">Name</th><th className="py-2 pr-3">Age</th><th className="py-2 pr-3">Sex</th><th className="py-2">Contact</th></tr>
                </thead>
                <tbody>
                  {record.passengers.map((passenger) => (
                    <tr key={passenger.passenger_id} className="border-b border-gray-50 last:border-0">
                      <td className="py-2 pr-3">{passenger.full_name}</td>
                      <td className="py-2 pr-3">{passenger.age}</td>
                      <td className="py-2 pr-3">{passenger.sex.toLowerCase()}</td>
                      <td className="py-2">{passenger.contact_no || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </DetailsSection>
      </div>

      <DetailsSection title="PASSENGER ADDRESSES">
        {record.passengers.length === 0 ? <p className="text-sm text-gray-500">No passenger addresses were recorded.</p> : (
          <ul className="divide-y divide-gray-100 text-sm">
            {record.passengers.map((passenger) => (
              <li key={passenger.passenger_id} className="flex flex-wrap justify-between gap-2 py-2">
                <span className="font-medium text-slate-800">{passenger.full_name}</span>
                <span className="text-gray-600">{passenger.address || "—"}</span>
              </li>
            ))}
          </ul>
        )}
      </DetailsSection>

      {record.status === "REJECTED" && record.rejected_reason && (
        <section className="rounded-lg border border-red-200 bg-red-50 p-4">
          <h3 className="text-sm font-bold text-red-800">Rejection reason</h3>
          <p className="mt-1 whitespace-pre-wrap text-sm text-red-700">{record.rejected_reason}</p>
        </section>
      )}

      <div className="flex justify-end border-t border-gray-200 pt-3">
        <CommonButton variant="gray" onClick={onClose}>Close</CommonButton>
      </div>
    </div>
  )
}

function DetailsSection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="rounded-lg border border-gray-200 bg-white p-4"><h3 className="mb-3 border-b border-gray-100 pb-2 text-sm font-bold text-slate-800">{title}</h3>{children}</section>
}

function DetailsGrid({ fields }: { fields: Array<[string, string | null | undefined]> }) {
  return <dl className="grid grid-cols-2 gap-x-4 gap-y-3">{fields.map(([label, value]) => <div key={label} className="min-w-0"><dt className="text-[10px] font-bold uppercase tracking-wide text-gray-500">{label}</dt><dd className="break-words text-sm text-slate-900">{value || "—"}</dd></div>)}</dl>
}
