import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Prisma } from "@/generated/prisma/client";
import { PatientInventorySchema } from "@/schemas/patientInventory.schema";
import { deductPatientInventory, readPatientInventory } from "./patientInventory.service";

const mocks = {
  $queryRaw: vi.fn(),
  inventoryItem: { updateMany: vi.fn() },
  inventoryTransaction: { findFirst: vi.fn(), create: vi.fn() },
};
const transaction = mocks as unknown as Prisma.TransactionClient;
const entry = {
  id: "usage-entry", itemName: "Alcohol", quantity: "12 units",
  inventoryItemId: "00000000-0000-4000-8000-000000000001",
};

beforeEach(() => {
  vi.resetAllMocks();
  mocks.$queryRaw.mockResolvedValue([]);
  mocks.inventoryItem.updateMany.mockResolvedValue({ count: 1 });
  mocks.inventoryTransaction.findFirst.mockResolvedValue(null);
});

describe("patient inventory deductions", () => {
  it("does not repeat stock usage that is already recorded", async () => {
    mocks.inventoryTransaction.findFirst.mockResolvedValue({ transaction_id: "existing-usage" });
    expect(await deductPatientInventory(transaction, "report-id", [entry], "actor-id")).toBe(false);
    expect(mocks.$queryRaw).toHaveBeenCalledOnce();
    expect(mocks.inventoryItem.updateMany).not.toHaveBeenCalled();
    expect(mocks.inventoryTransaction.create).not.toHaveBeenCalled();
  });

  it("rejects insufficient or unavailable stock without writing a stock-out", async () => {
    mocks.inventoryItem.updateMany.mockResolvedValue({ count: 0 });
    await expect(deductPatientInventory(transaction, "report-id", [entry], "actor-id")).rejects.toThrow("Not enough available stock for Alcohol");
    expect(mocks.inventoryTransaction.create).not.toHaveBeenCalled();
  });

  it("deducts the numeric quantity and records its report and actor", async () => {
    expect(await deductPatientInventory(transaction, "report-id", [entry], "actor-id")).toBe(true);
    expect(mocks.inventoryItem.updateMany.mock.calls[0]![0].data).toEqual({ stock_quantity: { decrement: 12 } });
    expect(mocks.inventoryTransaction.create.mock.calls[0]![0].data).toMatchObject({
      item_id: entry.inventoryItemId, user_id: "actor-id", quantity: 12,
      transaction_type: "STOCK_OUT", reason: "Used in patient report report-id",
    });
  });

  it("leaves stock alone for reports without supplies", async () => {
    expect(await deductPatientInventory(transaction, "report-id", [], "actor-id")).toBe(false);
    expect(mocks.$queryRaw).not.toHaveBeenCalled();
  });

  it.each(["0 units", "-12 units", "1.5 units", "twelve", "12junk", "1000001"])("rejects malformed quantities: %s", (quantity) => {
    expect(PatientInventorySchema.safeParse([{ ...entry, quantity }]).success).toBe(false);
  });

  it("requires linked inventory items and validates saved inventory before use", () => {
    expect(PatientInventorySchema.safeParse([{ ...entry, inventoryItemId: undefined }]).success).toBe(false);
    expect(readPatientInventory({ inventory: [entry] })).toEqual([entry]);
    expect(readPatientInventory(null)).toEqual([]);
    expect(() => readPatientInventory({ inventory: [{ ...entry, quantity: "bad" }] })).toThrow("Review the patient report inventory");
  });
});
