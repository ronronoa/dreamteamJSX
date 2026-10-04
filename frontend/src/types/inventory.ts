export interface InventoryItem {
  id: string;
  item: string;
  category: string;
  quantity: number;
  unit: string;
  minimum: number;
  expiry: Date;
  status: "Available" | "Low stock" | "Expired";
}
