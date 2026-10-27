import { createFormAutocomplete } from "../component/ReportAutocompleteInput"
import CommonSelect from "../../../components/common/widgets/CommonSelect"
import CommonFormSection from "../component/CommonFormSection"
import VehicularDispatchSection from "../component/VehicularDispatchSection"
import type { PatientFormOptions } from "@/api/patientForm"

import type { ResponderDetails, VehicularDispatch } from "@/types/patientLog"
import CommonCheckbox from "@/components/common/widgets/CommonCheckbox"
import CommonSearchSelect from "@/components/common/widgets/CommonSearchSelect"
import OtherRespondersInput from "../component/OtherRespondersInput"
import { getCurrentDateInputValue } from "@/utils/dateTime"
import CommonTimeInput from "@/components/common/widgets/CommonTimeInput"
import { get12HourTimeParts, to24HourTimeValue } from "@/utils/timeInput"

const CommonInput = createFormAutocomplete("patients")

const PatientRequestType = [
  { label: "TRANSPORT ASSISTANCE", value: "TRANSPORT_ASSISTANCE" },
  { label: "EMERGENCY", value: "EMERGENCY" },
  { label: "INTER FACILITY TRANSFER", value: "INTER_FACILITY_TRANSFER" },
  { label: "FIRST AID", value: "FIRST_AID" },
]

type PatientStep1Props = {
  responderDetails: ResponderDetails
  onResponderDetailsChange: (patch: Partial<ResponderDetails>) => void
  dispatch: VehicularDispatch
  onDispatchChange: (patch: Partial<VehicularDispatch>) => void
  options: PatientFormOptions
  optionsLoading: boolean
  errors: Record<string, string>
}

export default function PatientStep1({
  responderDetails,
  onResponderDetailsChange,
  dispatch,
  onDispatchChange,
  options,
  optionsLoading,
  errors,
}: PatientStep1Props) {
  const timeParts = get12HourTimeParts(responderDetails.time)
  const selectTransfer = (dispositionType: "DROP_OFF" | "PICK_UP") => {
    onResponderDetailsChange({
      dispositionType,
    })
  }

  return (
    <div className="flex w-full flex-col justify-between gap-4 lg:flex-row min-h-[650px]">
      <CommonFormSection title="RESPONDER  DETAILS" standardHeight={false}>
        <div className="space-y-4">
          <CommonInput
            variant="compact"
            label="Name of Submitter"
            placeholder="Type an account name"
            value={responderDetails.submitterName}
            onChange={(e) => onResponderDetailsChange({ submitterName: e.target.value })}
            errorMessage={errors.submitterName}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <CommonInput
                variant="compact"
                type="date"
                label="Date"
                value={responderDetails.date}
                max={getCurrentDateInputValue()}
                onChange={(e) => onResponderDetailsChange({ date: e.target.value })}
                errorMessage={errors.date}
              />
            </div>

            <CommonTimeInput
              label="Time"
              time={timeParts.time}
              period={timeParts.period}
              onTimeChange={(time) => onResponderDetailsChange({
                time: to24HourTimeValue(time, timeParts.period),
              })}
              onPeriodChange={(period) => onResponderDetailsChange({
                time: to24HourTimeValue(timeParts.time, period),
              })}
              errorMessage={errors.time}
            />
          </div>

          <CommonSelect
            variant="compact"
            label="Request For"
            placeholder="Dropdown Menu"
            options={PatientRequestType}
            value={responderDetails.typeOfRequest}
            onChange={(e) => onResponderDetailsChange({ typeOfRequest: e.target.value })}
            errorMessage={errors.typeOfRequest}
          />

          <div>
            <label className="mb-1 block text-lg font-medium text-slate-900">Name of Caller</label>

            <div className="grid grid-cols-[1fr_1fr_80px_80px] gap-2">
              <CommonInput
                variant="compact"
                placeholder="Surname"
                value={responderDetails.caller.surname}
                errorMessage={errors.callerSurname}
                onChange={(e) =>
                  onResponderDetailsChange({
                    caller: { ...responderDetails.caller, surname: e.target.value },
                  })
                }
              />

              <CommonInput
                variant="compact"
                placeholder="First Name"
                value={responderDetails.caller.firstName}
                errorMessage={errors.callerFirstName}
                onChange={(e) =>
                  onResponderDetailsChange({
                    caller: { ...responderDetails.caller, firstName: e.target.value },
                  })
                }
              />

              <CommonInput
                variant="compact"
                placeholder="M.I"
                value={responderDetails.caller.middleInitial}
                onChange={(e) =>
                  onResponderDetailsChange({
                    caller: { ...responderDetails.caller, middleInitial: e.target.value },
                  })
                }
              />

              <CommonInput
                variant="compact"
                placeholder="Sfx"
                value={responderDetails.caller.suffix}
                onChange={(e) =>
                  onResponderDetailsChange({
                    caller: { ...responderDetails.caller, suffix: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <CommonSearchSelect
            variant="compact"
            label="Responders"
            placeholder="Search responder..."
            options={options.responders.map((responder) => ({ label: responder.name, value: responder.user_id }))}
            value={responderDetails.responders}
            onChange={(vals) => onResponderDetailsChange({ responders: vals })}
            disabled={optionsLoading}
            errorMessage={errors.responders}
          />

          <OtherRespondersInput
            value={responderDetails.otherResponders}
            onChange={(otherResponders) => onResponderDetailsChange({ otherResponders })}
          />


          <div className={errors.transfer ? "rounded-md border border-red-400 bg-red-50 p-2" : ""}>
            <label className="mb-1 flex flex-wrap items-baseline justify-between gap-x-2 text-lg font-medium text-slate-900">
              <span>Transfer</span>
            </label>

            <div className="flex gap-8">
              <CommonCheckbox
                label="Drop-Off"
                checked={responderDetails.dispositionType === "DROP_OFF"}
                onChange={() => selectTransfer("DROP_OFF")}
              />
              <CommonCheckbox
                label="Pick-Up"
                checked={responderDetails.dispositionType === "PICK_UP"}
                onChange={() => selectTransfer("PICK_UP")}
              />
            </div>
            {errors.transfer && <p role="alert" className="mt-1 text-xs font-medium text-red-700">{errors.transfer}</p>}
          </div>
        </div>
      </CommonFormSection>

      <VehicularDispatchSection
        formType="patients"
        dispatch={dispatch}
        onDispatchChange={onDispatchChange}
        errors={errors}
        vehicleOptions={options.vehicles.map((vehicle) => ({
          label: `${vehicle.vehicle_name} (${vehicle.plate_number})`,
          value: vehicle.vehicle_id,
          currentOdometer: vehicle.current_odometer,
        }))}
        optionsLoading={optionsLoading}
      />
    </div>
  )
}
