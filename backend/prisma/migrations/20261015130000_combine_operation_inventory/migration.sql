ALTER TABLE "OperationInventoryEntry"
ADD COLUMN "item_id" TEXT;

CREATE INDEX "OperationInventoryEntry_item_id_idx"
ON "OperationInventoryEntry"("item_id");

ALTER TABLE "OperationInventoryEntry"
ADD CONSTRAINT "OperationInventoryEntry_item_id_fkey"
FOREIGN KEY ("item_id") REFERENCES "InventoryItem"("item_id")
ON DELETE SET NULL ON UPDATE CASCADE;

INSERT INTO "OperationInventoryEntry" (
  "entry_id",
  "operation_id",
  "item_id",
  "item_name",
  "quantity",
  "unit"
)
SELECT
  gen_random_uuid()::TEXT,
  linked."operation_id",
  linked."item_id",
  item."item_name",
  linked."quantity",
  item."unit"
FROM "OperationInventory" AS linked
JOIN "InventoryItem" AS item ON item."item_id" = linked."item_id";

DROP TABLE "OperationInventory";
