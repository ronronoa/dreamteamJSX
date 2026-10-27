import { z } from "zod";

const ItemIdSchema = z.object({
  id: z.uuid(),
});

const ExpiryDateSchema = z.preprocess(
  (expiryDate) => expiryDate === "" ? null : expiryDate,
  z.iso.date().nullable().optional(),
);

const ItemNameSchema = z.string().trim().min(1, "Item name is required.").max(100);
const CategorySchema = z.string().trim().min(1, "Category is required.").max(50);
const UnitSchema = z.string().trim().min(1, "Unit is required.").max(30);
const QuantitySchema = z.number().int().min(0).max(1_000_000_000);

export const CreateInventoryItemSchema = z.object({
  itemName: ItemNameSchema,
  category: CategorySchema,
  unit: UnitSchema.default("units"),
  stockQuantity: QuantitySchema,
  minimumQuantity: QuantitySchema,
  expiryDate: ExpiryDateSchema,
});

export const UpdateInventoryItemSchema = z.object({
  itemName: ItemNameSchema.optional(),
  category: CategorySchema.optional(),
  unit: UnitSchema.optional(),
  minimumQuantity: QuantitySchema.optional(),
  expiryDate: ExpiryDateSchema,
  stockQuantity: QuantitySchema.optional(),
  adjustmentReason: z.string().trim().min(1).max(250).optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "Provide at least one field to update.",
}).refine((data) => data.stockQuantity === undefined || Boolean(data.adjustmentReason), {
  message: "A reason is required when changing the stock quantity.",
  path: ["adjustmentReason"],
}).refine((data) => data.stockQuantity !== undefined || data.adjustmentReason === undefined, {
  message: "A stock quantity is required when providing an adjustment reason.",
  path: ["stockQuantity"],
});

export const InventoryStockInSchema = z.object({
  itemId: z.uuid(),
  quantity: z.number().int().min(1).max(1_000_000_000),
  reason: z.string().trim().max(250).optional(),
});

export const InventoryAdjustmentSchema = z.object({
  itemId: z.uuid(),
  quantity: z.number().int().min(-1_000_000_000).max(1_000_000_000).refine((quantity) => quantity !== 0, {
    message: "Adjustment quantity cannot be zero.",
  }),
  reason: z.string().trim().min(1, "Adjustment reason is required.").max(250),
});

export const InventoryTransactionsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
});

export const InventoryItemIdSchema = ItemIdSchema;
