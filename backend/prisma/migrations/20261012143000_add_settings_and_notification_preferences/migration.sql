CREATE TABLE "SystemSetting" (
    "setting_key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updated_by" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemSetting_pkey" PRIMARY KEY ("setting_key")
);

CREATE TABLE "UserPreference" (
    "user_id" TEXT NOT NULL,
    "lowStockAlerts" BOOLEAN NOT NULL DEFAULT false,
    "approvalNotifications" BOOLEAN NOT NULL DEFAULT false,
    "sessionTimeout" TEXT NOT NULL DEFAULT '30-min',
    "notificationReadAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("user_id")
);

ALTER TABLE "SystemSetting"
ADD CONSTRAINT "SystemSetting_updated_by_fkey"
FOREIGN KEY ("updated_by") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "UserPreference"
ADD CONSTRAINT "UserPreference_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
