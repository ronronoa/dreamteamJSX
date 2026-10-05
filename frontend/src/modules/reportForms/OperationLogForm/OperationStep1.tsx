import CommonInput from "../../../components/common/widgets/CommonInput"
import CommonSelect from "../../../components/common/widgets/CommonSelect"
import CommonCheckbox from "../../../components/common/widgets/CommonCheckbox"
import CommonFormSection from "../component/CommonFormSection"

import type { OperationDetails, VehicularDispatch } from "../../../types/operationLog"
import VehicularDispatchSection from "../component/VehicularDispatchSection"

const NATURE_OPTIONS = [
  { label: "Rescue", value: "rescue" },
  { label: "Medical Emergency", value: "medical" },
  { label: "Fire Response", value: "fire" },
  { label: "Other", value: "other" },
]

const TEAM_OPTIONS = ["Alpha", "Beta", "Charlie"]

const RESPONDER_OPTIONS = [
  { label: "Responder 1", value: "responder-1" },
  { label: "Responder 2", value: "responder-2" },
]

const VEHICLE_OPTIONS = [
  { label: "Vehicle 1", value: "vehicle-1" },
  { label: "Vehicle 2", value: "vehicle-2" },
]

type OperationStep1Props = {
  operationDetails: OperationDetails
  onOperationDetailsChange: (patch: Partial<OperationDetails>) => void
  dispatch: VehicularDispatch
  onDispatchChange: (patch: Partial<VehicularDispatch>) => void
}

export default function OperationStep1({
  operationDetails,
  onOperationDetailsChange,
  dispatch,
  onDispatchChange,
}: OperationStep1Props) {
  const toggleTeam = (team: string) => {
    const isSelected = operationDetails.teamAssigned.includes(team)

    onOperationDetailsChange({
      teamAssigned: isSelected
        ? operationDetails.teamAssigned.filter((t) => t !== team)
        : [...operationDetails.teamAssigned, team],
    })
  }

  return (
    <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
      <CommonFormSection title="OPERATION DETAILS">
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
            options={NATURE_OPTIONS}
            value={operationDetails.natureOfOperation}
            onChange={(e) => onOperationDetailsChange({ natureOfOperation: e.target.value })}
          />

          <div>
            <label className="mb-1 block text-lg font-medium text-slate-900">Name of Caller</label>

            <div className="grid grid-cols-[1fr_1fr_80px_80px] gap-2">
              <CommonInput
                variant="compact"
                placeholder="Surname"
                value={operationDetails.nameOfCaller.surname}
                onChange={(e) =>
                  onOperationDetailsChange({ nameOfCaller: { ...operationDetails.nameOfCaller, surname: e.target.value } })
                }
              />

              <CommonInput
                variant="compact"
                placeholder="First Name"
                value={operationDetails.nameOfCaller.firstName}
                onChange={(e) =>
                  onOperationDetailsChange({ nameOfCaller: { ...operationDetails.nameOfCaller, firstName: e.target.value } })
                }
              />

              <CommonInput
                variant="compact"
                placeholder="M.I"
                value={operationDetails.nameOfCaller.middleInitial}
                onChange={(e) =>
                  onOperationDetailsChange({
                    nameOfCaller: { ...operationDetails.nameOfCaller, middleInitial: e.target.value },
                  })
                }
              />

              <CommonInput
                variant="compact"
                placeholder="Sfx"
                value={operationDetails.nameOfCaller.suffix}
                onChange={(e) =>
                  onOperationDetailsChange({ nameOfCaller: { ...operationDetails.nameOfCaller, suffix: e.target.value } })
                }
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-lg font-medium text-slate-900">Team Assigned</label>

            <div className="flex gap-8">
              {TEAM_OPTIONS.map((team) => (
                <CommonCheckbox
                  key={team}
                  label={team}
                  checked={operationDetails.teamAssigned.includes(team)}
                  onChange={() => toggleTeam(team)}
                />
              ))}
            </div>
          </div>

          <CommonSelect
            variant="compact"
            label="Responders"
            placeholder="Drop Checkbox"
            options={RESPONDER_OPTIONS}
            value={operationDetails.responders[0] ?? ""}
            onChange={(e) => onOperationDetailsChange({ responders: [e.target.value] })}
          />
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
