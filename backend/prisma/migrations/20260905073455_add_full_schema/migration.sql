-- CreateEnum
CREATE TYPE "OperationStatus" AS ENUM ('PENDING', 'VALIDATED', 'REJECTED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "InventoryTransactionType" AS ENUM ('STOCK_IN', 'STOCK_OUT', 'ADJUSTMENT');

-- CreateEnum
CREATE TYPE "VehicleStatus" AS ENUM ('AVAILABLE', 'IN_USE', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "PatientRequestType" AS ENUM ('INTER_FACILITY_TRANSFER', 'PICK_UP', 'DROP_OFF');

-- CreateEnum
CREATE TYPE "DispatchType" AS ENUM ('DROP_OFF', 'PICK_UP');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'SUPER_ADMIN';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pinFailedAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "pinHash" TEXT,
ADD COLUMN     "pinLockedUntil" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "ResponseTeam" (
    "team_id" TEXT NOT NULL,
    "team_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResponseTeam_pkey" PRIMARY KEY ("team_id")
);

-- CreateTable
CREATE TABLE "OperationLog" (
    "operation_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "operation_date" TIMESTAMP(3) NOT NULL,
    "name_of_caller" TEXT NOT NULL,
    "nature_of_operation" TEXT NOT NULL,
    "event_description" TEXT NOT NULL,
    "submitted_by" TEXT NOT NULL,
    "validated_by" TEXT,
    "status" "OperationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OperationLog_pkey" PRIMARY KEY ("operation_id")
);

-- CreateTable
CREATE TABLE "OperationResponder" (
    "operation_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "OperationResponder_pkey" PRIMARY KEY ("operation_id","user_id")
);

-- CreateTable
CREATE TABLE "PersonsInvolved" (
    "person_id" TEXT NOT NULL,
    "operation_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "sex" "Gender" NOT NULL,
    "contact_no" TEXT,
    "address" TEXT,

    CONSTRAINT "PersonsInvolved_pkey" PRIMARY KEY ("person_id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "vehicle_id" TEXT NOT NULL,
    "vehicle_name" TEXT NOT NULL,
    "plate_number" TEXT NOT NULL,
    "status" "VehicleStatus" NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("vehicle_id")
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "item_id" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "stock_quantity" INTEGER NOT NULL DEFAULT 0,
    "stock_type" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "InventoryTransaction" (
    "transaction_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "transaction_type" "InventoryTransactionType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InventoryTransaction_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "OperationInventory" (
    "operation_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OperationInventory_pkey" PRIMARY KEY ("operation_id","item_id")
);

-- CreateTable
CREATE TABLE "OperationLogEdit" (
    "edit_id" TEXT NOT NULL,
    "operation_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "edit_notes" TEXT,
    "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OperationLogEdit_pkey" PRIMARY KEY ("edit_id")
);

-- CreateTable
CREATE TABLE "OperationLogArchive" (
    "archive_id" TEXT NOT NULL,
    "operation_id" TEXT NOT NULL,
    "archived_by" TEXT NOT NULL,
    "archivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OperationLogArchive_pkey" PRIMARY KEY ("archive_id")
);

-- CreateTable
CREATE TABLE "InventoryArchive" (
    "archive_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "archived_by" TEXT NOT NULL,
    "archivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InventoryArchive_pkey" PRIMARY KEY ("archive_id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "patient_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "sex" "Gender" NOT NULL,
    "contact_person" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "phase" TEXT,
    "package" TEXT,
    "block" TEXT,
    "lot" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("patient_id")
);

-- CreateTable
CREATE TABLE "PatientLog" (
    "patient_log_id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "log_date" TIMESTAMP(3) NOT NULL,
    "type_of_request" "PatientRequestType" NOT NULL,
    "submitted_by" TEXT NOT NULL,
    "name_of_caller" TEXT,
    "bp" TEXT,
    "pr" TEXT,
    "spo2" TEXT,
    "temp" TEXT,
    "medical_assessment" TEXT,
    "hospital_name" TEXT,
    "hospital_representative" TEXT,
    "hospital_in_time" TIMESTAMP(3),
    "hospital_out_time" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PatientLog_pkey" PRIMARY KEY ("patient_log_id")
);

-- CreateTable
CREATE TABLE "PatientResponder" (
    "patient_log_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "PatientResponder_pkey" PRIMARY KEY ("patient_log_id","user_id")
);

-- CreateTable
CREATE TABLE "VehicularDispatch" (
    "dispatch_id" TEXT NOT NULL,
    "operation_id" TEXT,
    "patient_log_id" TEXT,
    "dispatch_date" TIMESTAMP(3) NOT NULL,
    "submitted_by" TEXT NOT NULL,
    "vehicle_id" TEXT,
    "driver_id" TEXT,
    "depart_time" TIMESTAMP(3),
    "arrival_time" TIMESTAMP(3),
    "brgy_in_time" TIMESTAMP(3),
    "brgy_out_time" TIMESTAMP(3),
    "dispatch_type" "DispatchType",
    "from_location" TEXT,
    "to_location" TEXT,
    "odometer_in" INTEGER,
    "odometer_out" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VehicularDispatch_pkey" PRIMARY KEY ("dispatch_id")
);

-- CreateTable
CREATE TABLE "VehicularDispatchResponder" (
    "dispatch_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "VehicularDispatchResponder_pkey" PRIMARY KEY ("dispatch_id","user_id")
);

-- CreateTable
CREATE TABLE "CivilianPassenger" (
    "passenger_id" TEXT NOT NULL,
    "dispatch_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "sex" "Gender" NOT NULL,
    "contact_no" TEXT,
    "barangay" TEXT,
    "address" TEXT,

    CONSTRAINT "CivilianPassenger_pkey" PRIMARY KEY ("passenger_id")
);

-- CreateTable
CREATE TABLE "OperationImageAttachment" (
    "attachment_id" TEXT NOT NULL,
    "operation_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "file_type" TEXT,
    "uploaded_by" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OperationImageAttachment_pkey" PRIMARY KEY ("attachment_id")
);

-- CreateTable
CREATE TABLE "PatientImageAttachment" (
    "attachment_id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "file_type" TEXT,
    "uploaded_by" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PatientImageAttachment_pkey" PRIMARY KEY ("attachment_id")
);

-- CreateIndex
CREATE INDEX "OperationLog_team_id_idx" ON "OperationLog"("team_id");

-- CreateIndex
CREATE INDEX "OperationLog_submitted_by_idx" ON "OperationLog"("submitted_by");

-- CreateIndex
CREATE INDEX "OperationLog_status_idx" ON "OperationLog"("status");

-- CreateIndex
CREATE INDEX "OperationLog_operation_date_idx" ON "OperationLog"("operation_date");

-- CreateIndex
CREATE INDEX "PersonsInvolved_operation_id_idx" ON "PersonsInvolved"("operation_id");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_plate_number_key" ON "Vehicle"("plate_number");

-- CreateIndex
CREATE INDEX "InventoryItem_category_idx" ON "InventoryItem"("category");

-- CreateIndex
CREATE INDEX "InventoryTransaction_item_id_idx" ON "InventoryTransaction"("item_id");

-- CreateIndex
CREATE INDEX "InventoryTransaction_user_id_idx" ON "InventoryTransaction"("user_id");

-- CreateIndex
CREATE INDEX "OperationLogEdit_operation_id_idx" ON "OperationLogEdit"("operation_id");

-- CreateIndex
CREATE UNIQUE INDEX "OperationLogArchive_operation_id_key" ON "OperationLogArchive"("operation_id");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryArchive_item_id_key" ON "InventoryArchive"("item_id");

-- CreateIndex
CREATE INDEX "Patient_full_name_idx" ON "Patient"("full_name");

-- CreateIndex
CREATE INDEX "PatientLog_patient_id_idx" ON "PatientLog"("patient_id");

-- CreateIndex
CREATE INDEX "PatientLog_submitted_by_idx" ON "PatientLog"("submitted_by");

-- CreateIndex
CREATE INDEX "VehicularDispatch_operation_id_idx" ON "VehicularDispatch"("operation_id");

-- CreateIndex
CREATE INDEX "VehicularDispatch_patient_log_id_idx" ON "VehicularDispatch"("patient_log_id");

-- CreateIndex
CREATE INDEX "CivilianPassenger_dispatch_id_idx" ON "CivilianPassenger"("dispatch_id");

-- CreateIndex
CREATE INDEX "OperationImageAttachment_operation_id_idx" ON "OperationImageAttachment"("operation_id");

-- CreateIndex
CREATE INDEX "PatientImageAttachment_patient_id_idx" ON "PatientImageAttachment"("patient_id");

-- AddForeignKey
ALTER TABLE "OperationLog" ADD CONSTRAINT "OperationLog_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "ResponseTeam"("team_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationLog" ADD CONSTRAINT "OperationLog_submitted_by_fkey" FOREIGN KEY ("submitted_by") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationLog" ADD CONSTRAINT "OperationLog_validated_by_fkey" FOREIGN KEY ("validated_by") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationResponder" ADD CONSTRAINT "OperationResponder_operation_id_fkey" FOREIGN KEY ("operation_id") REFERENCES "OperationLog"("operation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationResponder" ADD CONSTRAINT "OperationResponder_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonsInvolved" ADD CONSTRAINT "PersonsInvolved_operation_id_fkey" FOREIGN KEY ("operation_id") REFERENCES "OperationLog"("operation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryTransaction" ADD CONSTRAINT "InventoryTransaction_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "InventoryItem"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryTransaction" ADD CONSTRAINT "InventoryTransaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationInventory" ADD CONSTRAINT "OperationInventory_operation_id_fkey" FOREIGN KEY ("operation_id") REFERENCES "OperationLog"("operation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationInventory" ADD CONSTRAINT "OperationInventory_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "InventoryItem"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationLogEdit" ADD CONSTRAINT "OperationLogEdit_operation_id_fkey" FOREIGN KEY ("operation_id") REFERENCES "OperationLog"("operation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationLogEdit" ADD CONSTRAINT "OperationLogEdit_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationLogArchive" ADD CONSTRAINT "OperationLogArchive_operation_id_fkey" FOREIGN KEY ("operation_id") REFERENCES "OperationLog"("operation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationLogArchive" ADD CONSTRAINT "OperationLogArchive_archived_by_fkey" FOREIGN KEY ("archived_by") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryArchive" ADD CONSTRAINT "InventoryArchive_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "InventoryItem"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryArchive" ADD CONSTRAINT "InventoryArchive_archived_by_fkey" FOREIGN KEY ("archived_by") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientLog" ADD CONSTRAINT "PatientLog_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("patient_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientLog" ADD CONSTRAINT "PatientLog_submitted_by_fkey" FOREIGN KEY ("submitted_by") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientResponder" ADD CONSTRAINT "PatientResponder_patient_log_id_fkey" FOREIGN KEY ("patient_log_id") REFERENCES "PatientLog"("patient_log_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientResponder" ADD CONSTRAINT "PatientResponder_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicularDispatch" ADD CONSTRAINT "VehicularDispatch_operation_id_fkey" FOREIGN KEY ("operation_id") REFERENCES "OperationLog"("operation_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicularDispatch" ADD CONSTRAINT "VehicularDispatch_patient_log_id_fkey" FOREIGN KEY ("patient_log_id") REFERENCES "PatientLog"("patient_log_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicularDispatch" ADD CONSTRAINT "VehicularDispatch_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicle"("vehicle_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicularDispatch" ADD CONSTRAINT "VehicularDispatch_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicularDispatch" ADD CONSTRAINT "VehicularDispatch_submitted_by_fkey" FOREIGN KEY ("submitted_by") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicularDispatchResponder" ADD CONSTRAINT "VehicularDispatchResponder_dispatch_id_fkey" FOREIGN KEY ("dispatch_id") REFERENCES "VehicularDispatch"("dispatch_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicularDispatchResponder" ADD CONSTRAINT "VehicularDispatchResponder_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CivilianPassenger" ADD CONSTRAINT "CivilianPassenger_dispatch_id_fkey" FOREIGN KEY ("dispatch_id") REFERENCES "VehicularDispatch"("dispatch_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationImageAttachment" ADD CONSTRAINT "OperationImageAttachment_operation_id_fkey" FOREIGN KEY ("operation_id") REFERENCES "OperationLog"("operation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationImageAttachment" ADD CONSTRAINT "OperationImageAttachment_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientImageAttachment" ADD CONSTRAINT "PatientImageAttachment_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("patient_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientImageAttachment" ADD CONSTRAINT "PatientImageAttachment_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
