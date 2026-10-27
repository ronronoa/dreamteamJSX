ALTER TABLE "PersonsInvolved"
  ADD COLUMN "birthdate" TIMESTAMP(3),
  ADD COLUMN "address_phase" TEXT,
  ADD COLUMN "address_package" TEXT,
  ADD COLUMN "address_block" TEXT,
  ADD COLUMN "address_lot" TEXT;

ALTER TABLE "VehicularDispatch" ADD COLUMN "driver_name" TEXT;

CREATE TABLE "OperationTeamAssignment" (
  "operation_id" TEXT NOT NULL,
  "team_id" TEXT NOT NULL,
  CONSTRAINT "OperationTeamAssignment_pkey" PRIMARY KEY ("operation_id", "team_id")
);

CREATE INDEX "OperationTeamAssignment_team_id_idx"
  ON "OperationTeamAssignment"("team_id");

CREATE TABLE "OperationInventoryEntry" (
  "entry_id" TEXT NOT NULL,
  "operation_id" TEXT NOT NULL,
  "item_name" TEXT NOT NULL,
  "quantity" INTEGER NOT NULL,
  "unit" TEXT,
  CONSTRAINT "OperationInventoryEntry_pkey" PRIMARY KEY ("entry_id")
);

CREATE INDEX "OperationInventoryEntry_operation_id_idx"
  ON "OperationInventoryEntry"("operation_id");

ALTER TABLE "OperationTeamAssignment"
  ADD CONSTRAINT "OperationTeamAssignment_operation_id_fkey"
  FOREIGN KEY ("operation_id") REFERENCES "OperationLog"("operation_id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "OperationTeamAssignment"
  ADD CONSTRAINT "OperationTeamAssignment_team_id_fkey"
  FOREIGN KEY ("team_id") REFERENCES "ResponseTeam"("team_id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "OperationInventoryEntry"
  ADD CONSTRAINT "OperationInventoryEntry_operation_id_fkey"
  FOREIGN KEY ("operation_id") REFERENCES "OperationLog"("operation_id")
  ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO "OperationTeamAssignment" ("operation_id", "team_id")
SELECT "operation_id", "team_id"
FROM "OperationLog"
ON CONFLICT DO NOTHING;

INSERT INTO "OperationTeamAssignment" ("operation_id", "team_id")
SELECT operation."operation_id", team."team_id"
FROM "OperationLog" AS operation
CROSS JOIN LATERAL jsonb_array_elements_text(
  COALESCE(operation."report_data"->'operationDetails'->'teamAssigned', '[]'::jsonb)
) AS selected_team("team_value")
JOIN "ResponseTeam" AS team
  ON team."team_id" = selected_team."team_value"
  OR team."team_name" = selected_team."team_value"
ON CONFLICT DO NOTHING;

INSERT INTO "OperationResponder" ("operation_id", "user_id")
SELECT operation."operation_id", responder."user_id"
FROM "OperationLog" AS operation
CROSS JOIN LATERAL jsonb_array_elements_text(
  COALESCE(operation."report_data"->'operationDetails'->'responders', '[]'::jsonb)
) AS selected_responder("user_value")
JOIN "User" AS responder ON responder."user_id" = selected_responder."user_value"
ON CONFLICT DO NOTHING;

INSERT INTO "OperationInventoryEntry" ("entry_id", "operation_id", "item_name", "quantity", "unit")
SELECT
  gen_random_uuid()::text,
  operation."operation_id",
  BTRIM(item->>'itemName'),
  (REGEXP_MATCH(BTRIM(item->>'quantity'), '^[0-9]+'))[1]::integer,
  NULLIF(BTRIM(REGEXP_REPLACE(BTRIM(item->>'quantity'), '^[0-9]+', '')), '')
FROM "OperationLog" AS operation
CROSS JOIN LATERAL jsonb_array_elements(
  COALESCE(operation."report_data"->'inventory', '[]'::jsonb)
) AS item
WHERE NULLIF(BTRIM(item->>'itemName'), '') IS NOT NULL
  AND COALESCE((REGEXP_MATCH(BTRIM(item->>'quantity'), '^[0-9]+'))[1]::integer, 0) > 0;

INSERT INTO "VehicularDispatch" (
  "dispatch_id", "operation_id", "dispatch_date", "submitted_by", "vehicle_id",
  "driver_name", "from_location", "to_location", "depart_time", "arrival_time",
  "odometer_in", "odometer_out", "createdAt", "updatedAt"
)
SELECT
  gen_random_uuid()::text,
  operation."operation_id",
  operation."operation_date",
  operation."submitted_by",
  vehicle."vehicle_id",
  NULLIF(BTRIM(dispatch->>'driver'), ''),
  NULLIF(BTRIM(dispatch->>'from'), ''),
  NULLIF(BTRIM(dispatch->>'to'), ''),
  CASE
    WHEN dispatch->>'departTime' ~ '^([1-9]|1[0-2]):[0-5][0-9]$'
      AND dispatch->>'departPeriod' IN ('AM', 'PM')
    THEN TO_TIMESTAMP(
      TO_CHAR(operation."operation_date", 'YYYY-MM-DD') || ' ' ||
      (dispatch->>'departTime') || ' ' || (dispatch->>'departPeriod'),
      'YYYY-MM-DD HH12:MI AM'
    )::timestamp
    ELSE NULL
  END,
  CASE
    WHEN dispatch->>'arrivalTime' ~ '^([1-9]|1[0-2]):[0-5][0-9]$'
      AND dispatch->>'arrivalPeriod' IN ('AM', 'PM')
    THEN TO_TIMESTAMP(
      TO_CHAR(operation."operation_date", 'YYYY-MM-DD') || ' ' ||
      (dispatch->>'arrivalTime') || ' ' || (dispatch->>'arrivalPeriod'),
      'YYYY-MM-DD HH12:MI AM'
    )::timestamp
    ELSE NULL
  END,
  CASE WHEN dispatch->>'odometerIn' ~ '^\d+$' THEN (dispatch->>'odometerIn')::integer ELSE NULL END,
  CASE WHEN dispatch->>'odometerOut' ~ '^\d+$' THEN (dispatch->>'odometerOut')::integer ELSE NULL END,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "OperationLog" AS operation
CROSS JOIN LATERAL (SELECT operation."report_data"->'dispatch' AS dispatch) AS report_dispatch
LEFT JOIN "Vehicle" AS vehicle ON vehicle."vehicle_id" = report_dispatch.dispatch->>'vehicle'
WHERE report_dispatch.dispatch IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM "VehicularDispatch" AS existing_dispatch
    WHERE existing_dispatch."operation_id" = operation."operation_id"
  );

UPDATE "PersonsInvolved" AS person
SET
  "birthdate" = CASE
    WHEN report_person->>'birthdate' ~ '^\d{4}-\d{2}-\d{2}$'
    THEN (report_person->>'birthdate')::date
    ELSE NULL
  END,
  "address_phase" = NULLIF(report_person->'address'->>'phase', ''),
  "address_package" = NULLIF(report_person->'address'->>'package', ''),
  "address_block" = NULLIF(report_person->'address'->>'block', ''),
  "address_lot" = NULLIF(report_person->'address'->>'lot', '')
FROM "OperationLog" AS operation
CROSS JOIN LATERAL jsonb_array_elements(
  COALESCE(operation."report_data"->'people', '[]'::jsonb)
) AS report_person
WHERE person."operation_id" = operation."operation_id"
  AND person."full_name" = CONCAT_WS(' ',
    NULLIF(report_person->'name'->>'firstName', ''),
    NULLIF(report_person->'name'->>'middleInitial', ''),
    NULLIF(report_person->'name'->>'surname', ''),
    NULLIF(report_person->'name'->>'suffix', '')
  );

ALTER TABLE "OperationLog" DROP COLUMN IF EXISTS "report_data";
