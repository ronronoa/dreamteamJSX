import { z } from "zod";

const MAX_USAGE_QUANTITY = 1_000_000;
const QUANTITY_WITH_OPTIONAL_UNIT = /^\d+(?:\s+[A-Za-z][A-Za-z0-9 _-]{0,39})?$/;

export function getPatientInventoryQuantity(value: string): number {
  return Number(value.trim().split(/\s+/)[0]);
}

export const PatientInventorySchema = z.array(z.object({
  id: z.string().max(100),
  itemName: z.string().trim().min(1).max(120),
  quantity: z.string().trim().max(80)
    .regex(QUANTITY_WITH_OPTIONAL_UNIT, "Enter a positive whole-number quantity and optional unit.")
    .refine((value) => {
      const quantity = getPatientInventoryQuantity(value);
      return Number.isInteger(quantity) && quantity > 0 && quantity <= MAX_USAGE_QUANTITY;
    }, "Enter a quantity between 1 and 1,000,000."),
  inventoryItemId: z.uuid("Select an item from inventory."),
  unit: z.string().max(40).optional(),
})).max(100);

export type PatientInventory = z.infer<typeof PatientInventorySchema>;
