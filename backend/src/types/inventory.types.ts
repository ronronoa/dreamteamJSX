import type {
  CreateInventoryItemSchema,
  InventoryAdjustmentSchema,
  InventoryStockInSchema,
  UpdateInventoryItemSchema,
} from "@/schemas/inventory.schema";
import type { z } from "zod";

export type CreateInventoryItemInput = z.infer<typeof CreateInventoryItemSchema>;
export type UpdateInventoryItemInput = z.infer<typeof UpdateInventoryItemSchema>;
export type InventoryStockInInput = z.infer<typeof InventoryStockInSchema>;
export type InventoryAdjustmentInput = z.infer<typeof InventoryAdjustmentSchema>;
