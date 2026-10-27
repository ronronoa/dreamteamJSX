UPDATE "OperationLog"
SET "status" = 'PENDING'
WHERE "status"::text = 'TO_REVIEW';

UPDATE "PatientLog"
SET "status" = 'PENDING'
WHERE "status"::text = 'TO_REVIEW';

UPDATE "VehicularDispatch"
SET "status" = 'PENDING'
WHERE "status"::text = 'TO_REVIEW';

ALTER TABLE "OperationLog" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "PatientLog" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "VehicularDispatch" ALTER COLUMN "status" DROP DEFAULT;

ALTER TYPE "OperationStatus" RENAME TO "OperationStatus_old";
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'VALIDATED', 'REJECTED', 'ARCHIVED');

ALTER TABLE "OperationLog"
ALTER COLUMN "status" TYPE "ReportStatus"
USING "status"::text::"ReportStatus";

ALTER TABLE "PatientLog"
ALTER COLUMN "status" TYPE "ReportStatus"
USING "status"::text::"ReportStatus";

ALTER TABLE "VehicularDispatch"
ALTER COLUMN "status" TYPE "ReportStatus"
USING "status"::text::"ReportStatus";

ALTER TABLE "OperationLog" ALTER COLUMN "status" SET DEFAULT 'PENDING';
ALTER TABLE "PatientLog" ALTER COLUMN "status" SET DEFAULT 'PENDING';
ALTER TABLE "VehicularDispatch" ALTER COLUMN "status" SET DEFAULT 'PENDING';

DROP TYPE "OperationStatus_old";
