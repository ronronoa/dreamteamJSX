import { createFormAutocomplete } from "../component/ReportAutocompleteInput"
import CommonCheckbox from "../../../components/common/widgets/CommonCheckbox"
import CommonSearchSelect from "../../../components/common/widgets/CommonSearchSelect"
import CommonFormSection from "../component/CommonFormSection"

import type { VehicularDispatchDetails, VehicularDispatch } from "../../../types/vehicularDispatchReport"
import type { VehicularDispatchErrors } from "./formValidation"
import VehicularDispatchSection from "../component/VehicularDispatchSection"
import OtherRespondersInput from "../component/OtherRespondersInput"
import { getCurrentDateInputValue } from "@/utils/dateTime"

const CommonInput = createFormAutocomplete("vehicular-dispatches")

type VehicularStep1Props = {
  details: VehicularDispatchDetails
  onDetailsChange: (patch: Partial<VehicularDispatchDetails>) => void
  dispatch: VehicularDispatch
  onDispatchChange: (patch: Partial<VehicularDispatch>) => void
  errors: VehicularDispatchErrors
  vehicleOptions: { label: string; value: string; currentOdometer: number }[]
  responderOptions: { label: string; value: string }[]
  optionsLoading: boolean
}

export default function VehicularStep1({
  details,
  onDetailsChange,
  dispatch,
  onDispatchChange,
  errors,
  vehicleOptions,
  responderOptions,
  optionsLoading,
}: VehicularStep1Props) {

  return (
    <div className="flex w-full flex-col justify-between gap-4 lg:flex-row min-h-[650px]">
      <CommonFormSection standardHeight={false} title="RESPONDER DETAILS">
        <div className="space-y-4">
          <CommonInput
            variant="compact"
            label="Name of Submitter"
            placeholder="Enter submitter name"
            value={details.submitterName}
            onChange={(e) => onDetailsChange({ submitterName: e.target.value })}
            errorMessage={errors["details.submitterName"]}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CommonInput
              variant="compact"
              type="date"
              label="Date"
              value={details.date}
              max={getCurrentDateInputValue()}
              onChange={(e) => onDetailsChange({ date: e.target.value })}
              errorMessage={errors["details.date"]}
            />

            <CommonInput
              variant="compact"
              type="time"
              label="Time"
              value={details.time}
              onChange={(e) => onDetailsChange({ time: e.target.value })}
              errorMessage={errors["details.time"]}
            />
          </div>

          <CommonSearchSelect
            variant="compact"
            label="Responders"
            placeholder="Search responder..."
            options={responderOptions}
            value={details.responders}
            onChange={(responders) => onDetailsChange({ responders })}
            errorMessage={errors["details.responders"]}
            disabled={optionsLoading}
          />
          <OtherRespondersInput
            value={details.otherResponders}
            onChange={(otherResponders) => onDetailsChange({ otherResponders })}
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
        formType="vehicular-dispatches"
        dispatch={dispatch}
        onDispatchChange={onDispatchChange}
        vehicleOptions={vehicleOptions}
        optionsLoading={optionsLoading}
        errors={errors}
      />
    </div>
  )
}
