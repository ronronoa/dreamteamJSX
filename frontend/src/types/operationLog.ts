export type Sex = "Male" | "Female" | ""

export type PersonName = {
  surname: string
  firstName: string
  middleInitial: string
  suffix: string
}

export type PersonAddress = {
  phase: string
  package: string
  block: string
  lot: string
}

export type Person = {
  id: string
  name: PersonName
  birthdate: string
  age: number | ""
  sex: Sex
  contactNumber: string
  address: PersonAddress
}

export type OperationDetails = {
  submitterName: string
  date: string
  natureOfOperation: string
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

export type OperationLogData = {
  operationDetails: OperationDetails
  dispatch: VehicularDispatch
  people: Person[]
}

export const createEmptyPersonName = (): PersonName => ({
  surname: "",
  firstName: "",
  middleInitial: "",
  suffix: "",
})

export const createEmptyPerson = (): Person => ({
  id: crypto.randomUUID(),
  name: createEmptyPersonName(),
  birthdate: "",
  age: "",
  sex: "",
  contactNumber: "",
  address: { phase: "", package: "", block: "", lot: "" },
})

export const createEmptyOperationLogData = (): OperationLogData => ({
  operationDetails: {
    submitterName: "",
    date: "",
    natureOfOperation: "",
    caller: createEmptyPersonName(),
    teamAssigned: [],
    responders: [],
  },
  dispatch: {
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
  },
  people: [],
})

export const calculateAge = (birthdate: string): number | "" => {
  if (!birthdate) return ""

  const birthDate = new Date(birthdate)
  if (Number.isNaN(birthDate.getTime())) return ""

  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()

  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())

  if (!hasHadBirthdayThisYear) age -= 1

  return age
}
