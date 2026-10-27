CREATE TABLE "Notification" (
    "notification_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "source_key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readAt" TIMESTAMP(3),

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notification_id")
);

CREATE UNIQUE INDEX "Notification_user_id_source_key_key" ON "Notification"("user_id", "source_key");
CREATE INDEX "Notification_user_id_createdAt_idx" ON "Notification"("user_id", "createdAt");

ALTER TABLE "Notification"
ADD CONSTRAINT "Notification_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
