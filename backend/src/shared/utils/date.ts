export function toISOString(date: Date): string {
  return date.toISOString();
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function isExpired(expiryDate: Date): boolean {
  return expiryDate < new Date();
}

export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}