WITH current_max AS (
    SELECT COALESCE(MAX(SUBSTRING("activity_code" FROM 5)::bigint), 0) AS last_code
    FROM "ActivityLog"
), inventory_entries AS (
    SELECT
        txn."transaction_id",
        txn."transaction_date",
        txn."user_id",
        txn."transaction_type"::text AS transaction_type,
        txn."quantity",
        txn."reason",
        item."item_code",
        item."item_name",
        item."unit",
        users."name" AS actor_name,
        users."username" AS actor_username,
        users."role" AS actor_role,
        current_max.last_code + ROW_NUMBER() OVER (
            ORDER BY txn."transaction_date", txn."transaction_id"
        ) AS activity_number
    FROM "InventoryTransaction" AS txn
    JOIN "InventoryItem" AS item ON item."item_id" = txn."item_id"
    JOIN "User" AS users ON users."user_id" = txn."user_id"
    CROSS JOIN current_max
)
INSERT INTO "ActivityLog" (
    "activity_id",
    "activity_code",
    "actor_id",
    "actor_name",
    "actor_username",
    "actor_role",
    "module",
    "action",
    "record_id",
    "status",
    "details",
    "createdAt"
)
SELECT
    gen_random_uuid()::text,
    'ACT-' || LPAD(entry.activity_number::text, 6, '0'),
    entry."user_id",
    entry.actor_name,
    entry.actor_username,
    entry.actor_role,
    'Inventory',
    CASE entry.transaction_type
        WHEN 'STOCK_IN' THEN 'Stock received'
        WHEN 'STOCK_OUT' THEN 'Stock issued'
        ELSE 'Inventory adjusted'
    END,
    entry."item_code",
    'Success',
    entry."item_name" || ': ' ||
        CASE WHEN entry."quantity" > 0 THEN '+' ELSE '' END ||
        entry."quantity"::text || ' ' || entry."unit" ||
        CASE
            WHEN entry."reason" IS NOT NULL AND entry."reason" <> ''
                THEN '. Reason: ' || entry."reason"
            ELSE '.'
        END,
    entry."transaction_date"
FROM inventory_entries AS entry;

SELECT setval(
    '"ActivityLogCode_seq"',
    GREATEST(COALESCE(MAX(SUBSTRING("activity_code" FROM 5)::bigint), 1), 1),
    COUNT(*) > 0
)
FROM "ActivityLog";
