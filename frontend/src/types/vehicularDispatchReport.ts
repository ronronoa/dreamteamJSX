import {
  createEmptyPerson,
  createEmptyVehicularDispatch,
  type Person,
  type VehicularDispatch,
} from "./operationLog"

export type DispatchTransfer = "Drop-Off" | "Pick-Up"

export type VehicularDispatchDetails = {
  submitterName: string
  date: string
  natureOfOperation: string
  transfers: DispatchTransfer[]
}

export type VehicularDispatchReportData = {
  details: VehicularDispatchDetails
  dispatch: VehicularDispatch
  passengers: Person[]
}

export const VEHICULAR_OPERATION_TYPES = [
  "Emergency Response",
  "Non-Emergency",
  "Inter-Facility Transfer",
]

export const VEHICULAR_OPTIONS = [
  { label: "Ambulance", value: "Ambulance" },
  { label: "Rescue Vehicle", value: "Rescue Vehicle" },
  { label: "Other", value: "other" },
]

export const createEmptyVehicularDispatchReport = (): VehicularDispatchReportData => ({
  details: {
    submitterName: "",
    date: "",
    natureOfOperation: "",
    transfers: [],
  },
  dispatch: createEmptyVehicularDispatch(),
  passengers: [],
})

export { createEmptyPerson }
export type { Person, VehicularDispatch }
