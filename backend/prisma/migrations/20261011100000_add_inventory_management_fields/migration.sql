CREATE SEQUENCE "InventoryItemCode_seq" START WITH 1;

ALTER TABLE "InventoryItem"
ADD COLUMN "item_code" TEXT,
ADD COLUMN "minimum_quantity" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "expiry_date" TIMESTAMP(3);

WITH numbered_items AS (
  SELECT
    "item_id",
    ROW_NUMBER() OVER (ORDER BY "createdAt", "item_id") AS item_number
  FROM "InventoryItem"
)
UPDATE "InventoryItem" AS item
SET "item_code" = 'INV-' || LPAD(numbered_items.item_number::TEXT, 3, '0')
FROM numbered_items
WHERE item."item_id" = numbered_items."item_id";

SELECT setval(
  '"InventoryItemCode_seq"',
  COALESCE(MAX(SUBSTRING("item_code" FROM 5)::BIGINT), 1),
  COUNT(*) > 0
)
FROM "InventoryItem";

ALTER TABLE "InventoryItem"
ALTER COLUMN "item_code" SET NOT NULL;

CREATE UNIQUE INDEX "InventoryItem_item_code_key" ON "InventoryItem"("item_code");

ALTER TABLE "InventoryTransaction"
ADD COLUMN "reason" TEXT;
