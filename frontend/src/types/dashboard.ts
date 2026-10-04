export interface MonthlyOperationCount {
  month: string;
  value: number;
}

export interface PatientInterventionCount {
  name: string;
  value: number;
  color: string;
}

export interface HourlyActivity {
  time: string;
  activity: number;
}
