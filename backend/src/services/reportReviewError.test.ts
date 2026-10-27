import { describe, expect, it } from "vitest";
import { getBulkReportReviewError, getReportReviewError } from "../../../frontend/src/utils/reportReviewError";

describe("report review error messages", () => {
  it("explains incorrect PINs and preserves remaining attempts", () => {
    const message = getReportReviewError(new Error("Invalid PIN. 2 attempt(s) remaining."));
    expect(message).toContain("PIN you entered may be incorrect");
    expect(message).toContain("your own personal report PIN");
    expect(message).toContain("2 attempt(s) remaining.");
  });

  it("keeps lockout and unrelated failures accurate", () => {
    expect(getReportReviewError(new Error("PIN locked. Try again in 5 minute(s).")))
      .toBe("PIN locked. Try again in 5 minute(s).");
    expect(getReportReviewError(new Error("Cannot validate from ARCHIVED.")))
      .toBe("Cannot validate from ARCHIVED.");
  });

  it("surfaces bulk failures even when some reports succeed", () => {
    const message = getBulkReportReviewError([
      { status: "fulfilled", value: {} },
      { status: "rejected", reason: new Error("Invalid PIN.") },
      { status: "rejected", reason: new Error("Invalid PIN.") },
    ]);
    expect(message).toContain("your own personal report PIN");
    expect(message.split("\n")).toHaveLength(1);
    expect(message).not.toContain("0 operation reports were approved");
  });
});
