import CommonInput from "../../../components/common/widgets/CommonInput"
import CommonCheckbox from "../../../components/common/widgets/CommonCheckbox"
import CommonTimeInput from "../../../components/common/widgets/CommonTimeInput"
import CommonVitalField from "@/components/common/widgets/CommonVitalField"
import CommonFormSection from "../component/CommonFormSection"

import {
  calculateAge,
  type PatientDetails,
  type FirstAidHospitalDetails,
} from "@/types/patientLog"

type PatientStep2Props = {
  patientDetails: PatientDetails
  onPatientDetailsChange: (patch: Partial<PatientDetails>) => void
  firstAidHospital: FirstAidHospitalDetails
  onFirstAidHospitalChange: (patch: Partial<FirstAidHospitalDetails>) => void
}

export default function PatientStep2({
  patientDetails,
  onPatientDetailsChange,
  firstAidHospital,
  onFirstAidHospitalChange,
}: PatientStep2Props) {
  function handleBirthdateChange(value: string) {
    onPatientDetailsChange({
      birthdate: value,
      age: calculateAge(value),
    })
  }

  return (
    <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
      {/* ------------------------------ PATIENT DETAILS ------------------------------ */}
      <CommonFormSection title="PATIENT DETAILS">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-lg font-medium text-slate-900">Name of Patient</label>

            <div className="grid grid-cols-[1fr_1fr_80px_80px] gap-2">
              <CommonInput
                variant="compact"
                placeholder="Surname"
                value={patientDetails.name.surname}
                onChange={(e) =>
                  onPatientDetailsChange({
                    name: { ...patientDetails.name, surname: e.target.value },
                  })
                }
              />
              <CommonInput
                variant="compact"
                placeholder="First Name"
                value={patientDetails.name.firstName}
                onChange={(e) =>
                  onPatientDetailsChange({
                    name: { ...patientDetails.name, firstName: e.target.value },
                  })
                }
              />
              <CommonInput
                variant="compact"
                placeholder="M.I"
                value={patientDetails.name.middleInitial}
                onChange={(e) =>
                  onPatientDetailsChange({
                    name: { ...patientDetails.name, middleInitial: e.target.value },
                  })
                }
              />
              <CommonInput
                variant="compact"
                placeholder="Sfx"
                value={patientDetails.name.suffix}
                onChange={(e) =>
                  onPatientDetailsChange({
                    name: { ...patientDetails.name, suffix: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <div className="mb-5 grid grid-cols-[1fr_80px] gap-2">
            <CommonInput
              variant="compact"
              type="date"
              label="Birthdate"
              value={patientDetails.birthdate}
              onChange={(e) => handleBirthdateChange(e.target.value)}
            />
            <CommonInput
              variant="compact"
              label="Age"
              placeholder="69"
              value={patientDetails.age}
              readOnly
            />
          </div>

          <div className="mb-5">
            <label className="mb-1 block text-lg font-medium text-slate-900">Sex</label>

            <div className="flex gap-10">
              <CommonCheckbox
                label="Male"
                checked={patientDetails.sex === "Male"}
                onChange={() => onPatientDetailsChange({ sex: "Male" })}
              />
              <CommonCheckbox
                label="Female"
                checked={patientDetails.sex === "Female"}
                onChange={() => onPatientDetailsChange({ sex: "Female" })}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-lg font-medium text-slate-900">Contact Person</label>

            <div className="grid grid-cols-[1fr_1fr_80px_80px] gap-2">
              <CommonInput
                variant="compact"
                placeholder="Surname"
                value={patientDetails.contactPerson.surname}
                onChange={(e) =>
                  onPatientDetailsChange({
                    contactPerson: { ...patientDetails.contactPerson, surname: e.target.value },
                  })
                }
              />
              <CommonInput
                variant="compact"
                placeholder="First Name"
                value={patientDetails.contactPerson.firstName}
                onChange={(e) =>
                  onPatientDetailsChange({
                    contactPerson: { ...patientDetails.contactPerson, firstName: e.target.value },
                  })
                }
              />
              <CommonInput
                variant="compact"
                placeholder="M.I"
                value={patientDetails.contactPerson.middleInitial}
                onChange={(e) =>
                  onPatientDetailsChange({
                    contactPerson: { ...patientDetails.contactPerson, middleInitial: e.target.value },
                  })
                }
              />
              <CommonInput
                variant="compact"
                placeholder="Sfx"
                value={patientDetails.contactPerson.suffix}
                onChange={(e) =>
                  onPatientDetailsChange({
                    contactPerson: { ...patientDetails.contactPerson, suffix: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <CommonInput
            variant="compact"
            label="Contact Number"
            placeholder="0912345678"
            value={patientDetails.contactNumber}
            onChange={(e) => onPatientDetailsChange({ contactNumber: e.target.value })}
          />

          <div className="mb-5">
            <label className="mb-1 block text-lg font-medium text-slate-900">Full Address</label>

            <div className="flex items-center gap-2 text-sm">
              <span>Phase</span>
              <CommonInput
                variant="compact"
                className="w-9 px-1 text-center"
                placeholder="9"
                value={patientDetails.address.phase}
                onChange={(e) =>
                  onPatientDetailsChange({
                    address: { ...patientDetails.address, phase: e.target.value },
                  })
                }
              />
              <span>Package</span>
              <CommonInput
                variant="compact"
                className="w-9 px-1 text-center"
                placeholder="3"
                value={patientDetails.address.package}
                onChange={(e) =>
                  onPatientDetailsChange({
                    address: { ...patientDetails.address, package: e.target.value },
                  })
                }
              />
              <span>Block</span>
              <CommonInput
                variant="compact"
                className="w-9 px-1 text-center"
                placeholder="25"
                value={patientDetails.address.block}
                onChange={(e) =>
                  onPatientDetailsChange({
                    address: { ...patientDetails.address, block: e.target.value },
                  })
                }
              />
              <span>Lot</span>
              <CommonInput
                variant="compact"
                className="w-9 px-1 text-center"
                placeholder="16"
                value={patientDetails.address.lot}
                onChange={(e) =>
                  onPatientDetailsChange({
                    address: { ...patientDetails.address, lot: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </div>
      </CommonFormSection>

      {/* ----------------------- FIRST AID & HOSPITAL DETAILS ----------------------- */}
      <CommonFormSection title="FIRST AID & HOSPITAL DETAILS">
        <div className="space-y-4">
          {/* vitals row */}
          <div>
            <label className="mb-1 block text-lg font-medium text-slate-900">First Aid</label>

            <div className="flex items-center gap-4">
              <CommonVitalField
                label="BP"
                placeholder="000/000"
                className="w-24"
                value={firstAidHospital.bp}
                onChange={(e) => onFirstAidHospitalChange({ bp: e.target.value })}
              />
              <CommonVitalField
                label="PR"
                placeholder="90"
                value={firstAidHospital.pr}
                onChange={(e) => onFirstAidHospitalChange({ pr: e.target.value })}
              />
              <CommonVitalField
                label="SPO2"
                placeholder="00%"
                value={firstAidHospital.spo2}
                onChange={(e) => onFirstAidHospitalChange({ spo2: e.target.value })}
              />
              <CommonVitalField
                label="Temp"
                placeholder="16°C"
                value={firstAidHospital.temp}
                onChange={(e) => onFirstAidHospitalChange({ temp: e.target.value })}
              />
            </div>
          </div>

          {/* medical assessment */}
          <div>
            <label className="mb-1 block text-lg font-medium text-slate-900">
              Medical Assessment
            </label>
            <textarea
              rows={3}
              placeholder="Provide a medical assessment of the patient"
              value={firstAidHospital.medicalAssessment}
              onChange={(e) => onFirstAidHospitalChange({ medicalAssessment: e.target.value })}
              className="w-full resize-none rounded-md border border-gray-300 bg-gray-100 px-2 py-1.5 text-sm text-gray-800 outline-none focus:border-purple-500"
            />
          </div>

          {/* first aid */}
          <div>
            <label className="mb-1 block text-lg font-medium text-slate-900">First Aid</label>
            <textarea
              rows={2}
              placeholder="Place holder"
              value={firstAidHospital.firstAidGiven}
              onChange={(e) => onFirstAidHospitalChange({ firstAidGiven: e.target.value })}
              className="w-full resize-none rounded-md border border-gray-300 bg-gray-100 px-2 py-1.5 text-sm text-gray-800 outline-none focus:border-purple-500"
            />
          </div>

          <CommonInput
            variant="compact"
            label="Hospital Name"
            placeholder="Ex. Tala Hospital"
            value={firstAidHospital.hospitalName}
            onChange={(e) => onFirstAidHospitalChange({ hospitalName: e.target.value })}
          />

          <div>
            <label className="mb-1 block text-lg font-medium text-slate-900">
              Hospital Representative
            </label>

            <div className="grid grid-cols-[1fr_1fr_80px_80px] gap-2">
              <CommonInput
                variant="compact"
                placeholder="Surname"
                value={firstAidHospital.hospitalRepresentative.surname}
                onChange={(e) =>
                  onFirstAidHospitalChange({
                    hospitalRepresentative: {
                      ...firstAidHospital.hospitalRepresentative,
                      surname: e.target.value,
                    },
                  })
                }
              />
              <CommonInput
                variant="compact"
                placeholder="First Name"
                value={firstAidHospital.hospitalRepresentative.firstName}
                onChange={(e) =>
                  onFirstAidHospitalChange({
                    hospitalRepresentative: {
                      ...firstAidHospital.hospitalRepresentative,
                      firstName: e.target.value,
                    },
                  })
                }
              />
              <CommonInput
                variant="compact"
                placeholder="M.I"
                value={firstAidHospital.hospitalRepresentative.middleInitial}
                onChange={(e) =>
                  onFirstAidHospitalChange({
                    hospitalRepresentative: {
                      ...firstAidHospital.hospitalRepresentative,
                      middleInitial: e.target.value,
                    },
                  })
                }
              />
              <CommonInput
                variant="compact"
                placeholder="Sfx"
                value={firstAidHospital.hospitalRepresentative.suffix}
                onChange={(e) =>
                  onFirstAidHospitalChange({
                    hospitalRepresentative: {
                      ...firstAidHospital.hospitalRepresentative,
                      suffix: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <CommonTimeInput
              label="Hospital In"
              time={firstAidHospital.hospitalInTime}
              period={firstAidHospital.hospitalInPeriod}
              onTimeChange={(value) => onFirstAidHospitalChange({ hospitalInTime: value })}
              onPeriodChange={(value) => onFirstAidHospitalChange({ hospitalInPeriod: value })}
            />
            <CommonTimeInput
              label="Hospital Out"
              time={firstAidHospital.hospitalOutTime}
              period={firstAidHospital.hospitalOutPeriod}
              onTimeChange={(value) => onFirstAidHospitalChange({ hospitalOutTime: value })}
              onPeriodChange={(value) => onFirstAidHospitalChange({ hospitalOutPeriod: value })}
            />
          </div>
        </div>
      </CommonFormSection>
    </div>
  )
}
