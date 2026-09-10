import CommonInput from "../../../components/common/widgets/CommonInput"
import CommonSelect from "../../../components/common/widgets/CommonSelect"
import CommonCheckbox from "../../../components/common/widgets/CommonCheckbox"
import CommonTimeInput from "../../../components/common/widgets/CommonTimeInput"
import CommonFormSection from "../CommonFormSection"

import type { OperationDetails, VehicularDispatch } from "../../../types/operationLog"

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

            <div className="grid grid-cols-[1fr_1fr_50px_50px] gap-2">
              <CommonInput
                variant="compact"
                placeholder="Surname"
                value={operationDetails.caller.surname}
                onChange={(e) =>
                  onOperationDetailsChange({ caller: { ...operationDetails.caller, surname: e.target.value } })
                }
              />

              <CommonInput
                variant="compact"
                placeholder="First Name"
                value={operationDetails.caller.firstName}
                onChange={(e) =>
                  onOperationDetailsChange({ caller: { ...operationDetails.caller, firstName: e.target.value } })
                }
              />

              <CommonInput
                variant="compact"
                placeholder="M.I"
                value={operationDetails.caller.middleInitial}
                onChange={(e) =>
                  onOperationDetailsChange({
                    caller: { ...operationDetails.caller, middleInitial: e.target.value },
                  })
                }
              />

              <CommonInput
                variant="compact"
                placeholder="Sfx"
                value={operationDetails.caller.suffix}
                onChange={(e) =>
                  onOperationDetailsChange({ caller: { ...operationDetails.caller, suffix: e.target.value } })
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

      <CommonFormSection title="VEHICULAR DISPATCH">
        <div className="space-y-4">
          <CommonInput
            variant="compact"
            label="From"
            placeholder="Ex. Barangay Hall"
            value={dispatch.from}
            onChange={(e) => onDispatchChange({ from: e.target.value })}
          />

          <CommonInput
            variant="compact"
            label="To"
            placeholder="Ex. Barangay Hall"
            value={dispatch.to}
            onChange={(e) => onDispatchChange({ to: e.target.value })}
          />

          <CommonSelect
            variant="compact"
            label="Vehicle"
            placeholder="Dropdown Menu"
            options={VEHICLE_OPTIONS}
            value={dispatch.vehicle}
            onChange={(e) => onDispatchChange({ vehicle: e.target.value })}
          />

          <CommonInput
            variant="compact"
            label="Driver"
            placeholder="Ex. Barangay Hall"
            value={dispatch.driver}
            onChange={(e) => onDispatchChange({ driver: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-5">
            <CommonTimeInput
              label="Depart"
              time={dispatch.departTime}
              period={dispatch.departPeriod}
              onTimeChange={(value) => onDispatchChange({ departTime: value })}
              onPeriodChange={(value) => onDispatchChange({ departPeriod: value })}
            />

            <CommonTimeInput
              label="Arrival"
              time={dispatch.arrivalTime}
              period={dispatch.arrivalPeriod}
              onTimeChange={(value) => onDispatchChange({ arrivalTime: value })}
              onPeriodChange={(value) => onDispatchChange({ arrivalPeriod: value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <CommonInput
              variant="compact"
              type="number"
              label="Odometer In"
              placeholder="123456"
              value={dispatch.odometerIn}
              onChange={(e) => onDispatchChange({ odometerIn: e.target.value })}
            />

            <CommonInput
              variant="compact"
              type="number"
              label="Odometer Out"
              placeholder="123456"
              value={dispatch.odometerOut}
              onChange={(e) => onDispatchChange({ odometerOut: e.target.value })}
            />
          </div>
        </div>
      </CommonFormSection>
    </div>
  )
}
