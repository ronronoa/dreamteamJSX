import { useCallback, useEffect, useState } from "react"
import { fetchInventory, type InventoryListResult } from "@/api/inventory"
import { fetchOperations, type OperationRecord } from "@/api/operations"
import { fetchPatientLogs, type PatientLogRecord } from "@/api/patients"
import { fetchFleetVehicles, type FleetVehicle } from "@/api/vehicles"
import { fetchVehicularDispatchRecords, type VehicleDispatchRecord } from "@/api/vehicularDispatches"
import { useAuth } from "@/store/useAuth"

export function useDashboardData() {
  const { session } = useAuth()
  const accessToken = session?.accessToken
  const [operations, setOperations] = useState<OperationRecord[]>([])
  const [patients, setPatients] = useState<PatientLogRecord[]>([])
  const [dispatches, setDispatches] = useState<VehicleDispatchRecord[]>([])
  const [vehicles, setVehicles] = useState<FleetVehicle[]>([])
  const [inventory, setInventory] = useState<InventoryListResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const refreshDashboard = useCallback(async () => {
    if (!accessToken) {
      setError("Sign in to view dashboard data.")
      setLoading(false)
      return
    }

    setLoading(true)
    setError("")
    const results = await Promise.allSettled([
      fetchOperations(accessToken),
      fetchPatientLogs(accessToken),
      fetchVehicularDispatchRecords(accessToken),
      fetchFleetVehicles(accessToken),
      fetchInventory(accessToken),
    ])

    const sourceNames = ["operation logs", "patient logs", "vehicle dispatches", "vehicle fleet", "inventory"]
    const failedSources: string[] = []
    const [operationResult, patientResult, dispatchResult, vehicleResult, inventoryResult] = results

    if (operationResult.status === "fulfilled") setOperations(operationResult.value)
    else failedSources.push(sourceNames[0])

    if (patientResult.status === "fulfilled") setPatients(patientResult.value)
    else failedSources.push(sourceNames[1])

    if (dispatchResult.status === "fulfilled") setDispatches(dispatchResult.value)
    else failedSources.push(sourceNames[2])

    if (vehicleResult.status === "fulfilled") setVehicles(vehicleResult.value)
    else failedSources.push(sourceNames[3])

    if (inventoryResult.status === "fulfilled") setInventory(inventoryResult.value)
    else failedSources.push(sourceNames[4])

    if (failedSources.length > 0) {
      setError(`Some dashboard data could not be loaded: ${failedSources.join(", ")}.`)
    }
    setLoading(false)
  }, [accessToken])

  useEffect(() => {
    void (async () => {
      await Promise.resolve()
      await refreshDashboard()
    })()
  }, [refreshDashboard])

  return {
    operations,
    patients,
    dispatches,
    vehicles,
    inventory,
    loading,
    error,
    refreshDashboard,
  }
}
