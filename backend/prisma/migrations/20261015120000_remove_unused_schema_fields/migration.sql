ALTER TABLE "InventoryItem"
DROP COLUMN "stock_type";

ALTER TABLE "UserPreference"
DROP COLUMN "notificationReadAt";

ALTER TABLE "VehicularDispatch"
DROP CONSTRAINT "VehicularDispatch_driver_id_fkey",
DROP COLUMN "driver_id",
DROP COLUMN "brgy_in_time",
DROP COLUMN "brgy_out_time";
