import CommonInput from "../../../components/common/widgets/CommonInput"
import CommonSelect from "../../../components/common/widgets/CommonSelect"
import CommonFormSection from "../component/CommonFormSection"
import CommonSearchSelect from "@/components/common/widgets/CommonSearchSelect"
import VehicularDispatchSection from "../component/VehicularDispatchSection"
import type { PatientFormOptions } from "@/api/patientForm"

import type { ResponderDetails, VehicularDispatch } from "@/types/patientLog"

const PatientRequestType = [
  { label: "INTER FACILITY TRANSFER", value: "INTER_FACILITY_TRANSFER" },
  { label: "PICK UP", value: "PICK_UP" },
  { label: "DROP OFF", value: "DROP_OFF" },
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

  return (
    <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
      <CommonFormSection title="RESPONDER  DETAILS">
        <div className="space-y-4">
          <CommonInput
            variant="compact"
            label="Name of Submitter"
            placeholder="Place holder"
            value={responderDetails.submitterName}
            onChange={(e) => onResponderDetailsChange({ submitterName: e.target.value })}
          />

          <CommonInput
            variant="compact"
            type="date"
            label="Date"
            value={responderDetails.date}
            onChange={(e) => onResponderDetailsChange({ date: e.target.value })}
          />

          <CommonSelect
            variant="compact"
            label="Type of Request"
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
            options={options.responders
              .filter((responder) => responder.team_id && responderDetails.teamAssigned.includes(responder.team_id))
              .map((responder) => ({ label: responder.name, value: responder.user_id }))}
            value={responderDetails.responders}
            onChange={(vals) => onResponderDetailsChange({ responders: vals })}
            disabled={optionsLoading}
          />

          <CommonSearchSelect
            variant="compact"
            label="Team Assigned"
            placeholder="Search team..."
            options={options.teams.map((team) => ({ label: team.team_name, value: team.team_id }))}
            value={responderDetails.teamAssigned}
            onChange={(vals) => {
              const availableResponders = new Set(options.responders
                .filter((responder) => responder.team_id && vals.includes(responder.team_id))
                .map((responder) => responder.user_id))
              onResponderDetailsChange({
                teamAssigned: vals,
                responders: responderDetails.responders.filter((id) => availableResponders.has(id)),
              })
            }}
            disabled={optionsLoading}
          />
        </div>
      </CommonFormSection>

      <VehicularDispatchSection
        dispatch={dispatch}
        onDispatchChange={onDispatchChange}
        vehicleOptions={options.vehicles.map((vehicle) => ({
          label: `${vehicle.vehicle_name} (${vehicle.plate_number})`,
          value: vehicle.vehicle_id,
        }))}
        optionsLoading={optionsLoading}
        allowOther={false}
      />
    </div>
  )
}
