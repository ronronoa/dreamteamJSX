import { useState } from "react"
import { Trash, UserRoundPlus } from "lucide-react"

import CommonButton from "../../../components/common/widgets/CommonButton"
import { createFormAutocomplete } from "../component/ReportAutocompleteInput"
import CommonCheckbox from "../../../components/common/widgets/CommonCheckbox"
import CommonFormSection from "../component/CommonFormSection"

import { calculateAge } from "../../../types/operationLog"
import { createEmptyPerson, type Person } from "../../../types/vehicularDispatchReport"
import type { VehicularDispatchErrors } from "./formValidation"
import { formatDate } from "@/utils/dateTime"

const MAX_PASSENGERS = 100
const MAX_CONTACT_NUMBER_LENGTH = 20
const CommonInput = createFormAutocomplete("vehicular-dispatches")

type VehicularStep2Props = {
  people: Person[]
  onPeopleChange: (people: Person[]) => void
  errors: VehicularDispatchErrors
}

export default function VehicularStep2({ people, onPeopleChange, errors }: VehicularStep2Props) {
  const [draft, setDraft] = useState<Person>(createEmptyPerson())
  const [draftError, setDraftError] = useState("")
  const today = formatDate(new Date(), "YYYY-MM-DD")
  const draftErrors = {
    surname: draft.name.surname.trim() ? "" : "Enter the passenger's surname.",
    firstName: draft.name.firstName.trim() ? "" : "Enter the passenger's first name.",
    birthdate: !draft.birthdate || draft.birthdate > today || draft.age === "" ? "Choose a valid birthdate that is not in the future." : "",
    gender: draft.gender ? "" : "Select the passenger's sex.",
    contactNumber: draft.contactNumber.trim().length > MAX_CONTACT_NUMBER_LENGTH ? `Contact number must be ${MAX_CONTACT_NUMBER_LENGTH} characters or fewer.` : "",
  }


  const updateDraft = (patch: Partial<Person>) => {
    const updatedDraft = { ...draft, ...patch }
    setDraft(updatedDraft)
    setDraftError("")
  }

  const handleBirthdateChange = (birthdate: string) => {
    updateDraft({ birthdate, age: calculateAge(birthdate) })
  }

  const addPerson = () => {
    if (people.length >= MAX_PASSENGERS) {
      setDraftError(`Add no more than ${MAX_PASSENGERS} passengers.`)
      return
    }

    const today = formatDate(new Date(), "YYYY-MM-DD")
    if (!draft.name.surname.trim() || !draft.name.firstName.trim() || !draft.birthdate || !draft.gender) {
      setDraftError("Enter the passenger's name, birthdate, and sex before adding them.")
      return
    }
    if (draft.birthdate > today || draft.age === "") {
      setDraftError("Choose a valid birthdate that is not in the future.")
      return
    }
    if (draft.contactNumber.trim().length > MAX_CONTACT_NUMBER_LENGTH) {
      setDraftError(`Contact number must be ${MAX_CONTACT_NUMBER_LENGTH} characters or fewer.`)
      return
    }

    onPeopleChange([...people, { ...draft }])
    setDraft(createEmptyPerson())
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
        <div className="mb-5">
          <label className="mb-1 flex flex-wrap items-baseline justify-between gap-x-2 text-lg font-medium text-slate-900">
            <span>Full Name</span>
          </label>

          <div className="grid grid-cols-[1fr_1fr_85px_85px] gap-1.5">
            <CommonInput
              variant="compact"
              placeholder="Surname"
              value={draft.name.surname}
              errorMessage={draftErrors.surname}
              onChange={(e) => updateDraft({ name: { ...draft.name, surname: e.target.value } })}
            />

            <CommonInput
              variant="compact"
              placeholder="First Name"
              value={draft.name.firstName}
              errorMessage={draftErrors.firstName}
              onChange={(e) => updateDraft({ name: { ...draft.name, firstName: e.target.value } })}
            />

            <CommonInput
              variant="compact"
              className="px-1"
              placeholder="M.I"
              value={draft.name.middleInitial}
              onChange={(e) => updateDraft({ name: { ...draft.name, middleInitial: e.target.value } })}
            />

            <CommonInput
              variant="compact"
              className="px-1"
              placeholder="Sfx"
              value={draft.name.suffix}
              onChange={(e) => updateDraft({ name: { ...draft.name, suffix: e.target.value } })}
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
            errorMessage={draftErrors.birthdate}
          />

          <CommonInput
            variant="compact"
            label="Age"
            value={draft.age === "" ? "" : String(draft.age)}
            placeholder="69"
            readOnly
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
            onChange={(e) => updateDraft({ contactNumber: e.target.value })}
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
              className="w-9 px-1 text-center"
              placeholder="9"
              value={draft.address.phase}
              onChange={(e) => updateDraft({ address: { ...draft.address, phase: e.target.value } })}
            />

            <span>Package</span>
            <CommonInput
              variant="compact"
              className="w-9 px-1 text-center"
              placeholder="3"
              value={draft.address.package}
              onChange={(e) => updateDraft({ address: { ...draft.address, package: e.target.value } })}
            />

            <span>Block</span>
            <CommonInput
              variant="compact"
              className="w-9 px-1 text-center"
              placeholder="25"
              value={draft.address.block}
              onChange={(e) => updateDraft({ address: { ...draft.address, block: e.target.value } })}
            />

            <span>Lot</span>
            <CommonInput
              variant="compact"
              className="w-9 px-1 text-center"
              placeholder="16"
              value={draft.address.lot}
              onChange={(e) => updateDraft({ address: { ...draft.address, lot: e.target.value } })}
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
