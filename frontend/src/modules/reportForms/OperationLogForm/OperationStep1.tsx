import CommonInput from "../../../components/common/widgets/CommonInput"
import CommonSelect from "../../../components/common/widgets/CommonSelect"
import CommonCheckbox from "../../../components/common/widgets/CommonCheckbox"
import CommonFormSection from "../component/CommonFormSection"

import type { OperationDetails, VehicularDispatch } from "../../../types/operationLog"
import type { OperationFormOptions } from "../../../api/operationForm"
import type { FormErrors } from "./formValidation"
import FieldError from "../component/FieldError"
import VehicularDispatchSection from "../component/VehicularDispatchSection"

type OperationStep1Props = {
  operationDetails: OperationDetails
  onOperationDetailsChange: (patch: Partial<OperationDetails>) => void
  dispatch: VehicularDispatch
  onDispatchChange: (patch: Partial<VehicularDispatch>) => void
  options: OperationFormOptions
  optionsLoading: boolean
  errors: FormErrors
}

export default function OperationStep1({
  operationDetails,
  onOperationDetailsChange,
  dispatch,
  onDispatchChange,
  options,
  optionsLoading,
  errors,
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
          <FieldError message={errors["operationDetails.submitterName"]} />

          <CommonInput
            variant="compact"
            type="date"
            label="Date"
            value={operationDetails.date}
            onChange={(e) => onOperationDetailsChange({ date: e.target.value })}
          />
          <FieldError message={errors["operationDetails.date"]} />

          <CommonSelect
            variant="compact"
            label="Nature of Operation"
            placeholder="Dropdown Menu"
            options={options.operationNatures.map((nature) => ({ label: nature.name, value: nature.name }))}
            value={operationDetails.natureOfOperation}
            onChange={(e) => onOperationDetailsChange({ natureOfOperation: e.target.value })}
            disabled={optionsLoading || options.operationNatures.length === 0}
          />
          <FieldError message={errors["operationDetails.natureOfOperation"]} />

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
            <div className="grid grid-cols-4 gap-2">
              <FieldError message={errors["operationDetails.nameOfCaller.surname"]} />
              <FieldError message={errors["operationDetails.nameOfCaller.firstName"]} />
              <FieldError message={errors["operationDetails.nameOfCaller.middleInitial"]} />
              <FieldError message={errors["operationDetails.nameOfCaller.suffix"]} />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-lg font-medium text-slate-900">Team Assigned</label>

            <div className="flex gap-8">
              {options.teams.map((team) => (
                <CommonCheckbox
                  key={team.team_id}
                  label={team.team_name}
                  checked={operationDetails.teamAssigned.includes(team.team_id)}
                  onChange={() => toggleTeam(team.team_id)}
                />
              ))}
            </div>
            <FieldError message={errors["operationDetails.teamAssigned"]} />
          </div>

          <CommonSelect
            variant="compact"
            label="Responders"
            placeholder="Drop Checkbox"
            options={options.responders.map((responder) => ({ label: responder.name, value: responder.user_id }))}
            value={operationDetails.responders[0] ?? ""}
            onChange={(e) => onOperationDetailsChange({ responders: [e.target.value] })}
            disabled={optionsLoading || options.responders.length === 0}
          />
          <FieldError message={errors["operationDetails.responders"]} />
        </div>
      </CommonFormSection>

      <VehicularDispatchSection
        dispatch={dispatch}
        onDispatchChange={onDispatchChange}
        errors={errors}
        optionsLoading={optionsLoading}
        vehicleOptions={options.vehicles.map((vehicle) => ({
          label: `${vehicle.vehicle_name} (${vehicle.plate_number})`,
          value: vehicle.vehicle_id,
        }))}
      />
    </div>
  )
}
