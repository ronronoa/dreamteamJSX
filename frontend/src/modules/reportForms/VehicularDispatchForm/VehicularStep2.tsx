import { useState } from "react"
import { Trash, UserRoundPlus } from "lucide-react"

import CommonButton from "../../../components/common/widgets/CommonButton"
import { createFormAutocomplete } from "../component/ReportAutocompleteInput"
import CommonCheckbox from "../../../components/common/widgets/CommonCheckbox"
import CommonFormSection from "../component/CommonFormSection"

import { calculateAge } from "../../../types/operationLog"
import { createEmptyPerson, type Person } from "../../../types/vehicularDispatchReport"
import type { VehicularDispatchErrors } from "./formValidation"
import { hasPersonInput, validateReportPerson } from "../reportPersonValidation"
import { calculateBirthdateFromAge, formatDate, MAX_REASONABLE_AGE } from "@/utils/dateTime"
import { MAX_ADDRESS_PART_LENGTH, MAX_PHASE_LENGTH, MAX_CONTACT_NUMBER_LENGTH, sanitizeAddressValue, sanitizeContactNumber, sanitizePersonName } from "../reportFieldRules"

const MAX_PASSENGERS = 100
const CommonInput = createFormAutocomplete("vehicular-dispatches")

type VehicularStep2Props = {
  people: Person[]
  draft: Person
  onDraftChange: (draft: Person) => void
  onPeopleChange: (people: Person[]) => void
  errors: VehicularDispatchErrors
}

export default function VehicularStep2({ people, draft, onDraftChange, onPeopleChange, errors }: VehicularStep2Props) {
  const [draftError, setDraftError] = useState("")
  const draftErrors = hasPersonInput(draft) ? validateReportPerson(draft) : {}


  const updateDraft = (patch: Partial<Person>) => {
    const updatedDraft = { ...draft, ...patch }
    onDraftChange(updatedDraft)
    setDraftError("")
  }

  const handleBirthdateChange = (birthdate: string) => {
    updateDraft({ birthdate, age: calculateAge(birthdate) })
  }

  const handleAgeChange = (value: string) => {
    const birthdate = calculateBirthdateFromAge(value)
    updateDraft({ birthdate, age: birthdate ? Number(value) : "" })
  }

  const addPerson = () => {
    if (!hasPersonInput(draft)) return
    if (people.length >= MAX_PASSENGERS) {
      setDraftError(`Add no more than ${MAX_PASSENGERS} passengers.`)
      return
    }

    if (Object.keys(validateReportPerson(draft)).length > 0) {
      setDraftError("Complete the required passenger fields before adding them.")
      return
    }

    onPeopleChange([...people, { ...draft }])
    onDraftChange(createEmptyPerson())
    setDraftError("")
  }

  const removePerson = (id: string) => {
    onPeopleChange(people.filter((person) => person.id !== id))
  }

  const formatName = (person: Person) => {
    const { surname, firstName, middleInitial, suffix } = person.name
    const mi = middleInitial ? `${middleInitial}.` : ""
    return `${surname}, ${firstName} ${mi} ${suffix}`.replace(/\s+/g, " ").trim()
  }

  const formatAddress = (person: Person) => {
    const { phase, package: pkg, block, lot } = person.address
    return `P${phase} PK${pkg} B${block} L${lot}`
  }

  return (
    <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
      <CommonFormSection title="CIVILIAN PASSENGERS">
        <p className="mb-4 text-sm text-slate-600">Leave this section blank if there are no civilian passengers. Once you start an entry, complete the required fields before continuing. Middle initial and suffix are optional.</p>
        <div className="mb-5">
          <label className="mb-1 flex flex-wrap items-baseline justify-between gap-x-2 text-lg font-medium text-slate-900">
            <span>Full Name</span>
          </label>

          <div className="grid grid-cols-[1fr_1fr_85px_85px] gap-1.5">
            <CommonInput
              variant="compact"
              placeholder="Surname"
              value={draft.name.surname}
              errorMessage={draftErrors["name.surname"]}
              onChange={(e) => updateDraft({ name: { ...draft.name, surname: sanitizePersonName(e.target.value) } })}
            />

            <CommonInput
              variant="compact"
              placeholder="First Name"
              value={draft.name.firstName}
              errorMessage={draftErrors["name.firstName"]}
              onChange={(e) => updateDraft({ name: { ...draft.name, firstName: sanitizePersonName(e.target.value) } })}
            />

            <CommonInput
              variant="compact"
              className="px-1"
              placeholder="M.I"
              errorMessage={draftErrors["name.middleInitial"]}
              value={draft.name.middleInitial}
              onChange={(e) => updateDraft({ name: { ...draft.name, middleInitial: sanitizePersonName(e.target.value) } })}
            />

            <CommonInput
              variant="compact"
              className="px-1"
              placeholder="Sfx"
              errorMessage={draftErrors["name.suffix"]}
              value={draft.name.suffix}
              onChange={(e) => updateDraft({ name: { ...draft.name, suffix: sanitizePersonName(e.target.value) } })}
            />
          </div>
        </div>

        <div className="mb-5 grid grid-cols-[1fr_80px] gap-2">
          <CommonInput
            variant="compact"
            type="date"
            label="Birthdate"
            value={draft.birthdate}
            max={formatDate(new Date(), "YYYY-MM-DD")}
            onChange={(e) => handleBirthdateChange(e.target.value)}
            onInput={(e) => handleBirthdateChange(e.currentTarget.value)}
            errorMessage={draftErrors.birthdate}
          />

          <CommonInput
            variant="compact"
            type="number"
            label="Age"
            value={draft.birthdate ? calculateAge(draft.birthdate) : draft.age}
            min={0}
            max={MAX_REASONABLE_AGE}
            onChange={(e) => handleAgeChange(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="mb-1 flex flex-wrap items-baseline justify-between gap-x-2 text-lg font-medium text-slate-900">
            <span>Sex</span>
          </label>

          <div className="flex gap-10">
            <CommonCheckbox
              label="Male"
              checked={draft.gender === "Male"}
              onChange={() => updateDraft({ gender: "Male" })}
            />

            <CommonCheckbox
              label="Female"
              checked={draft.gender === "Female"}
              onChange={() => updateDraft({ gender: "Female" })}
            />
          </div>
          {draftErrors.gender && <p role="alert" className="mt-1 text-xs font-medium text-red-700">{draftErrors.gender}</p>}
        </div>

        <div className="mb-5">
          <CommonInput
            variant="compact"
            type="tel"
            label="Contact Number"
            placeholder="09123456789"
            value={draft.contactNumber}
            maxLength={MAX_CONTACT_NUMBER_LENGTH}
            onChange={(e) => updateDraft({ contactNumber: sanitizeContactNumber(e.target.value) })}
            errorMessage={draftErrors.contactNumber}
          />
        </div>

        <div className="mb-5">
          <label className="mb-1 flex flex-wrap items-baseline justify-between gap-x-2 text-lg font-medium text-slate-900">
            <span>Full Address</span>
          </label>

          <div className="flex items-center gap-2 text-sm">
            <span>Phase</span>
            <CommonInput
              variant="compact"
              className="w-14 px-1 text-center"
              maxLength={MAX_PHASE_LENGTH}
              placeholder="9"
              value={draft.address.phase}
              errorMessage={draftErrors["address.phase"]}
              onChange={(e) => updateDraft({ address: { ...draft.address, phase: sanitizeAddressValue(e.target.value, "phase") } })}
            />

            <span>Package</span>
            <CommonInput
              variant="compact"
              className="w-14 px-1 text-center"
              maxLength={MAX_ADDRESS_PART_LENGTH}
              placeholder="3"
              value={draft.address.package}
              errorMessage={draftErrors["address.package"]}
              onChange={(e) => updateDraft({ address: { ...draft.address, package: sanitizeAddressValue(e.target.value, "package") } })}
            />

            <span>Block</span>
            <CommonInput
              variant="compact"
              className="w-14 px-1 text-center"
              maxLength={MAX_ADDRESS_PART_LENGTH}
              placeholder="25"
              value={draft.address.block}
              errorMessage={draftErrors["address.block"]}
              onChange={(e) => updateDraft({ address: { ...draft.address, block: sanitizeAddressValue(e.target.value, "block") } })}
            />

            <span>Lot</span>
            <CommonInput
              variant="compact"
              className="w-14 px-1 text-center"
              maxLength={MAX_ADDRESS_PART_LENGTH}
              placeholder="16"
              value={draft.address.lot}
              errorMessage={draftErrors["address.lot"]}
              onChange={(e) => updateDraft({ address: { ...draft.address, lot: sanitizeAddressValue(e.target.value, "lot") } })}
            />
          </div>
        </div>

        <div className="mt-auto pt-5">
          {draftError && <p role="alert" className="mb-2 text-sm text-red-700">{draftError}</p>}
          <CommonButton
            type="button"
            variant="orange"
            className="flex w-full items-center justify-center gap-2"
            onClick={addPerson}
            disabled={people.length >= MAX_PASSENGERS}
          >
            Add
            <UserRoundPlus size={18} />
          </CommonButton>
        </div>
      </CommonFormSection>

      <CommonFormSection padded={false}>
        {Object.entries(errors).some(([key]) => key.startsWith("passengers")) && (
          <div role="alert" className="m-3 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
            <p className="font-semibold">Please correct the passenger details:</p>
            <ul className="mt-1 list-inside list-disc">
              {Object.entries(errors)
                .filter(([key]) => key.startsWith("passengers"))
                .map(([key, message]) => <li key={key}>{message}</li>)}
            </ul>
          </div>
        )}
        <div className="h-full overflow-x-auto min-h-21.25">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#180024] text-left text-white">
                <th className="border-r border-gray-400 px-2 py-2">Name</th>
                <th className="w-10 border-r border-gray-400 px-2 py-2">Age</th>
                <th className="w-10 border-r border-gray-400 px-2 py-2">Sex</th>
                <th className="w-32 border-r border-gray-400 px-2 py-2">Contact Num</th>
                <th className="border-r border-gray-400 px-2 py-2">Address</th>
                <th className="w-9" />
              </tr>
            </thead>

            <tbody>
              {people.map((person) => (
                <tr key={person.id} className="border-b border-gray-500">
                  <td className="border-r border-gray-500 px-2 py-2">{formatName(person)}</td>
                  <td className="border-r border-gray-500 px-2 py-2">{person.age}</td>
                  <td className="border-r border-gray-500 px-2 py-2">{person.gender}</td>
                  <td className="border-r border-gray-500 px-2 py-2">{person.contactNumber}</td>
                  <td className="border-r border-gray-500 px-2 py-2">{formatAddress(person)}</td>
                  <td className="px-2 text-center">
                    <button
                      type="button"
                      onClick={() => removePerson(person.id)}
                      className="text-red-500 transition hover:text-red-700"
                      aria-label={`Remove ${formatName(person)}`}
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CommonFormSection>
    </div>
  )
}
