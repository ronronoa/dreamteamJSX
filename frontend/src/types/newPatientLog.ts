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

export const createEmptyOperationDetails = (): ResponderDetails => ({
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
