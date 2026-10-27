export const PAGE_SIZE = 10;

export const EMPTY_STATS = {
  totalCount: 0,
  operationCount: 0,
  patientCount: 0,
  vehicleCount: 0,
  inventoryCount: 0,
  activityCount: 0,
};

export const ARCHIVE_FILTERS = [
  { value: "all", label: "All record types" },
  { value: "operation", label: "Operation logs" },
  { value: "patient", label: "Patient logs" },
  { value: "vehicle", label: "Vehicle logs" },
  { value: "inventory", label: "Inventory items" },
  { value: "activity", label: "Activity logs" },
];
