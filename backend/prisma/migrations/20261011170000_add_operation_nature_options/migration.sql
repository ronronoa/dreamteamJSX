CREATE TABLE "OperationNature" (
  "nature_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "OperationNature_pkey" PRIMARY KEY ("nature_id")
);

CREATE UNIQUE INDEX "OperationNature_name_key" ON "OperationNature"("name");

INSERT INTO "OperationNature" ("nature_id", "name") VALUES
  ('30000000-0000-4000-8000-000000000001', 'Rescue'),
  ('30000000-0000-4000-8000-000000000002', 'Medical Emergency'),
  ('30000000-0000-4000-8000-000000000003', 'Fire Response'),
  ('30000000-0000-4000-8000-000000000004', 'Other');
