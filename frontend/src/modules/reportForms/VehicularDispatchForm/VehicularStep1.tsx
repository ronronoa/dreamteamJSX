import CommonInput from "../../../components/common/widgets/CommonInput"
import CommonSelect from "../../../components/common/widgets/CommonSelect"
import CommonCheckbox from "../../../components/common/widgets/CommonCheckbox"
import CommonFormSection from "../component/CommonFormSection"

import type { VehicularDispatchDetails, VehicularDispatch } from "../../../types/vehicularDispatchReport"
import type { VehicularDispatchErrors } from "./formValidation"
import { VEHICULAR_OPERATION_TYPES, VEHICULAR_OPTIONS } from "../../../types/vehicularDispatchReport"
import VehicularDispatchSection from "../component/VehicularDispatchSection"

type VehicularStep1Props = {
  details: VehicularDispatchDetails
  onDetailsChange: (patch: Partial<VehicularDispatchDetails>) => void
  dispatch: VehicularDispatch
  onDispatchChange: (patch: Partial<VehicularDispatch>) => void
  errors: VehicularDispatchErrors
}

export default function VehicularStep1({
  details,
  onDetailsChange,
  dispatch,
  onDispatchChange,
  errors,
}: VehicularStep1Props) {

  return (
    <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
      <CommonFormSection standardHeight={false} title="OPERATION DETAILS">
        <div className="space-y-4">
          <CommonInput
            variant="compact"
            label="Name of Submitter"
            placeholder="Enter submitter name"
            value={details.submitterName}
            onChange={(e) => onDetailsChange({ submitterName: e.target.value })}
            errorMessage={errors["details.submitterName"]}
          />

          <CommonInput
            variant="compact"
            type="date"
            label="Date"
            value={details.date}
            onChange={(e) => onDetailsChange({ date: e.target.value })}
            errorMessage={errors["details.date"]}
          />

          <CommonSelect
            variant="compact"
            label="Nature of Operation"
            placeholder="Dropdown Menu"
            options={VEHICULAR_OPERATION_TYPES.map((nature) => ({ label: nature, value: nature }))}
            value={details.natureOfOperation}
            onChange={(e) => onDetailsChange({ natureOfOperation: e.target.value })}
            errorMessage={errors["details.natureOfOperation"]}
          />
          <div>
            <label className="mb-1 flex flex-wrap items-baseline justify-between gap-x-2 text-lg font-medium text-slate-900">
              <span>Transfer</span>
            </label>

            <div className="flex gap-8">
              <CommonCheckbox
                label="Drop-Off"
                checked={details.transfers.includes("Drop-Off")}
                onChange={(event) => onDetailsChange({
                  transfers: event.target.checked
                    ? [...details.transfers, "Drop-Off"]
                    : details.transfers.filter((transfer) => transfer !== "Drop-Off"),
                })}
              />
              <CommonCheckbox
                label="Pick-Up"
                checked={details.transfers.includes("Pick-Up")}
                onChange={(event) => onDetailsChange({
                  transfers: event.target.checked
                    ? [...details.transfers, "Pick-Up"]
                    : details.transfers.filter((transfer) => transfer !== "Pick-Up"),
                })}
              />
            </div>
            {errors["details.transfers"] && (
              <p role="alert" className="mt-1 text-sm text-red-700">{errors["details.transfers"]}</p>
            )}
          </div>
        </div>
      </CommonFormSection>

      <VehicularDispatchSection
        dispatch={dispatch}
        onDispatchChange={onDispatchChange}
        vehicleOptions={VEHICULAR_OPTIONS}
        errors={errors}
      />
    </div>
  )
}
