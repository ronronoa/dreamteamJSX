-- Member roster entries can submit reports using a PIN without a portal password.
-- Existing passwords are preserved.
ALTER TABLE "User" ALTER COLUMN "passwordHash" DROP NOT NULL;
