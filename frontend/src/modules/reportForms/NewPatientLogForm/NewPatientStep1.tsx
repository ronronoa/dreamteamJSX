import CommonInput from "../../../components/common/widgets/CommonInput"
import CommonSelect from "../../../components/common/widgets/CommonSelect"
import CommonCheckbox from "../../../components/common/widgets/CommonCheckbox"
import CommonTimeInput from "../../../components/common/widgets/CommonTimeInput"
import CommonFormSection from "../component/CommonFormSection"


const NATURE_OPTIONS = [
  { label: "Rescue", value: "rescue" },
  { label: "Medical Emergency", value: "medical" },
  { label: "Fire Response", value: "fire" },
  { label: "Other", value: "other" },
]

const TRANSFER_OPTIONS = ["Drop-off", "Pick-uo"]

const RESPONDER_OPTIONS = [
  { label: "Responder 1", value: "responder-1" },
  { label: "Responder 2", value: "responder-2" },
]

const VEHICLE_OPTIONS = [
  { label: "Vehicle 1", value: "vehicle-1" },
  { label: "Vehicle 2", value: "vehicle-2" },
]


export default function NewPatientStep1() {

  return (
    <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
      <CommonFormSection title="RESPONDER  DETAILS">
        <div className="space-y-4">
          <CommonInput
            variant="compact"
            label="Name of Submitter"
            placeholder="Place holder"
          />

          <CommonInput
            variant="compact"
            type="date"
            label="Date"
          />

          <CommonSelect
            variant="compact"
            label="Type of Request"
            placeholder="Dropdown Menu"
            options={NATURE_OPTIONS}
          />

          <div>
            <label className="mb-1 block text-lg font-medium text-slate-900">Name of Caller</label>

            <div className="grid grid-cols-[1fr_1fr_80px_80px] gap-2">
              <CommonInput
                variant="compact"
                placeholder="Surname"
              />

              <CommonInput
                variant="compact"
                placeholder="First Name"
              />

              <CommonInput
                variant="compact"
                placeholder="M.I"
              />

              <CommonInput
                variant="compact"
                placeholder="Sfx"
              />
            </div>
          </div>

          <CommonSelect
            variant="compact"
            label="Responders"
            placeholder="Drop Checkbox"
            options={RESPONDER_OPTIONS}
          />

          <div>
            <label className="mb-1 block text-lg font-medium text-slate-900">Team Assigned</label>

            <div className="flex gap-8">
              {TRANSFER_OPTIONS.map((options) => (
                <CommonCheckbox
                  key={options}
                  label={options}
                />
              ))}
            </div>
          </div>

        </div>
      </CommonFormSection>

      <CommonFormSection title="VEHICULAR DISPATCH">
        <div className="space-y-4">
          <CommonInput
            variant="compact"
            label="From"
            placeholder="Ex. Barangay Hall"
          />

          <CommonInput
            variant="compact"
            label="To"
            placeholder="Ex. Barangay Hall"
          />

          <CommonSelect
            variant="compact"
            label="Vehicle"
            placeholder="Dropdown Menu"
            options={VEHICLE_OPTIONS}
          />

          <CommonInput
            variant="compact"
            label="Driver"
            placeholder="Ex. Barangay Hall"
          />

          <div className="grid grid-cols-2 gap-5">
            {/* <CommonTimeInput */}
            {/*   label="Depart" */}
            {/*   time={dispatch.departTime} */}
            {/*   period={dispatch.departPeriod} */}
            {/*   onTimeChange={(value) => onDispatchChange({ departTime: value })} */}
            {/*   onPeriodChange={(value) => onDispatchChange({ departPeriod: value })} */}
            {/* /> */}
            {/**/}
            <CommonTimeInput
              label="Depart"
            />
            <CommonTimeInput
              label="Arrival"
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <CommonInput
              variant="compact"
              type="number"
              label="Odometer In"
              placeholder="123456"
            />

            <CommonInput
              variant="compact"
              type="number"
              label="Odometer Out"
              placeholder="123456"
            />
          </div>
        </div>
      </CommonFormSection>
    </div>
  )
}
