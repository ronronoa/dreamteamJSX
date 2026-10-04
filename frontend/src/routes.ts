export const ROUTES = {
  ROOT: "/",
  LOGIN: "/login",
  CHOOSE_FORM: "/chooseform",
  OPERATIONLOG_FORM: "/operationlogform",
  PATIENTLOG_FORM: "/patientlogform",
  VEHICULARDISPATCH_FORM: "/vehiculardispatchform",

  DASHBOARD: {
    ROOT: "/dashboard",
    OPERATIONS: "/dashboard/operations",
    PATIENTS: "/dashboard/patients",
    VEHICLES: "/dashboard/vehicles",
    INVENTORY: "/dashboard/inventory",
    ARCHIVES: "/dashboard/archives",
    MANAGEUSERS: "/dashboard/manageusers",
    PROFILE: "/dashboard/profile",
    REPORTS: "/dashboard/reports",
    SETTINGS: "/dashboard/settings",
    ACTIVITYLOGS: "/dashboard/activity",
  },
} as const;
