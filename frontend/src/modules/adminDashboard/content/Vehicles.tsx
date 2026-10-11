import { useCallback, useEffect, useState } from "react";
import StatCard, { type StatCardProps } from "../component/StatCard";
import DateCell from "../component/DateCell";

import {
  Check,
  ChevronRight,
  Filter,
  X,
} from "lucide-react";

import DataTable from "@/components/common/DataTable";
import TableSearch from "../component/TableSearch";
import TablePagination from "../component/TablePagination";
import type { PendingVehicleDispatch, VehicleDispatchRecord } from "@/types/vehicleDispatch";
import TableStatus from "../component/TableStatus";
import CommonButton from "@/components/common/widgets/CommonButton";
import { useAuth } from "@/context/AuthContext";
import { createFleetVehicle, fetchFleetVehicles, type FleetVehicle } from "@/api/vehicles";

// ── Data (placeholder) ────────────────────────────────────

const stats: StatCardProps[] = [
  {
    label: "Total dispatch",
    value: "52",
    sub: "All recorded dispatches",
    variant: "primary" as const,
  },
  {
    label: "Most vehicle type dispatched",
    value: "Barangay Mobile",
    sub: "↑ 5%  from last month",
    subTone: "up" as const,
  },
  {
    label: "Emergency response average time",
    value: "5:54",
    unit: "min",
    sub: "↓ 4 sec  vs last month",
    subTone: "down" as const,
  },
];

const pendingRequests: PendingVehicleDispatch[] = [];

const approvedLogs: VehicleDispatchRecord[] = [
  {
    id: "DSP-051",
    date: new Date("2026-08-29T02:15:00"),
    time: "03:42 PM",
    vehicle: "Brgy Mobile",
    driver: "R. Garcia",
    destination: "Phase 9-B Package 8 Block 12 Lot 3",
    totalTime: "53m",
    type: "Non-Emergency",
  },
  {
    id: "DSP-052",
    date: new Date("2026-08-29T02:15:00"),
    time: "03:42 PM",
    vehicle: "Brgy Mobile",
    driver: "R. Garcia",
    destination: "Phase 9-B Package 8 Block 12 Lot 3",
    totalTime: "53m",
    type: "Emergency",
  },
];

// ── Page ──────────────────────────────────────────────────

export default function Vehicles() {
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

  return (
    <div className="space-y-7">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Pending approval */}
      <section>
        <div className="mb-3 flex items-center gap-3">
          <h2 className="text-sm font-bold text-gray-900">
            Pending Approval Requests
          </h2>
          <span className="rounded-full bg-pink-100 px-2.5 py-0.5 text-[10px] font-semibold text-pink-700">
            1 request
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <DataTable
            rows={pendingRequests}
            rowKey={(r) => r.id}
            columns={[
              { label: "Dispatch ID", accessor: "id"},
              { label: "Date", render: (r) => <DateCell date={r.date} /> },
              { label: "Vehicle", accessor: "vehicle" },
              { label: "Driver", accessor: "driver" },
              { label: "Destination", accessor: "destination" },
              { label: "Team", accessor: "team" },
              { label: "Status", accessor: "status" },
              {
                label: "Actions",
                align: "right",
                render: () => (
                  <div className="flex items-center justify-end gap-5">
                    <button onClick={() => {}} className="text-gray-400 hover:text-gray-700">
                      <ChevronRight size={16} />
                    </button>
                    <button onClick={() => {}} className="text-emerald-600 hover:text-emerald-700">
                      <Check size={16} strokeWidth={2.5} />
                    </button>
                    <button onClick={() => {}} className="text-red-500 hover:text-red-600">
                      <X size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* Approved logs */}
      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold text-gray-900">
              Approved Record Logs
            </h2>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
              67 records
            </span>
          </div>

          <div className="flex items-center gap-2">
            <TableSearch />
            <button
              type="button"
              aria-label="Filter"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            >
              <Filter size={14} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <DataTable
            rows={approvedLogs}
            rowKey={(r) => r.id}
            columns={[
              { label: "Dispatch ID", accessor: "id"},
              { label: "Date", render: (r) => <DateCell date={r.date} /> },
              { label: "Vehicle", accessor: "vehicle" },
              { label: "Driver", accessor: "driver" },
              { label: "Destination", accessor: "destination" },
              { label: "Total Time", accessor: "totalTime" },
              { label: "Type", render: (r) => <TableStatus variant={r.type === "Emergency" ? "emergency" : "non-emergency"} /> },
              { label: "", align: "right", render: () => (
                <button
                  type="button"
                  aria-label="Open record"
                  className="text-gray-400 hover:text-gray-700"
                >
                  <ChevronRight size={16} />
                </button>
              )},
            ]}
          />

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
            <TablePagination />

            <div className="flex items-center gap-2">
              <CommonButton compact>
                Print PDF
              </CommonButton>
              <CommonButton compact variant="orange">
                Archive
              </CommonButton>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="mb-4">
          <h2 className="text-sm font-bold text-gray-900">Vehicle Fleet</h2>
          <p className="mt-1 text-xs text-gray-500">Register vehicles available for dispatch.</p>
        </div>
        {canManageFleet && <form onSubmit={handleAddVehicle} className="mb-5 flex flex-wrap items-end gap-3">
          <label className="flex min-w-48 flex-1 flex-col gap-1 text-xs font-medium text-gray-700">
            Vehicle name
            <input required maxLength={100} value={vehicleName} onChange={(event) => setVehicleName(event.target.value)} className="h-9 rounded-lg border border-gray-200 px-3 text-sm" placeholder="e.g. Barangay Mobile" />
          </label>
          <label className="flex min-w-40 flex-1 flex-col gap-1 text-xs font-medium text-gray-700">
            Plate number
            <input required maxLength={20} value={plateNumber} onChange={(event) => setPlateNumber(event.target.value)} className="h-9 rounded-lg border border-gray-200 px-3 text-sm uppercase" placeholder="ABC 1234" />
          </label>
          <CommonButton compact type="submit" disabled={savingVehicle}>{savingVehicle ? "Adding…" : "Add vehicle"}</CommonButton>
        </form>}
        {fleetError && <p role="alert" className="mb-3 text-sm text-red-700">{fleetError}</p>}
        {fleetMessage && <p role="status" className="mb-3 text-sm text-emerald-700">{fleetMessage}</p>}
        {fleetLoading ? <p className="text-sm text-gray-500">Loading vehicles…</p> : fleetVehicles.length === 0 ? (
          <p className="text-sm text-gray-500">No vehicles have been registered yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-100 text-xs text-gray-500"><tr><th className="py-2">Vehicle</th><th className="py-2">Plate number</th><th className="py-2">Status</th></tr></thead>
              <tbody>{fleetVehicles.map((vehicle) => <tr key={vehicle.vehicle_id} className="border-b border-gray-50 last:border-0"><td className="py-3 font-medium text-gray-800">{vehicle.vehicle_name}</td><td className="py-3 text-gray-600">{vehicle.plate_number}</td><td className="py-3 text-gray-600">{vehicle.status.replace("_", " ")}</td></tr>)}</tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
