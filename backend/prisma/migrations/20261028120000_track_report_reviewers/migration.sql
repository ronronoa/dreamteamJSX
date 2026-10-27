ALTER TABLE "PatientLog"
ADD COLUMN "validated_by" TEXT;

ALTER TABLE "VehicularDispatch"
ADD COLUMN "validated_by" TEXT;

CREATE INDEX "PatientLog_validated_by_idx" ON "PatientLog"("validated_by");
CREATE INDEX "VehicularDispatch_validated_by_idx" ON "VehicularDispatch"("validated_by");

ALTER TABLE "PatientLog"
ADD CONSTRAINT "PatientLog_validated_by_fkey"
FOREIGN KEY ("validated_by") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "VehicularDispatch"
ADD CONSTRAINT "VehicularDispatch_validated_by_fkey"
FOREIGN KEY ("validated_by") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
