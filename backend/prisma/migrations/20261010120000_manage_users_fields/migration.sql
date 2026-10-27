ALTER TABLE "User"
  ADD COLUMN "phone" TEXT,
  ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN "team_id" TEXT;

CREATE INDEX "User_team_id_idx" ON "User"("team_id");

ALTER TABLE "User"
  ADD CONSTRAINT "User_team_id_fkey"
  FOREIGN KEY ("team_id") REFERENCES "ResponseTeam"("team_id")
  ON DELETE SET NULL ON UPDATE CASCADE;
