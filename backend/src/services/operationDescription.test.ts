import { describe, expect, it } from "vitest";
import { OperationReportSchema } from "@/schemas/operationReport.schema";
import { validateStep3 } from "../../../frontend/src/modules/reportForms/OperationLogForm/formValidation";
import { createEmptyOperationLogData } from "../../../frontend/src/types/operationLog";

describe("required operation description", () => {
  it.each(["", "   ", "\n\t"])("rejects blank description %j", (description) => {
    const report = createEmptyOperationLogData();
    report.operationDescription.description = description;

    expect(validateStep3(report)["operationDescription.description"]).toBe("Enter the operation description.");
    expect(OperationReportSchema.shape.operationDescription.safeParse({ description }).success).toBe(false);
  });

  it("accepts a description when images and inventory are empty", () => {
    const report = createEmptyOperationLogData();
    report.operationDescription.description = "Responders assisted the residents.";

    expect(validateStep3(report)).toEqual({});
    expect(OperationReportSchema.shape.operationDescription.safeParse(report.operationDescription).success).toBe(true);
  });
});
