-- Existing PIN hashes remain intact. Users need a new format PIN assigned before submitting reports.
ALTER TABLE "User" ADD COLUMN "pinLookupHash" TEXT;
CREATE UNIQUE INDEX "User_pinLookupHash_key" ON "User"("pinLookupHash");
