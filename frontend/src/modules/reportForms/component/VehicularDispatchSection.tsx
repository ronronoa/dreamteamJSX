import ReportAutocompleteInput from "./ReportAutocompleteInput"
import CommonInput from "../../../components/common/widgets/CommonInput"
import CommonSelect from "../../../components/common/widgets/CommonSelect"
import CommonTimeInput from "../../../components/common/widgets/CommonTimeInput"
import CommonFormSection from "./CommonFormSection"
import { useEffect } from "react"
import type { FormErrors } from "../OperationLogForm/formValidation"

import type { VehicularDispatch } from "../../../types/operationLog"

const OTHER_VEHICLE_VALUE = "other"
const NO_VEHICLE_VALUE = "none"

const DEFAULT_VEHICLE_OPTIONS = [
  { label: "Vehicle 1", value: "vehicle-1" },
  { label: "Vehicle 2", value: "vehicle-2" },
]

type VehicularDispatchSectionProps = {
  formType: "operations" | "patients" | "vehicular-dispatches"
  dispatch: VehicularDispatch
  onDispatchChange: (patch: Partial<VehicularDispatch>) => void
  vehicleOptions?: { label: string; value: string; currentOdometer?: number }[]
  errors?: FormErrors
  optionsLoading?: boolean
  title?: string
  allowOther?: boolean
}

export default function VehicularDispatchSection({
  formType,
  dispatch,
  onDispatchChange,
  vehicleOptions = DEFAULT_VEHICLE_OPTIONS,
  errors = {},
  optionsLoading = false,
  title = "VEHICULAR DISPATCH",
  allowOther = true,
}: VehicularDispatchSectionProps) {
  const optionsWithOther = [
    ...vehicleOptions,
    ...(vehicleOptions.some((option) => option.value === OTHER_VEHICLE_VALUE) || !allowOther
      ? []
      : [{ label: "Other", value: OTHER_VEHICLE_VALUE }]),
    { label: "None", value: NO_VEHICLE_VALUE },
  ]

  const isOtherVehicle = dispatch.vehicle === OTHER_VEHICLE_VALUE
  const hasNoVehicle = dispatch.vehicle === NO_VEHICLE_VALUE || dispatch.vehicle === ""
  const hasSelectedDatabaseVehicle = vehicleOptions.some((option) => option.value === dispatch.vehicle)
  const selectedDatabaseVehicle = vehicleOptions.find((option) => option.value === dispatch.vehicle)

  useEffect(() => {
    if (!selectedDatabaseVehicle || selectedDatabaseVehicle.currentOdometer === undefined) return

    const databaseOdometer = String(selectedDatabaseVehicle.currentOdometer)
    if (dispatch.odometerIn === databaseOdometer) return

    onDispatchChange({ odometerIn: databaseOdometer })
  }, [dispatch.odometerIn, onDispatchChange, selectedDatabaseVehicle])

  return (
    <CommonFormSection title={title} standardHeight={false}>
      <div className="space-y-4">
        <ReportAutocompleteInput
          formType={formType}
          variant="compact"
          label="From"
          placeholder="Ex. Barangay Hall"
          value={dispatch.from}
          onChange={(e) => onDispatchChange({ from: e.target.value })}
          errorMessage={errors["dispatch.from"]}
        />

        <ReportAutocompleteInput
          formType={formType}
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
          onChange={(e) => {
            const selectedVehicle = vehicleOptions.find((option) => option.value === e.target.value)
            const odometer = selectedVehicle?.currentOdometer
            onDispatchChange({
              vehicle: e.target.value,
              odometerIn: odometer === undefined ? "" : String(odometer),
              odometerOut: "",
              ...(e.target.value === NO_VEHICLE_VALUE ? { driver: "" } : {}),
            })
          }}
          disabled={optionsLoading}
          errorMessage={errors["dispatch.vehicle"]}
        />

        {isOtherVehicle && (
          <>
            <ReportAutocompleteInput
              formType={formType}
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

        {!hasNoVehicle && <ReportAutocompleteInput
          formType={formType}
          variant="compact"
          label="Driver"
          placeholder="e.g Juan Cruz"
          value={dispatch.driver}
          onChange={(e) => onDispatchChange({ driver: e.target.value })}
          errorMessage={errors["dispatch.driver"]}
        />}

        {!hasNoVehicle &&
          <div className="grid sm:grid-cols-2 gap-5">
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
          </div>}

        {!hasNoVehicle &&
          <div className="grid grid-cols-2 gap-5">
            <div>
              <CommonInput
                variant="compact"
                type="number"
                min={0}
                step={1}
                label="Odometer In"
                errorPlacement="bottom"
                placeholder="123456"
                value={dispatch.odometerIn}
                disabled={hasSelectedDatabaseVehicle}
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
                errorPlacement="bottom"
                placeholder="123456"
                value={dispatch.odometerOut}
                onChange={(e) => onDispatchChange({ odometerOut: e.target.value })}
                errorMessage={errors["dispatch.odometerOut"]}
              />
            </div>
          </div>}
      </div>
    </CommonFormSection>
  )
}
