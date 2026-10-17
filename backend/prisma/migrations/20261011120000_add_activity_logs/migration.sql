CREATE TABLE "ActivityLog" (
    "activity_id" TEXT NOT NULL,
    "activity_code" TEXT NOT NULL,
    "actor_id" TEXT,
    "actor_name" TEXT NOT NULL,
    "actor_username" TEXT,
    "actor_role" "Role",
    "module" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "record_id" TEXT,
    "status" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archivedAt" TIMESTAMP(3),
    "archived_by" TEXT,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("activity_id")
);

CREATE SEQUENCE "ActivityLogCode_seq" START WITH 1 INCREMENT BY 1;
CREATE UNIQUE INDEX "ActivityLog_activity_code_key" ON "ActivityLog"("activity_code");
CREATE INDEX "ActivityLog_createdAt_idx" ON "ActivityLog"("createdAt");
CREATE INDEX "ActivityLog_module_status_idx" ON "ActivityLog"("module", "status");
CREATE INDEX "ActivityLog_actor_id_idx" ON "ActivityLog"("actor_id");
CREATE INDEX "ActivityLog_archivedAt_idx" ON "ActivityLog"("archivedAt");

ALTER TABLE "ActivityLog"
ADD CONSTRAINT "ActivityLog_actor_id_fkey"
FOREIGN KEY ("actor_id") REFERENCES "User"("user_id")
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "ActivityLog"
ADD CONSTRAINT "ActivityLog_archived_by_fkey"
FOREIGN KEY ("archived_by") REFERENCES "User"("user_id")
ON DELETE SET NULL ON UPDATE CASCADE;
