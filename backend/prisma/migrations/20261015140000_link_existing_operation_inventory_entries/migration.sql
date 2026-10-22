WITH uniquely_matched_entries AS (
  SELECT
    entry."entry_id",
    MIN(item."item_id") AS "item_id"
  FROM "OperationInventoryEntry" AS entry
  JOIN "InventoryItem" AS item
    ON item."item_name" = entry."item_name"
   AND (entry."unit" IS NULL OR item."unit" = entry."unit")
  LEFT JOIN "InventoryArchive" AS archive
    ON archive."item_id" = item."item_id"
  WHERE entry."item_id" IS NULL
    AND archive."archive_id" IS NULL
  GROUP BY entry."entry_id"
  HAVING COUNT(item."item_id") = 1
)
UPDATE "OperationInventoryEntry" AS entry
SET "item_id" = matched."item_id"
FROM uniquely_matched_entries AS matched
WHERE entry."entry_id" = matched."entry_id";
