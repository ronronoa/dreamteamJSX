import { createFormAutocomplete } from "../component/ReportAutocompleteInput"
import CommonSelect from "../../../components/common/widgets/CommonSelect"
import CommonFormSection from "../component/CommonFormSection"
import VehicularDispatchSection from "../component/VehicularDispatchSection"
import type { PatientFormOptions } from "@/api/patientForm"

import type { ResponderDetails, VehicularDispatch } from "@/types/patientLog"
import CommonCheckbox from "@/components/common/widgets/CommonCheckbox"
import CommonSearchSelect from "@/components/common/widgets/CommonSearchSelect"

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
}

export default function PatientStep1({
  responderDetails,
  onResponderDetailsChange,
  dispatch,
  onDispatchChange,
  options,
  optionsLoading,
}: PatientStep1Props) {
  const selectTransfer = (transfer: "Drop-Off" | "Pick-Up") => {
    onResponderDetailsChange({
      teamAssigned: [transfer],
    })
  }

  return (
    <div className="flex w-full flex-col justify-between gap-4 lg:flex-row min-h-[650px]">
      <CommonFormSection title="RESPONDER  DETAILS" standardHeight={false}>
        <div className="space-y-4">
          <CommonInput
            variant="compact"
            label="Name of Submitter"
            placeholder="Place holder"
            value={responderDetails.submitterName}
            onChange={(e) => onResponderDetailsChange({ submitterName: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CommonInput
              variant="compact"
              type="date"
              label="Date"
              value={responderDetails.date}
              onChange={(e) => onResponderDetailsChange({ date: e.target.value })}
            />

            <CommonInput
              variant="compact"
              type="time"
              label="Time"
              value={responderDetails.time}
              onChange={(e) => onResponderDetailsChange({ time: e.target.value })}
            />
          </div>

          <CommonSelect
            variant="compact"
            label="Request For"
            placeholder="Dropdown Menu"
            options={PatientRequestType}
            value={responderDetails.typeOfRequest}
            onChange={(e) => onResponderDetailsChange({ typeOfRequest: e.target.value })}
          />

          <div>
            <label className="mb-1 block text-lg font-medium text-slate-900">Name of Caller</label>

            <div className="grid grid-cols-[1fr_1fr_80px_80px] gap-2">
              <CommonInput
                variant="compact"
                placeholder="Surname"
                value={responderDetails.caller.surname}
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
          />


          <div>
            <label className="mb-1 flex flex-wrap items-baseline justify-between gap-x-2 text-lg font-medium text-slate-900">
              <span>Transfer</span>
            </label>

            <div className="flex gap-8">
              <CommonCheckbox
                label="Drop-Off"
                checked={responderDetails.teamAssigned.includes("Drop-Off")}
                onChange={() => selectTransfer("Drop-Off")}
              />
              <CommonCheckbox
                label="Pick-Up"
                checked={responderDetails.teamAssigned.includes("Pick-Up")}
                onChange={() => selectTransfer("Pick-Up")}
              />
            </div>
          </div>
        </div>
      </CommonFormSection>

      <VehicularDispatchSection
        formType="patients"
        dispatch={dispatch}
        onDispatchChange={onDispatchChange}
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
