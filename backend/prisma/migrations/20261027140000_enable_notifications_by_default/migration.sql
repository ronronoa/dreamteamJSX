ALTER TABLE "UserPreference"
ALTER COLUMN "lowStockAlerts" SET DEFAULT true,
ALTER COLUMN "approvalNotifications" SET DEFAULT true;

UPDATE "UserPreference"
SET
    "lowStockAlerts" = true,
    "approvalNotifications" = true;
