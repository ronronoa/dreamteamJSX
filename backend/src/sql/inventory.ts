import { InventoryTransactionType, Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { ConflictError, NotFoundError, ValidationError } from "@/shared/errors";
import type {
  CreateInventoryItemInput,
  InventoryAdjustmentInput,
  InventoryStockInInput,
  UpdateInventoryItemInput,
} from "@/types/inventory.types";

const ITEM_CODE_PREFIX = "INV-";
const ITEM_CODE_MINIMUM_DIGITS = 3;
const MAX_DATABASE_STOCK = 2_147_483_647;

type InventoryRow = {
  itemId: string;
  id: string;
  item: string;
  category: string;
  quantity: number;
  unit: string;
  minimum: number;
  expiry: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

async function getNextItemCode(transaction: Prisma.TransactionClient) {
  const rows = await transaction.$queryRaw<Array<{ sequence_value: string }>>(Prisma.sql`
    SELECT nextval('"InventoryItemCode_seq"')::text AS sequence_value
  `);
  const sequenceValue = rows[0]?.sequence_value;
  if (!sequenceValue) throw new Error("Could not generate an inventory item code.");

  return `${ITEM_CODE_PREFIX}${sequenceValue.padStart(ITEM_CODE_MINIMUM_DIGITS, "0")}`;
}

async function findActiveItemForUpdate(transaction: Prisma.TransactionClient, itemId: string) {
  const rows = await transaction.$queryRaw<Array<{ item_id: string; stock_quantity: number }>>(Prisma.sql`
    SELECT item."item_id", item."stock_quantity"
    FROM "InventoryItem" AS item
    LEFT JOIN "InventoryArchive" AS archive ON archive."item_id" = item."item_id"
    WHERE item."item_id" = ${itemId}
      AND archive."archive_id" IS NULL
    FOR UPDATE OF item
  `);
  const item = rows[0];
  if (!item) throw new NotFoundError("Inventory item", itemId);
  return item;
}

export async function listInventoryItems() {
  return prisma.$queryRaw<InventoryRow[]>(Prisma.sql`
    SELECT
      item."item_id" AS "itemId",
      item."item_code" AS id,
      item."item_name" AS item,
      item."category",
      item."stock_quantity" AS quantity,
      item."unit",
      item."minimum_quantity" AS minimum,
      item."expiry_date" AS expiry,
      item."createdAt",
      item."updatedAt"
    FROM "InventoryItem" AS item
    LEFT JOIN "InventoryArchive" AS archive ON archive."item_id" = item."item_id"
    WHERE archive."archive_id" IS NULL
    ORDER BY item."category" ASC, item."item_name" ASC
  `);
}

export async function getNextInventoryItemCode() {
  const rows = await prisma.$queryRaw<Array<{ next_code: string }>>(Prisma.sql`
    SELECT (
      last_value + CASE WHEN is_called THEN 1 ELSE 0 END
    )::text AS next_code
    FROM "InventoryItemCode_seq"
  `);
  const nextValue = rows[0]?.next_code ?? "1";
  return `${ITEM_CODE_PREFIX}${nextValue.padStart(ITEM_CODE_MINIMUM_DIGITS, "0")}`;
}

export async function createInventoryItem(data: CreateInventoryItemInput, actorId: string) {
  return prisma.$transaction(async (transaction) => {
    const itemCode = await getNextItemCode(transaction);
    const item = await transaction.inventoryItem.create({
      data: {
        item_code: itemCode,
        item_name: data.itemName,
        category: data.category,
        unit: data.unit,
        stock_quantity: data.stockQuantity,
        minimum_quantity: data.minimumQuantity,
        expiry_date: data.expiryDate ? new Date(data.expiryDate) : null,
      },
    });

    if (data.stockQuantity > 0) {
      await transaction.inventoryTransaction.create({
        data: {
          item_id: item.item_id,
          user_id: actorId,
          transaction_type: InventoryTransactionType.STOCK_IN,
          quantity: data.stockQuantity,
          reason: "Initial stock",
        },
      });
    }

    return item;
  });
}

export async function updateInventoryItem(itemId: string, data: UpdateInventoryItemInput, actorId: string) {
  return prisma.$transaction(async (transaction) => {
    const existingItem = await findActiveItemForUpdate(transaction, itemId);
    const stockDifference = data.stockQuantity === undefined
      ? 0
      : data.stockQuantity - existingItem.stock_quantity;

    const updatedItem = await transaction.inventoryItem.update({
      where: { item_id: itemId },
      data: {
        ...(data.itemName !== undefined && { item_name: data.itemName }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.unit !== undefined && { unit: data.unit }),
        ...(data.minimumQuantity !== undefined && { minimum_quantity: data.minimumQuantity }),
        ...(data.expiryDate !== undefined && {
          expiry_date: data.expiryDate ? new Date(data.expiryDate) : null,
        }),
        ...(data.stockQuantity !== undefined && { stock_quantity: data.stockQuantity }),
      },
    });

    if (stockDifference !== 0) {
      if (!data.adjustmentReason) {
        throw new ValidationError("A reason is required when changing the stock quantity.", {
          adjustmentReason: ["A reason is required when changing the stock quantity."],
        });
      }

      await transaction.inventoryTransaction.create({
        data: {
          item_id: itemId,
          user_id: actorId,
          transaction_type: InventoryTransactionType.ADJUSTMENT,
          quantity: stockDifference,
          reason: data.adjustmentReason,
        },
      });
    }

    return updatedItem;
  });
}

export async function stockInInventoryItem(data: InventoryStockInInput, actorId: string) {
  return prisma.$transaction(async (transaction) => {
    const item = await findActiveItemForUpdate(transaction, data.itemId);
    const newStock = item.stock_quantity + data.quantity;
    if (newStock > MAX_DATABASE_STOCK) {
      throw new ConflictError("This stock amount exceeds the supported inventory limit.");
    }

    const updatedItem = await transaction.inventoryItem.update({
      where: { item_id: data.itemId },
      data: { stock_quantity: newStock },
    });
    const transactionRecord = await transaction.inventoryTransaction.create({
      data: {
        item_id: data.itemId,
        user_id: actorId,
        transaction_type: InventoryTransactionType.STOCK_IN,
        quantity: data.quantity,
        reason: data.reason ?? null,
      },
    });

    return { transaction: transactionRecord, item: updatedItem };
  });
}

export async function adjustInventoryItem(data: InventoryAdjustmentInput, actorId: string) {
  return prisma.$transaction(async (transaction) => {
    const item = await findActiveItemForUpdate(transaction, data.itemId);
    const newStock = item.stock_quantity + data.quantity;
    if (newStock < 0) {
      throw new ConflictError("An adjustment cannot reduce stock below zero.");
    }
    if (newStock > MAX_DATABASE_STOCK) {
      throw new ConflictError("This adjustment exceeds the supported inventory limit.");
    }

    const updatedItem = await transaction.inventoryItem.update({
      where: { item_id: data.itemId },
      data: { stock_quantity: newStock },
    });
    const transactionRecord = await transaction.inventoryTransaction.create({
      data: {
        item_id: data.itemId,
        user_id: actorId,
        transaction_type: InventoryTransactionType.ADJUSTMENT,
        quantity: data.quantity,
        reason: data.reason,
      },
    });

    return { transaction: transactionRecord, item: updatedItem };
  });
}

export async function listInventoryTransactions(itemId: string, limit: number, offset: number) {
  const item = await prisma.inventoryItem.findFirst({
    where: { item_id: itemId, archive: null },
    select: { item_id: true },
  });
  if (!item) throw new NotFoundError("Inventory item", itemId);

  return prisma.inventoryTransaction.findMany({
    where: { item_id: itemId },
    include: {
      user: { select: { user_id: true, name: true, username: true } },
    },
    orderBy: { transaction_date: "desc" },
    take: limit,
    skip: offset,
  });
}
