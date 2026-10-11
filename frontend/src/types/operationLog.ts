export interface PendingOperationRequest {
  id: string;
  date: Date;
  caller: string;
  incident: string;
  location: string;
  team: string;
}

export interface OperationLogRecord extends PendingOperationRequest {
  submittedBy: string;
}


// --------------------------------------------------------------
// step1 operationDetails


export type Gender = "Male" | "Female" | ""

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

export type OperationDetails = {
  submitterName: string
  date: string
  natureOfOperation: string
  nameOfCaller: PersonName
  teamAssigned: string[]
  responders: string[]
}
export type VehicularDispatch = {
  from: string

  to: string
  vehicle: string
  vehicleOther?: string;   // ← add this
  driver: string
  departTime: string
  departPeriod: "AM" | "PM"
  arrivalTime: string
  arrivalPeriod: "AM" | "PM"
  odometerIn: string
  odometerOut: string
}

export const createEmptyOperationDetails = (): OperationDetails => ({
  submitterName: "",
  date: "",
  natureOfOperation: "",
  nameOfCaller: createEmptyPersonName(),
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
// step2 peopleInvolved

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
  gender: Gender
  contactNumber: string
  address: PersonAddress
}

export const createEmptyPerson = (): Person => ({
  id: crypto.randomUUID(),
  name: createEmptyPersonName(),
  birthdate: "",
  age: "",
  gender: "",
  contactNumber: "",
  address: { phase: "", package: "", block: "", lot: "" },
})

export { calculateAge } from "../utils/dateTime"

// --------------------------------------------------------------
// step3 operationDesc & inventory

export type OperationDescription = {
  description: string
  images: File[]
}

export type InventoryItem = {
  id: string
  itemName: string
  quantity: string
  inventoryItemId?: string
  unit?: string
}

export const createEmptyOperationDescription = (): OperationDescription => ({
  description: "",
  images: [],
})

export const createEmptyInventoryItem = (): InventoryItem => ({
  id: crypto.randomUUID(),
  itemName: "",
  quantity: "",
})

// --------------------------------------------------------------
// step4 summary

export type OperationLogData = {
  pinNumber: number | null
  operationDetails: OperationDetails
  dispatch: VehicularDispatch
  people: Person[]
  operationDescription: OperationDescription
  inventory: InventoryItem[]
}

export const createEmptyOperationLogData = (): OperationLogData => ({
  pinNumber: null,
  operationDetails: createEmptyOperationDetails(),
  dispatch: createEmptyVehicularDispatch(),
  people: [],
  operationDescription: createEmptyOperationDescription(),
  inventory: [],
})
