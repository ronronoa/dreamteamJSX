export function getReportReviewError(error: unknown): string {
  const message = error instanceof Error ? error.message : "Could not update the report. Please try again.";
  if (/invalid (report )?pin/i.test(message)) {
    return `The PIN you entered may be incorrect. Use your own personal report PIN for the account you are signed in to. ${message}`;
  }
  return message;
}

export function getBulkReportReviewError(results: PromiseSettledResult<unknown>[]): string {
  const failures = results.filter((result) => result.status === "rejected");
  // Keep lockout and remaining-attempt details from the server visible.
  const messages = failures.map((result) => getReportReviewError(result.reason));
  return [...new Set(messages)].join("\n");
}
