import { apiFetch } from "./apiFetch";

export interface InventoryRecord {
  itemId: string;
  id: string;
  item: string;
  category: string;
  quantity: number;
  unit: string;
  minimum: number;
  expiry: Date | null;
  status: "Available" | "Low stock" | "Expired";
  createdAt: string;
  updatedAt: string;
}

export interface InventoryOverview {
  totalCount: number;
  categoryCount: number;
  lowStockCount: number;
  stockHealthPercent: number;
  aboveMinimumCount: number;
  nextExpiry: Date | null;
  nextExpiryItemName: string | null;
}

export interface InventoryListResult {
  items: InventoryRecord[];
  nextItemCode: string;
  stats: InventoryOverview;
}

async function request<T>(path: string, accessToken: string, options: RequestInit = {}) {
  const response = await apiFetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    },
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.message ?? `Request failed (${response.status})`);
  }
  return result as T;
}

export async function fetchInventory(accessToken: string): Promise<InventoryListResult> {
  const result = await request<Omit<InventoryListResult, "items" | "stats"> & {
    items: Array<Omit<InventoryRecord, "expiry"> & { expiry: string | null }>;
    stats: Omit<InventoryOverview, "nextExpiry"> & { nextExpiry: string | null };
  }>("/inventory", accessToken);

  return {
    ...result,
    items: result.items.map((item) => ({
      ...item,
      expiry: item.expiry ? new Date(item.expiry) : null,
    })),
    stats: {
      ...result.stats,
      nextExpiry: result.stats.nextExpiry ? new Date(result.stats.nextExpiry) : null,
    },
  };
}

export interface CreateInventoryItemInput {
  itemName: string;
  category: string;
  unit: string;
  stockQuantity: number;
  minimumQuantity: number;
  expiryDate: string | null;
}

export function createInventoryItem(accessToken: string, input: CreateInventoryItemInput) {
  return request<{ item: unknown }>("/inventory", accessToken, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export interface UpdateInventoryItemInput {
  itemName: string;
  category: string;
  unit: string;
  minimumQuantity: number;
  expiryDate: string | null;
  stockQuantity?: number;
  adjustmentReason?: string;
}

export function updateInventoryItem(
  accessToken: string,
  itemId: string,
  input: UpdateInventoryItemInput,
) {
  return request<{ item: unknown }>(`/inventory/${itemId}`, accessToken, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}
