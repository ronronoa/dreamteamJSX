import {
  adjustInventoryItem,
  createInventoryItem,
  getNextInventoryItemCode,
  listInventoryItems,
  listInventoryTransactions,
  stockInInventoryItem,
  updateInventoryItem,
} from "@/sql/inventory";
import type {
  CreateInventoryItemInput,
  InventoryAdjustmentInput,
  InventoryStockInInput,
  UpdateInventoryItemInput,
} from "@/types/inventory.types";

function getInventoryStatus(quantity: number, minimum: number, expiry: Date | null) {
  if (expiry && expiry.getTime() < new Date().setHours(0, 0, 0, 0)) return "Expired" as const;
  if (quantity <= minimum) return "Low stock" as const;
  return "Available" as const;
}

export const inventoryService = {
  async listForReport() {
    const databaseItems = await listInventoryItems();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return databaseItems
      .filter((item) => item.quantity > 0 && (!item.expiry || item.expiry >= today))
      .map((item) => ({
        itemId: item.itemId,
        item: item.item,
        category: item.category,
        quantity: item.quantity,
        unit: item.unit,
      }));
  },

  async list() {
    const [databaseItems, nextItemCode] = await Promise.all([
      listInventoryItems(),
      getNextInventoryItemCode(),
    ]);

    const items = databaseItems.map((item) => ({
      ...item,
      status: getInventoryStatus(item.quantity, item.minimum, item.expiry),
    }));
    const totalCount = items.length;
    const lowStockCount = items.filter((item) => item.status === "Low stock").length;
    const aboveMinimumCount = items.filter((item) => item.quantity > item.minimum).length;
    const expiryReviewItem = items
      .filter((item) => item.expiry !== null)
      .sort((first, second) => first.expiry!.getTime() - second.expiry!.getTime())[0];

    return {
      items,
      nextItemCode,
      stats: {
        totalCount,
        categoryCount: new Set(items.map((item) => item.category)).size,
        lowStockCount,
        stockHealthPercent: totalCount === 0 ? 0 : Math.round((aboveMinimumCount / totalCount) * 100),
        aboveMinimumCount,
        nextExpiry: expiryReviewItem?.expiry ?? null,
        nextExpiryItemName: expiryReviewItem?.item ?? null,
      },
    };
  },

  create(data: CreateInventoryItemInput, actorId: string) {
    return createInventoryItem(data, actorId);
  },

  update(itemId: string, data: UpdateInventoryItemInput, actorId: string) {
    return updateInventoryItem(itemId, data, actorId);
  },

  stockIn(data: InventoryStockInInput, actorId: string) {
    return stockInInventoryItem(data, actorId);
  },

  adjust(data: InventoryAdjustmentInput, actorId: string) {
    return adjustInventoryItem(data, actorId);
  },

  transactions(itemId: string, limit: number, offset: number) {
    return listInventoryTransactions(itemId, limit, offset);
  },
};
