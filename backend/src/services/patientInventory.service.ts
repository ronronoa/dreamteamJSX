import { InventoryTransactionType, Prisma } from "@/generated/prisma/client";
import { ConflictError, ValidationError } from "@/shared/errors";
import { getPatientInventoryQuantity, PatientInventorySchema, type PatientInventory } from "@/schemas/patientInventory.schema";

export function readPatientInventory(reportData: Prisma.JsonValue | null): PatientInventory {
  if (reportData === null) return [];
  if (typeof reportData !== "object" || Array.isArray(reportData)) {
    throw new ValidationError("The saved patient report inventory is invalid.");
  }
  const parsed = PatientInventorySchema.safeParse(reportData["inventory"] ?? []);
  if (!parsed.success) {
    throw new ValidationError("Review the patient report inventory items and quantities before validating.");
  }
  return parsed.data;
}

export async function deductPatientInventory(
  transaction: Prisma.TransactionClient,
  patientLogId: string,
  inventory: PatientInventory,
  actorId: string,
): Promise<boolean> {
  if (inventory.length === 0) return false;

  // Lock this report so validation, retries, and repairs cannot deduct it twice.
  await transaction.$queryRaw(Prisma.sql`
    SELECT patient_log_id FROM "PatientLog" WHERE patient_log_id = ${patientLogId} FOR UPDATE
  `);
  const reason = `Used in patient report ${patientLogId}`;
  const existingUsage = await transaction.inventoryTransaction.findFirst({ where: { reason } });
  if (existingUsage) return false;

  for (const entry of inventory) {
    const quantity = getPatientInventoryQuantity(entry.quantity);
    const updated = await transaction.inventoryItem.updateMany({
      where: { item_id: entry.inventoryItemId, archive: null, stock_quantity: { gte: quantity } },
      data: { stock_quantity: { decrement: quantity } },
    });
    if (updated.count === 0) {
      throw new ConflictError(`Not enough available stock for ${entry.itemName}. Refresh inventory and try again.`);
    }
    await transaction.inventoryTransaction.create({
      data: {
        item_id: entry.inventoryItemId,
        user_id: actorId,
        transaction_type: InventoryTransactionType.STOCK_OUT,
        quantity,
        reason,
      },
    });
  }
  return true;
}
