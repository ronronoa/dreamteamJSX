import { useState } from "react"
import { Trash, UserRoundPlus } from "lucide-react"

import CommonButton from "../../../components/common/widgets/CommonButton"
import { createFormAutocomplete } from "../component/ReportAutocompleteInput"
import CommonCheckbox from "../../../components/common/widgets/CommonCheckbox"
import CommonFormSection from "../component/CommonFormSection"
import { MAX_ADDRESS_PART_LENGTH, MAX_CONTACT_NUMBER_LENGTH, sanitizeAddressValue, sanitizeContactNumber } from "../reportFieldRules"

import type { Person } from "../../../types/operationLog"
import { calculateAge, createEmptyPerson } from "../../../types/operationLog"
import { validatePerson, type FormErrors } from "./formValidation"
import { calculateBirthdateFromAge, getCurrentDateInputValue, getMinimumBirthdateInputValue, MAX_REASONABLE_AGE } from "@/utils/dateTime"

const CommonInput = createFormAutocomplete("operations")

type OperationStep2Props = {
  people: Person[]
  onPeopleChange: (people: Person[]) => void
  errors: FormErrors
}

export default function OperationStep2({ people, onPeopleChange, errors }: OperationStep2Props) {
  const [draft, setDraft] = useState<Person>(createEmptyPerson())
  const draftErrors = validatePerson(draft)

  function formatGroupedErrors(fields: Array<[string, string]>) {
    return fields.filter(([, message]) => Boolean(message)).map(([label, message]) => `${label}: ${message}`).join(" ")
  }

  const updateDraft = (patch: Partial<Person>) => {
    const updatedDraft = { ...draft, ...patch }
    setDraft(updatedDraft)
  }

  const handleBirthdateChange = (birthdate: string) => {
    updateDraft({ birthdate, age: calculateAge(birthdate) })
  }

  const handleAgeChange = (value: string) => {
    const birthdate = calculateBirthdateFromAge(value)
    updateDraft({ birthdate, age: birthdate ? Number(value) : "" })
  }

  const addPerson = () => {
    const validationErrors = validatePerson(draft)
    if (Object.keys(validationErrors).length > 0) return

    onPeopleChange([...people, { ...draft, id: crypto.randomUUID() }])
    setDraft(createEmptyPerson())
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
      <CommonFormSection title="PEOPLE INVOLVED">
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
              onChange={(e) => updateDraft({ name: { ...draft.name, surname: e.target.value } })}
            />

            <CommonInput
              variant="compact"
              placeholder="First Name"
              value={draft.name.firstName}
              errorMessage={draftErrors["name.firstName"]}
              onChange={(e) => updateDraft({ name: { ...draft.name, firstName: e.target.value } })}
            />

            <CommonInput
              variant="compact"
              className="px-1"
              placeholder="M.I"
              value={draft.name.middleInitial}
              errorMessage={draftErrors["name.middleInitial"]}
              onChange={(e) => updateDraft({ name: { ...draft.name, middleInitial: e.target.value } })}
            />

            <CommonInput
              variant="compact"
              className="px-1"
              placeholder="Sfx"
              value={draft.name.suffix}
              errorMessage={draftErrors["name.suffix"]}
              onChange={(e) => updateDraft({ name: { ...draft.name, suffix: e.target.value } })}
            />
          </div>
        </div>

        <div className="mb-5 grid grid-cols-[1fr_8rem] gap-2">
          <CommonInput
            variant="compact"
            type="date"
            label="Birthdate"
            value={draft.birthdate}
            min={getMinimumBirthdateInputValue()}
            max={getCurrentDateInputValue()}
            onChange={(e) => handleBirthdateChange(e.target.value)}
            errorMessage={draftErrors.birthdate}
          />

          <CommonInput
            variant="compact"
            type="number"
            label="Age"
            value={draft.age === "" ? "" : String(draft.age)}
            min={0}
            max={MAX_REASONABLE_AGE}
            onChange={(e) => handleAgeChange(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="mb-1 flex flex-wrap items-baseline justify-between gap-x-2 text-lg font-medium text-slate-900">
            <span>Sex</span>
            {draftErrors.gender && <span role="alert" className="text-xs font-medium text-red-700">{draftErrors.gender}</span>}
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
            {formatGroupedErrors([
              ["Phase", draftErrors["address.phase"] ?? ""],
              ["Package", draftErrors["address.package"] ?? ""],
              ["Block", draftErrors["address.block"] ?? ""],
              ["Lot", draftErrors["address.lot"] ?? ""],
            ]) && <span role="alert" className="text-xs font-medium text-red-700">{formatGroupedErrors([
              ["Phase", draftErrors["address.phase"] ?? ""],
              ["Package", draftErrors["address.package"] ?? ""],
              ["Block", draftErrors["address.block"] ?? ""],
              ["Lot", draftErrors["address.lot"] ?? ""],
            ])}</span>}
          </label>

          <div className="flex items-center gap-2 text-sm">
            <span>Phase</span>
            <CommonInput
              variant="compact"
              className="w-9 px-1 text-center"
              maxLength={MAX_ADDRESS_PART_LENGTH}
              placeholder="9"
              value={draft.address.phase}
              errorMessage={draftErrors["address.phase"]}
              onChange={(e) => updateDraft({ address: { ...draft.address, phase: sanitizeAddressValue(e.target.value) } })}
            />

            <span>Package</span>
            <CommonInput
              variant="compact"
              className="w-9 px-1 text-center"
              maxLength={MAX_ADDRESS_PART_LENGTH}
              placeholder="3"
              value={draft.address.package}
              errorMessage={draftErrors["address.package"]}
              onChange={(e) => updateDraft({ address: { ...draft.address, package: sanitizeAddressValue(e.target.value) } })}
            />

            <span>Block</span>
            <CommonInput
              variant="compact"
              className="w-9 px-1 text-center"
              maxLength={MAX_ADDRESS_PART_LENGTH}
              placeholder="25"
              value={draft.address.block}
              errorMessage={draftErrors["address.block"]}
              onChange={(e) => updateDraft({ address: { ...draft.address, block: sanitizeAddressValue(e.target.value) } })}
            />

            <span>Lot</span>
            <CommonInput
              variant="compact"
              className="w-9 px-1 text-center"
              maxLength={MAX_ADDRESS_PART_LENGTH}
              placeholder="16"
              value={draft.address.lot}
              errorMessage={draftErrors["address.lot"]}
              onChange={(e) => updateDraft({ address: { ...draft.address, lot: sanitizeAddressValue(e.target.value) } })}
            />
          </div>
        </div>

        <div className="mt-auto pt-5">
          <CommonButton
            type="button"
            variant="orange"
            className="flex w-full items-center justify-center gap-2"
            onClick={addPerson}
          >
            Add
            <UserRoundPlus size={18} />
          </CommonButton>
        </div>
      </CommonFormSection>

      <CommonFormSection padded={false}>
        {errors.people && (
          <p role="alert" className="px-3 pt-3 text-sm font-medium text-red-700">
            {errors.people}
          </p>
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
