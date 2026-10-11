export interface MonthlyReportCount {
  month: string;
  value: number;
}

export interface PatientStatusCount {
  name: string;
  value: number;
  color: string;
}

export interface HourlyActivity {
  time: string;
  activity: number;
}
