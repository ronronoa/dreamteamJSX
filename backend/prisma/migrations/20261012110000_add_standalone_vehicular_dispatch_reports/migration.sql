ALTER TABLE "VehicularDispatch"
ADD COLUMN "submitter_name" TEXT,
ADD COLUMN "nature_of_operation" TEXT,
ADD COLUMN "transfers" "DispatchType"[] NOT NULL DEFAULT ARRAY[]::"DispatchType"[],
ADD COLUMN "status" "OperationStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN "vehicle_name" TEXT;

ALTER TABLE "CivilianPassenger"
ADD COLUMN "birthdate" TIMESTAMP(3),
ADD COLUMN "first_name" TEXT,
ADD COLUMN "middle_initial" TEXT,
ADD COLUMN "surname" TEXT,
ADD COLUMN "suffix" TEXT,
ADD COLUMN "address_phase" TEXT,
ADD COLUMN "address_package" TEXT,
ADD COLUMN "address_block" TEXT,
ADD COLUMN "address_lot" TEXT;
