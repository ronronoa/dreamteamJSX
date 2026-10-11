import CommonInput from "../../../components/common/widgets/CommonInput"
import CommonSelect from "../../../components/common/widgets/CommonSelect"
import CommonCheckbox from "../../../components/common/widgets/CommonCheckbox"
import CommonFormSection from "../component/CommonFormSection"

import type { OperationDetails, VehicularDispatch } from "../../../types/operationLog"
import type { OperationFormOptions } from "../../../api/operationForm"
import VehicularDispatchSection from "../component/VehicularDispatchSection"

type OperationStep1Props = {
  operationDetails: OperationDetails
  onOperationDetailsChange: (patch: Partial<OperationDetails>) => void
  dispatch: VehicularDispatch
  onDispatchChange: (patch: Partial<VehicularDispatch>) => void
  options: OperationFormOptions
  optionsLoading: boolean
}

export default function VehicularStep1({
  operationDetails,
  onOperationDetailsChange,
  dispatch,
  onDispatchChange,
  options,
  optionsLoading,
}: OperationStep1Props) {

  return (
    <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
      <CommonFormSection standardHeight={false} title="OPERATION DETAILS">
        <div className="space-y-4">
          <CommonInput
            variant="compact"
            label="Name of Submitter"
            placeholder="Place holder"
            value={operationDetails.submitterName}
            onChange={(e) => onOperationDetailsChange({ submitterName: e.target.value })}
          />

          <CommonInput
            variant="compact"
            type="date"
            label="Date"
            value={operationDetails.date}
            onChange={(e) => onOperationDetailsChange({ date: e.target.value })}
          />

          <CommonSelect
            variant="compact"
            label="Nature of Operation"
            placeholder="Dropdown Menu"
            options={options.operationNatures.map((nature) => ({ label: nature.name, value: nature.name }))}
            value={operationDetails.natureOfOperation}
            onChange={(e) => onOperationDetailsChange({ natureOfOperation: e.target.value })}
            disabled={optionsLoading || options.operationNatures.length === 0}
          />
          <div>
            <label className="mb-1 flex flex-wrap items-baseline justify-between gap-x-2 text-lg font-medium text-slate-900">
              <span>Transfer</span>
            </label>

            <div className="flex gap-8">
              <CommonCheckbox
                label="Drop-Off"
              />
              <CommonCheckbox
                label="Pick-Up"
              />
            </div>
          </div>
        </div>
      </CommonFormSection>

      <VehicularDispatchSection
        dispatch={dispatch}
        onDispatchChange={onDispatchChange}
        optionsLoading={optionsLoading}
        vehicleOptions={options.vehicles.map((vehicle) => ({
          label: `${vehicle.vehicle_name} (${vehicle.plate_number})`,
          value: vehicle.vehicle_id,
        }))}
      />
    </div>
  )
}
