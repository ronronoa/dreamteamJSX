export function readStoredReport<T>(
  draftKey: string,
  latestKey: string,
  fallback: () => T,
  normalize: (value: unknown) => T,
): T {
  for (const key of [draftKey, latestKey]) {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) return normalize(JSON.parse(storedValue));
    } catch {
      // Ignore damaged or unavailable browser storage and try the next source.
    }
  }
  return fallback();
}

export function saveStoredReport(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The report form remains usable if browser storage is unavailable.
  }
}

export function removeStoredReport(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    // The report form remains usable if browser storage is unavailable.
  }
}

export function hasStoredReport(draftKey: string, latestKey: string) {
  try {
    return Boolean(localStorage.getItem(draftKey) || localStorage.getItem(latestKey));
  } catch {
    return false;
  }
}
