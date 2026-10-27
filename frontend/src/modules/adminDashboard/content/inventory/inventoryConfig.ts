import type { InventoryOverview } from "@/api/inventory";
import { formatDate, getDaysUntil } from "@/utils/dateTime";

export const PAGE_SIZE = 10;

export const EMPTY_OVERVIEW: InventoryOverview = {
  totalCount: 0,
  categoryCount: 0,
  lowStockCount: 0,
  stockHealthPercent: 0,
  aboveMinimumCount: 0,
  nextExpiry: null,
  nextExpiryItemName: null,
};

export function getExpirySummary(overview: InventoryOverview) {
  if (!overview.nextExpiry) {
    return { value: "—", sub: "No expiry dates recorded" };
  }

  const daysUntilExpiry = getDaysUntil(overview.nextExpiry);
  if (daysUntilExpiry === null) {
    return { value: "—", sub: "Expiry date is invalid" };
  }

  return {
    value: String(Math.ceil(daysUntilExpiry)),
    sub: `${overview.nextExpiryItemName ?? "Inventory item"} due ${formatDate(overview.nextExpiry, "MMM D")}`,
  };
}
