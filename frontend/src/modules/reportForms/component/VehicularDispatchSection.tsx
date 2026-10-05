import CommonInput from "../../../components/common/widgets/CommonInput"
import CommonSelect from "../../../components/common/widgets/CommonSelect"
import CommonTimeInput from "../../../components/common/widgets/CommonTimeInput"
import CommonFormSection from "./CommonFormSection"

import type { VehicularDispatch } from "../../../types/operationLog"

const DEFAULT_VEHICLE_OPTIONS = [
  { label: "Vehicle 1", value: "vehicle-1" },
  { label: "Vehicle 2", value: "vehicle-2" },
]

type VehicularDispatchSectionProps = {
  dispatch: VehicularDispatch
  onDispatchChange: (patch: Partial<VehicularDispatch>) => void
  vehicleOptions?: { label: string; value: string }[]
  title?: string
}

export default function VehicularDispatchSection({
  dispatch,
  onDispatchChange,
  vehicleOptions = DEFAULT_VEHICLE_OPTIONS,
  title = "VEHICULAR DISPATCH",
}: VehicularDispatchSectionProps) {
  return (
    <CommonFormSection title={title}>
      <div className="space-y-4">
        <CommonInput
          variant="compact"
          label="From"
          placeholder="Ex. Barangay Hall"
          value={dispatch.from}
          onChange={(e) => onDispatchChange({ from: e.target.value })}
        />

        <CommonInput
          variant="compact"
          label="To"
          placeholder="Ex. Barangay Hall"
          value={dispatch.to}
          onChange={(e) => onDispatchChange({ to: e.target.value })}
        />

        <CommonSelect
          variant="compact"
          label="Vehicle"
          placeholder="Dropdown Menu"
          options={vehicleOptions}
          value={dispatch.vehicle}
          onChange={(e) => onDispatchChange({ vehicle: e.target.value })}
        />

        <CommonInput
          variant="compact"
          label="Driver"
          placeholder="Ex. Barangay Hall"
          value={dispatch.driver}
          onChange={(e) => onDispatchChange({ driver: e.target.value })}
        />

        <div className="grid grid-cols-2 gap-5">
          <CommonTimeInput
            label="Depart"
            time={dispatch.departTime}
            period={dispatch.departPeriod}
            onTimeChange={(value) => onDispatchChange({ departTime: value })}
            onPeriodChange={(value) => onDispatchChange({ departPeriod: value })}
          />

          <CommonTimeInput
            label="Arrival"
            time={dispatch.arrivalTime}
            period={dispatch.arrivalPeriod}
            onTimeChange={(value) => onDispatchChange({ arrivalTime: value })}
            onPeriodChange={(value) => onDispatchChange({ arrivalPeriod: value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <CommonInput
            variant="compact"
            type="number"
            label="Odometer In"
            placeholder="123456"
            value={dispatch.odometerIn}
            onChange={(e) => onDispatchChange({ odometerIn: e.target.value })}
          />

          <CommonInput
            variant="compact"
            type="number"
            label="Odometer Out"
            placeholder="123456"
            value={dispatch.odometerOut}
            onChange={(e) => onDispatchChange({ odometerOut: e.target.value })}
          />
        </div>
      </div>
    </CommonFormSection>
  )
}
