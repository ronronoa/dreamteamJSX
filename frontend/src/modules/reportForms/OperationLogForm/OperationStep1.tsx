import { createFormAutocomplete } from "../component/ReportAutocompleteInput"
import CommonSelect from "../../../components/common/widgets/CommonSelect"
import CommonCheckbox from "../../../components/common/widgets/CommonCheckbox"
import CommonSearchSelect from "@/components/common/widgets/CommonSearchSelect"
import CommonFormSection from "../component/CommonFormSection"

import type { OperationDetails, VehicularDispatch } from "../../../types/operationLog"
import type { OperationFormOptions } from "../../../api/operationForm"
import type { FormErrors } from "./formValidation"
import VehicularDispatchSection from "../component/VehicularDispatchSection"

const CommonInput = createFormAutocomplete("operations")

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
    const updatedTeams = isSelected
      ? operationDetails.teamAssigned.filter((selectedTeam) => selectedTeam !== team)
      : [...operationDetails.teamAssigned, team]
    const availableResponderIds = new Set(
      options.responders
        .filter((responder) => responder.team_id && updatedTeams.includes(responder.team_id))
        .map((responder) => responder.user_id),
    )

    onOperationDetailsChange({
      teamAssigned: updatedTeams,
      responders: operationDetails.responders.filter((responderId) => availableResponderIds.has(responderId)),
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
            errorMessage={errors["operationDetails.submitterName"]}
          />

          <CommonInput
            variant="compact"
            type="date"
            label="Date"
            value={operationDetails.date}
            onChange={(e) => onOperationDetailsChange({ date: e.target.value })}
            errorMessage={errors["operationDetails.date"]}
          />

          <CommonSelect
            variant="compact"
            label="Nature of Operation"
            placeholder="Dropdown Menu"
            options={options.operationNatures.map((nature) => ({ label: nature.name, value: nature.name }))}
            value={operationDetails.natureOfOperation}
            onChange={(e) => onOperationDetailsChange({ natureOfOperation: e.target.value })}
            disabled={optionsLoading || options.operationNatures.length === 0}
            errorMessage={errors["operationDetails.natureOfOperation"]}
          />

          <div>
            <label className="mb-1 flex flex-wrap items-baseline justify-between gap-x-2 text-lg font-medium text-slate-900">
              <span>Name of Caller</span>
              {[
                ["Surname", errors["operationDetails.nameOfCaller.surname"]],
                ["First name", errors["operationDetails.nameOfCaller.firstName"]],
                ["Middle initial", errors["operationDetails.nameOfCaller.middleInitial"]],
                ["Suffix", errors["operationDetails.nameOfCaller.suffix"]],
              ].some(([, message]) => Boolean(message)) && <span role="alert" className="text-xs font-medium text-red-700">
                {[
                  ["Surname", errors["operationDetails.nameOfCaller.surname"]],
                  ["First name", errors["operationDetails.nameOfCaller.firstName"]],
                  ["Middle initial", errors["operationDetails.nameOfCaller.middleInitial"]],
                  ["Suffix", errors["operationDetails.nameOfCaller.suffix"]],
                ].filter((entry): entry is [string, string] => Boolean(entry[1])).map(([label, message]) => `${label}: ${message}`).join(" ")}
              </span>}
            </label>

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
            <label className="mb-1 flex flex-wrap items-baseline justify-between gap-x-2 text-lg font-medium text-slate-900">
              <span>Team Assigned</span>
              {errors["operationDetails.teamAssigned"] && <span role="alert" className="text-xs font-medium text-red-700">{errors["operationDetails.teamAssigned"]}</span>}
            </label>

            <div className="flex gap-8 flex-wrap">
              {options.teams.map((team) => (
                <CommonCheckbox
                  key={team.team_id}
                  label={team.team_name}
                  checked={operationDetails.teamAssigned.includes(team.team_id)}
                  onChange={() => toggleTeam(team.team_id)}
                />
              ))}
            </div>
          </div>

          <CommonSearchSelect
            variant="compact"
            label="Responders"
            placeholder={operationDetails.teamAssigned.length > 0 ? "Search responders..." : "Select a team first"}
            options={options.responders
              .filter((responder) => responder.team_id && operationDetails.teamAssigned.includes(responder.team_id))
              .map((responder) => ({ label: responder.name, value: responder.user_id }))}
            value={operationDetails.responders}
            onChange={(responders) => onOperationDetailsChange({ responders })}
            disabled={optionsLoading || operationDetails.teamAssigned.length === 0}
            errorMessage={errors["operationDetails.responders"]}
          />
        </div>
      </CommonFormSection>

      <VehicularDispatchSection
        formType="operations"
        dispatch={dispatch}
        onDispatchChange={onDispatchChange}
        errors={errors}
        optionsLoading={optionsLoading}
        vehicleOptions={options.vehicles.map((vehicle) => ({
          label: `${vehicle.vehicle_name} (${vehicle.plate_number})`,
          value: vehicle.vehicle_id,
          currentOdometer: vehicle.current_odometer,
        }))}
      />
    </div>
  )
}
