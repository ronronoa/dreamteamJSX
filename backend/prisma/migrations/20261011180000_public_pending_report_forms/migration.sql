-- Public report submissions have no authenticated account to reference.
ALTER TABLE "OperationLog"
  ALTER COLUMN "submitted_by" DROP NOT NULL,
  ADD COLUMN "submitter_name" TEXT;

UPDATE "OperationLog" AS operation
SET "submitter_name" = app_user."name"
FROM "User" AS app_user
WHERE operation."submitted_by" = app_user."user_id";

ALTER TABLE "PatientLog"
  ALTER COLUMN "submitted_by" DROP NOT NULL,
  ADD COLUMN "submitter_name" TEXT,
  ADD COLUMN "status" "OperationStatus" NOT NULL DEFAULT 'PENDING';

UPDATE "PatientLog" AS patient_log
SET "submitter_name" = app_user."name"
FROM "User" AS app_user
WHERE patient_log."submitted_by" = app_user."user_id";

ALTER TABLE "VehicularDispatch"
  ALTER COLUMN "submitted_by" DROP NOT NULL;

ALTER TABLE "OperationImageAttachment"
  ALTER COLUMN "uploaded_by" DROP NOT NULL;

ALTER TABLE "PatientImageAttachment"
  ALTER COLUMN "uploaded_by" DROP NOT NULL;

ALTER TABLE "OperationLog"
  DROP CONSTRAINT "OperationLog_submitted_by_fkey",
  ADD CONSTRAINT "OperationLog_submitted_by_fkey"
    FOREIGN KEY ("submitted_by") REFERENCES "User"("user_id")
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "PatientLog"
  DROP CONSTRAINT "PatientLog_submitted_by_fkey",
  ADD CONSTRAINT "PatientLog_submitted_by_fkey"
    FOREIGN KEY ("submitted_by") REFERENCES "User"("user_id")
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "VehicularDispatch"
  DROP CONSTRAINT "VehicularDispatch_submitted_by_fkey",
  ADD CONSTRAINT "VehicularDispatch_submitted_by_fkey"
    FOREIGN KEY ("submitted_by") REFERENCES "User"("user_id")
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "OperationImageAttachment"
  DROP CONSTRAINT "OperationImageAttachment_uploaded_by_fkey",
  ADD CONSTRAINT "OperationImageAttachment_uploaded_by_fkey"
    FOREIGN KEY ("uploaded_by") REFERENCES "User"("user_id")
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "PatientImageAttachment"
  DROP CONSTRAINT "PatientImageAttachment_uploaded_by_fkey",
  ADD CONSTRAINT "PatientImageAttachment_uploaded_by_fkey"
    FOREIGN KEY ("uploaded_by") REFERENCES "User"("user_id")
    ON DELETE SET NULL ON UPDATE CASCADE;
