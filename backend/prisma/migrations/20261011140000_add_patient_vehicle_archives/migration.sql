CREATE TABLE "PatientLogArchive" (
    "archive_id" TEXT NOT NULL,
    "patient_log_id" TEXT NOT NULL,
    "archived_by" TEXT NOT NULL,
    "archivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PatientLogArchive_pkey" PRIMARY KEY ("archive_id")
);

CREATE TABLE "VehicularDispatchArchive" (
    "archive_id" TEXT NOT NULL,
    "dispatch_id" TEXT NOT NULL,
    "archived_by" TEXT NOT NULL,
    "archivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VehicularDispatchArchive_pkey" PRIMARY KEY ("archive_id")
);

CREATE UNIQUE INDEX "PatientLogArchive_patient_log_id_key" ON "PatientLogArchive"("patient_log_id");
CREATE INDEX "PatientLogArchive_archivedAt_idx" ON "PatientLogArchive"("archivedAt");
CREATE UNIQUE INDEX "VehicularDispatchArchive_dispatch_id_key" ON "VehicularDispatchArchive"("dispatch_id");
CREATE INDEX "VehicularDispatchArchive_archivedAt_idx" ON "VehicularDispatchArchive"("archivedAt");

ALTER TABLE "PatientLogArchive"
ADD CONSTRAINT "PatientLogArchive_patient_log_id_fkey"
FOREIGN KEY ("patient_log_id") REFERENCES "PatientLog"("patient_log_id")
ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "PatientLogArchive"
ADD CONSTRAINT "PatientLogArchive_archived_by_fkey"
FOREIGN KEY ("archived_by") REFERENCES "User"("user_id")
ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "VehicularDispatchArchive"
ADD CONSTRAINT "VehicularDispatchArchive_dispatch_id_fkey"
FOREIGN KEY ("dispatch_id") REFERENCES "VehicularDispatch"("dispatch_id")
ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "VehicularDispatchArchive"
ADD CONSTRAINT "VehicularDispatchArchive_archived_by_fkey"
FOREIGN KEY ("archived_by") REFERENCES "User"("user_id")
ON DELETE RESTRICT ON UPDATE CASCADE;
