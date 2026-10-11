import CommonInput from "../../../components/common/widgets/CommonInput"
import CommonSelect from "../../../components/common/widgets/CommonSelect"
import CommonTimeInput from "../../../components/common/widgets/CommonTimeInput"
import CommonFormSection from "./CommonFormSection"
import type { FormErrors } from "../OperationLogForm/formValidation"

import type { VehicularDispatch } from "../../../types/operationLog"

const OTHER_VEHICLE_VALUE = "other"

const DEFAULT_VEHICLE_OPTIONS = [
  { label: "Vehicle 1", value: "vehicle-1" },
  { label: "Vehicle 2", value: "vehicle-2" },
]

type VehicularDispatchSectionProps = {
  dispatch: VehicularDispatch
  onDispatchChange: (patch: Partial<VehicularDispatch>) => void
  vehicleOptions?: { label: string; value: string }[]
  errors?: FormErrors
  optionsLoading?: boolean
  title?: string
}

export default function VehicularDispatchSection({
  dispatch,
  onDispatchChange,
  vehicleOptions = DEFAULT_VEHICLE_OPTIONS,
  errors = {},
  optionsLoading = false,
  title = "VEHICULAR DISPATCH",
}: VehicularDispatchSectionProps) {
  // Always append "Other" — skip if caller already supplied it.
  const optionsWithOther = vehicleOptions.some(
    (opt) => opt.value === OTHER_VEHICLE_VALUE
  )
    ? vehicleOptions
    : [...vehicleOptions, { label: "Other", value: OTHER_VEHICLE_VALUE }]

  const isOtherVehicle = dispatch.vehicle === OTHER_VEHICLE_VALUE

  return (
    <CommonFormSection title={title}>
      <div className="space-y-4">
        <CommonInput
          variant="compact"
          label="From"
          placeholder="Ex. Barangay Hall"
          value={dispatch.from}
          onChange={(e) => onDispatchChange({ from: e.target.value })}
          errorMessage={errors["dispatch.from"]}
        />

        <CommonInput
          variant="compact"
          label="To"
          placeholder="Ex. Barangay Hall"
          value={dispatch.to}
          onChange={(e) => onDispatchChange({ to: e.target.value })}
          errorMessage={errors["dispatch.to"]}
        />

        <CommonSelect
          variant="compact"
          label="Vehicle"
          placeholder="Dropdown Menu"
          options={optionsWithOther}
          value={dispatch.vehicle}
          onChange={(e) => onDispatchChange({ vehicle: e.target.value })}
          disabled={optionsLoading}
          errorMessage={errors["dispatch.vehicle"]}
        />

        {isOtherVehicle && (
          <>
            <CommonInput
              variant="compact"
              label="Specify Vehicle"
              placeholder="Ex. Barangay Ambulance"
              value={dispatch.vehicleOther ?? ""}
              onChange={(e) =>
                onDispatchChange({ vehicleOther: e.target.value })
              }
              errorMessage={errors["dispatch.vehicleOther"]}
            />
          </>
        )}

        <CommonInput
          variant="compact"
          label="Driver"
          placeholder="e.g Juan Cruz"
          value={dispatch.driver}
          onChange={(e) => onDispatchChange({ driver: e.target.value })}
          errorMessage={errors["dispatch.driver"]}
        />

        <div className="grid grid-cols-2 gap-5">
          <div>
            <CommonTimeInput
              label="Depart"
              time={dispatch.departTime}
              period={dispatch.departPeriod}
              onTimeChange={(value) => onDispatchChange({ departTime: value })}
              onPeriodChange={(value) => onDispatchChange({ departPeriod: value })}
              errorMessage={errors["dispatch.departTime"]}
            />
          </div>
          <div>
            <CommonTimeInput
              label="Arrival"
              time={dispatch.arrivalTime}
              period={dispatch.arrivalPeriod}
              onTimeChange={(value) => onDispatchChange({ arrivalTime: value })}
              onPeriodChange={(value) => onDispatchChange({ arrivalPeriod: value })}
              errorMessage={errors["dispatch.arrivalTime"]}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <CommonInput
              variant="compact"
              type="number"
              min={0}
              step={1}
              label="Odometer In"
              placeholder="123456"
              value={dispatch.odometerIn}
              onChange={(e) => onDispatchChange({ odometerIn: e.target.value })}
              errorMessage={errors["dispatch.odometerIn"]}
            />
          </div>
          <div>
            <CommonInput
              variant="compact"
              type="number"
              min={0}
              step={1}
              label="Odometer Out"
              placeholder="123456"
              value={dispatch.odometerOut}
              onChange={(e) => onDispatchChange({ odometerOut: e.target.value })}
              errorMessage={errors["dispatch.odometerOut"]}
            />
          </div>
        </div>
      </div>
    </CommonFormSection>
  )
}
