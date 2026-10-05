import CommonInput from "../../../components/common/widgets/CommonInput"
import CommonSelect from "../../../components/common/widgets/CommonSelect"
import CommonCheckbox from "../../../components/common/widgets/CommonCheckbox"
import CommonFormSection from "../component/CommonFormSection"
import CommonSearchSelect from "@/components/common/widgets/CommonSearchSelect"
import VehicularDispatchSection from "../component/VehicularDispatchSection"

import type { ResponderDetails, VehicularDispatch } from "@/types/patientLog"

const PatientRequestType = [
  { label: "INTER FACILITY TRANSFER", value: "INTER_FACILITY_TRANSFER" },
  { label: "PICK UP", value: "PICK_UP" },
  { label: "DROP OFF", value: "DROP_OFF" },
  { label: "Other", value: "other" },
]

const TRANSFER_OPTIONS = ["Drop-off", "Pick-up"]

const RESPONDER_OPTIONS = [
  { label: "Responder 1", value: "responder-1" },
  { label: "Responder 2", value: "responder-2" },
]

const VEHICLE_OPTIONS = [
  { label: "Vehicle 1", value: "vehicle-1" },
  { label: "Vehicle 2", value: "vehicle-2" },
  { label: "Other", value: "other" },
]

type PatientStep1Props = {
  responderDetails: ResponderDetails
  onResponderDetailsChange: (patch: Partial<ResponderDetails>) => void
  dispatch: VehicularDispatch
  onDispatchChange: (patch: Partial<VehicularDispatch>) => void
}

export default function PatientStep1({
  responderDetails,
  onResponderDetailsChange,
  dispatch,
  onDispatchChange,
}: PatientStep1Props) {

  const toggleTeam = (team: string) => {
    const isSelected = responderDetails.teamAssigned.includes(team)
    onResponderDetailsChange({
      teamAssigned: isSelected
        ? responderDetails.teamAssigned.filter((t) => t !== team)
        : [...responderDetails.teamAssigned, team],
    })
  }

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
            options={RESPONDER_OPTIONS}
            value={responderDetails.responders}
            onChange={(vals) => onResponderDetailsChange({ responders: vals })}
          />

          <div>
            <label className="mb-1 block text-lg font-medium text-slate-900">Transfer</label>

            <div className="flex gap-8">
              {TRANSFER_OPTIONS.map((team) => (
                <CommonCheckbox
                  key={team}
                  label={team}
                  checked={responderDetails.teamAssigned.includes(team)}
                  onChange={() => toggleTeam(team)}
                />
              ))}
            </div>
          </div>
        </div>
      </CommonFormSection>

      <VehicularDispatchSection
        dispatch={dispatch}
        onDispatchChange={onDispatchChange}
        vehicleOptions={VEHICLE_OPTIONS}
      />
    </div>
  )
}
