export interface InventoryItem {
  id: string;
  itemId: string;
  item: string;
  category: string;
  quantity: number;
  unit: string;
  minimum: number;
  expiry: Date | null;
  status: "Available" | "Low stock" | "Expired";
}
