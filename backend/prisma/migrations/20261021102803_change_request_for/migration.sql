/*
  Warnings:

  - The values [PICK_UP,DROP_OFF] on the enum `PatientRequestType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PatientRequestType_new" AS ENUM ('TRANSPORT_ASSISTANCE', 'EMERGENCY', 'INTER_FACILITY_TRANSFER', 'FIRST_AID');
ALTER TABLE "PatientLog" ALTER COLUMN "type_of_request" TYPE "PatientRequestType_new" USING ("type_of_request"::text::"PatientRequestType_new");
ALTER TYPE "PatientRequestType" RENAME TO "PatientRequestType_old";
ALTER TYPE "PatientRequestType_new" RENAME TO "PatientRequestType";
DROP TYPE "public"."PatientRequestType_old";
COMMIT;
