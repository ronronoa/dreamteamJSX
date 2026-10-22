import {
  createEmptyPerson,
  createEmptyVehicularDispatch,
  type Person,
  type VehicularDispatch,
} from "./operationLog"
import { getCurrentDateInputValue, getCurrentTimeInputValue } from "../utils/dateTime"

export type DispatchTransfer = "Drop-Off" | "Pick-Up"

export type VehicularDispatchDetails = {
  submitterName: string
  date: string
  time: string
  responders: string[]
  otherResponders: string[]
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
    time: getCurrentTimeInputValue(),
    responders: [],
    otherResponders: [],
    transfers: [],
  },
  dispatch: createEmptyVehicularDispatch(),
  passengers: [],
})

export { createEmptyPerson }
export type { Person, VehicularDispatch }
