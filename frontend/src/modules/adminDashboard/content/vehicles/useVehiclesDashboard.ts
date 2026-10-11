import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { createFleetVehicle, fetchFleetVehicles, type FleetVehicle } from "@/api/vehicles";

export function useVehiclesDashboard() {
  const { session } = useAuth();
  const accessToken = session?.accessToken;
  const [fleetVehicles, setFleetVehicles] = useState<FleetVehicle[]>([]);
  const [vehicleName, setVehicleName] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [fleetLoading, setFleetLoading] = useState(true);
  const [savingVehicle, setSavingVehicle] = useState(false);
  const [fleetError, setFleetError] = useState("");
  const [fleetMessage, setFleetMessage] = useState("");
  const canManageFleet = ["SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY"].includes(session?.user.role ?? "");

  const loadFleet = useCallback(async () => {
    if (!accessToken) {
      setFleetLoading(false);
      return;
    }
    try {
      setFleetVehicles(await fetchFleetVehicles(accessToken));
      setFleetError("");
    } catch (error) {
      setFleetError(error instanceof Error ? error.message : "Could not load the vehicle fleet.");
    } finally {
      setFleetLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    void (async () => {
      await Promise.resolve();
      await loadFleet();
    })();
  }, [loadFleet]);

  async function handleAddVehicle(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accessToken) return;
    setSavingVehicle(true);
    setFleetError("");
    setFleetMessage("");
    try {
      await createFleetVehicle(accessToken, { vehicleName, plateNumber });
      setVehicleName("");
      setPlateNumber("");
      setFleetMessage("Vehicle added to the fleet.");
      await loadFleet();
    } catch (error) {
      setFleetError(error instanceof Error ? error.message : "Could not add this vehicle.");
    } finally {
      setSavingVehicle(false);
    }
  }

  return {
    fleetVehicles, vehicleName, setVehicleName, plateNumber, setPlateNumber,
    fleetLoading, savingVehicle, fleetError, fleetMessage, canManageFleet,
    handleAddVehicle,
  };
}
