export interface PendingVehicleDispatch {
  id: string;
  date: Date;
  vehicle: string;
  driver: string;
  destination: string;
  team: string;
  status:  "pending" | "dispatched" | "completed";
}

export interface VehicleDispatchRecord {
  id: string;
  date: Date;
  time: string;
  vehicle: string;
  driver: string;
  destination: string;
  totalTime: string;
  type: "Emergency" | "Non-Emergency";
}
