import { useState } from "react"
import { Trash, UserRoundPlus } from "lucide-react"

import CommonButton from "../../../components/common/widgets/CommonButton"
import CommonInput from "../../../components/common/widgets/CommonInput"
import CommonCheckbox from "../../../components/common/widgets/CommonCheckbox"
import CommonFormSection from "../CommonFormSection"

import type { Person } from "../../../types/operationLog"
import { calculateAge, createEmptyPerson } from "../../../types/operationLog"

type OperationStep2Props = {
  people: Person[]
  onPeopleChange: (people: Person[]) => void
}

export default function OperationStep2({ people, onPeopleChange }: OperationStep2Props) {
  const [draft, setDraft] = useState<Person>(createEmptyPerson())

  const updateDraft = (patch: Partial<Person>) => {
    setDraft((current) => ({ ...current, ...patch }))
  }

  const handleBirthdateChange = (birthdate: string) => {
    updateDraft({ birthdate, age: calculateAge(birthdate) })
  }

  const addPerson = () => {
    if (!draft.name.surname || !draft.name.firstName) return

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
          <label className="mb-1 block text-lg font-medium text-slate-900">Full Name</label>

          <div className="grid grid-cols-[1fr_1fr_85px_85px] gap-1.5">
            <CommonInput
              variant="compact"
              placeholder="Surname"
              value={draft.name.surname}
              onChange={(e) => updateDraft({ name: { ...draft.name, surname: e.target.value } })}
            />

            <CommonInput
              variant="compact"
              placeholder="First Name"
              value={draft.name.firstName}
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
            onChange={(e) => handleBirthdateChange(e.target.value)}
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
          <label className="mb-1 block text-lg font-medium text-slate-900">Sex</label>

          <div className="flex gap-10">
            <CommonCheckbox
              label="Male"
              checked={draft.sex === "Male"}
              onChange={() => updateDraft({ sex: "Male" })}
            />

            <CommonCheckbox
              label="Female"
              checked={draft.sex === "Female"}
              onChange={() => updateDraft({ sex: "Female" })}
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
            onChange={(e) => updateDraft({ contactNumber: e.target.value })}
          />
        </div>

        <div className="mb-5">
          <label className="mb-1 block text-lg font-medium text-slate-900">Full Address</label>

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
        <div className="h-full overflow-x-auto min-h-[85px]">
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
                  <td className="border-r border-gray-500 px-2 py-2">{person.sex}</td>
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
