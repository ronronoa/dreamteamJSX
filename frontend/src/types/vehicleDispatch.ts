export interface pendingVehicleDispatch {
  id: string;
  date: Date;
  vehicle: string;
  driver: string;
  destination: string;
  team: string;
  status:  "pending" | "dispatched" | "completed";
}
