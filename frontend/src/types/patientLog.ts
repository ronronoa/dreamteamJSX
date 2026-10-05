export interface PendingPatientRecord {
  id: string;
  date: Date;
  nameOfPatient: string;
  age: string;
  address: string;
  assessment: string;
  submittedBy: string;
}

export interface PatientLogRecord extends PendingPatientRecord {
  time: string;
}

// --------------------------------------------------------------
// step1 responderDetails

export type Sex = "Male" | "Female" | ""

export type PersonName = {
  surname: string
  firstName: string
  middleInitial: string
  suffix: string
}

export const createEmptyPersonName = (): PersonName => ({
  surname: "",
  firstName: "",
  middleInitial: "",
  suffix: "",
})

export type ResponderDetails = {
  submitterName: string
  date: string
  typeOfRequest: string
  caller: PersonName
  teamAssigned: string[]
  responders: string[]
}

export type VehicularDispatch = {
  from: string
  to: string
  vehicle: string
  driver: string
  departTime: string
  departPeriod: "AM" | "PM"
  arrivalTime: string
  arrivalPeriod: "AM" | "PM"
  odometerIn: string
  odometerOut: string
}

export const createEmptyResponderDetails = (): ResponderDetails => ({
  submitterName: "",
  date: "",
  typeOfRequest: "",
  caller: createEmptyPersonName(),
  teamAssigned: [],
  responders: [],
})

export const createEmptyVehicularDispatch = (): VehicularDispatch => ({
  from: "",
  to: "",
  vehicle: "",
  driver: "",
  departTime: "",
  departPeriod: "AM",
  arrivalTime: "",
  arrivalPeriod: "AM",
  odometerIn: "",
  odometerOut: "",
})

// --------------------------------------------------------------
// step2 patient + first aid & hospital


export type PatientAddress = {
  phase: string
  package: string
  block: string
  lot: string
}

export const createEmptyPatientAddress = (): PatientAddress => ({
  phase: "",
  package: "",
  block: "",
  lot: "",
})

export type PatientDetails = {
  name: PersonName
  birthdate: string
  age: number | ""
  sex: Sex
  contactPerson: PersonName
  contactNumber: string
  address: PatientAddress
}

export const createEmptyPatientDetails = (): PatientDetails => ({
  name: createEmptyPersonName(),
  birthdate: "",
  age: "",
  sex: "",
  contactPerson: createEmptyPersonName(),
  contactNumber: "",
  address: createEmptyPatientAddress(),
})

export type FirstAidHospitalDetails = {
  bp: string
  pr: string
  spo2: string
  temp: string
  medicalAssessment: string
  firstAidGiven: string
  hospitalName: string
  hospitalRepresentative: PersonName
  hospitalInTime: string
  hospitalInPeriod: "AM" | "PM"
  hospitalOutTime: string
  hospitalOutPeriod: "AM" | "PM"
}

export const createEmptyFirstAidHospital = (): FirstAidHospitalDetails => ({
  bp: "",
  pr: "",
  spo2: "",
  temp: "",
  medicalAssessment: "",
  firstAidGiven: "",
  hospitalName: "",
  hospitalRepresentative: createEmptyPersonName(),
  hospitalInTime: "",
  hospitalInPeriod: "AM",
  hospitalOutTime: "",
  hospitalOutPeriod: "AM",
})

export const calculateAge = (birthdate: string): number | "" => {
  if (!birthdate) return ""
  const birth = new Date(birthdate)
  if (Number.isNaN(birth.getTime())) return ""
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const hadBirthday =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate())
  if (!hadBirthday) age -= 1
  return age
}

// --------------------------------------------------------------
// step3 waiver form & inventory

export type WaiverForm = {
  images: File[]
}

export const createEmptyWaiverForm = (): WaiverForm => ({
  images: [],
})

export type InventoryItem = {
  id: string
  itemName: string
  quantity: string
}

export const createEmptyInventoryItem = (): InventoryItem => ({
  id: crypto.randomUUID(),
  itemName: "",
  quantity: "",
})


// ----

export type PatientLogData = {
  pinNumber: number | null
  responderDetails: ResponderDetails
  dispatch: VehicularDispatch
  patientDetails: PatientDetails
  firstAidHospital: FirstAidHospitalDetails
  waiverForm: WaiverForm
  inventory: InventoryItem[]
}

export const createEmptyPatientLogData = (): PatientLogData => ({
  pinNumber: null,
  responderDetails: createEmptyResponderDetails(),
  dispatch: createEmptyVehicularDispatch(),
  patientDetails: createEmptyPatientDetails(),
  firstAidHospital: createEmptyFirstAidHospital(),
  waiverForm: createEmptyWaiverForm(),
  inventory: [],
})
