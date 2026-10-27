ALTER TABLE "User" ADD COLUMN "last_active_at" TIMESTAMP(3);

CREATE INDEX "User_last_active_at_idx" ON "User"("last_active_at");
