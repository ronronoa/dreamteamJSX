ALTER TABLE "OperationLog" ADD COLUMN "rejected_reason" TEXT;
ALTER TABLE "PatientLog" ADD COLUMN "rejected_reason" TEXT;
ALTER TABLE "VehicularDispatch" ADD COLUMN "rejected_reason" TEXT;
