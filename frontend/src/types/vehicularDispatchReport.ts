import {
  createEmptyPerson,
  createEmptyVehicularDispatch,
  type Person,
  type VehicularDispatch,
} from "./operationLog"
import { getCurrentDateInputValue } from "../utils/dateTime"

export type DispatchTransfer = "Drop-Off" | "Pick-Up"

export type VehicularDispatchDetails = {
  submitterName: string
  date: string
  responders: string[]
  transfers: DispatchTransfer[]
}

export type VehicularDispatchReportData = {
  details: VehicularDispatchDetails
  dispatch: VehicularDispatch
  passengers: Person[]
}

export const createEmptyVehicularDispatchReport = (): VehicularDispatchReportData => ({
  details: {
    submitterName: "",
    date: getCurrentDateInputValue(),
    responders: [],
    transfers: [],
  },
  dispatch: createEmptyVehicularDispatch(),
  passengers: [],
})

export { createEmptyPerson }
export type { Person, VehicularDispatch }
