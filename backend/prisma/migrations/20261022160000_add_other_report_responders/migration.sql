ALTER TABLE "OperationLog"
ADD COLUMN "other_responders" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

ALTER TABLE "VehicularDispatch"
ADD COLUMN "other_responders" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
