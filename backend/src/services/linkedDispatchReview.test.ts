import { beforeEach, describe, expect, it, vi } from "vitest";

const db = vi.hoisted(() => ({
  $transaction: vi.fn(),
  operationLog: {
    findUnique: vi.fn(), updateMany: vi.fn(), update: vi.fn(), findUniqueOrThrow: vi.fn(),
  },
  operationLogEdit: { create: vi.fn() },
  operationInventoryEntry: { findMany: vi.fn() },
  patientLog: { findUnique: vi.fn(), updateMany: vi.fn(), findUniqueOrThrow: vi.fn() },
  vehicularDispatch: { updateMany: vi.fn(), findMany: vi.fn() },
}));
const review = vi.hoisted(() => ({ prepare: vi.fn(), deductInventory: vi.fn() }));
vi.mock("@/lib/prisma", () => ({ prisma: db }));
vi.mock("@/services/reportReviewWorkflow", () => ({ prepareReportReview: review.prepare }));
vi.mock("./patientInventory.service", () => ({
  deductPatientInventory: review.deductInventory, readPatientInventory: () => [],
}));

import { operationService } from "./operation.service";
import { patientLogService } from "./patientLog.service";
import { vehicularDispatchReportService } from "./vehicularDispatchReport.service";

beforeEach(() => {
  vi.resetAllMocks();
  db.$transaction.mockImplementation((callback) => callback(db));
  db.operationLog.findUnique.mockResolvedValue({ status: "PENDING" });
  db.patientLog.findUnique.mockResolvedValue({ status: "PENDING", report_data: {}, archive: null });
  db.operationLog.updateMany.mockResolvedValue({ count: 1 });
  db.patientLog.updateMany.mockResolvedValue({ count: 1 });
  db.operationInventoryEntry.findMany.mockResolvedValue([]);
});

describe("linked vehicle log review", () => {
  it.each(["DEPARTMENT_HEAD", "DEPUTY"] as const)("syncs operation approval by %s", async (role) => {
    review.prepare.mockResolvedValue("VALIDATED");
    await operationService.validate("operation-id", { userId: "reviewer-id", role }, "0482");
    expect(db.vehicularDispatch.updateMany).toHaveBeenCalledWith({
      where: { operation_id: "operation-id", archive: null },
      data: { status: "VALIDATED", rejected_reason: null, validated_by: "reviewer-id" },
    });
    expect(db.$transaction).toHaveBeenCalledOnce();
  });

  it("syncs operation rejection and its reason", async () => {
    review.prepare.mockResolvedValue("REJECTED");
    await operationService.reject("operation-id", { userId: "reviewer-id", role: "DEPUTY" }, "0482", "Incorrect details");
    expect(db.vehicularDispatch.updateMany).toHaveBeenCalledWith({
      where: { operation_id: "operation-id", archive: null },
      data: { status: "REJECTED", rejected_reason: "Incorrect details", validated_by: "reviewer-id" },
    });
  });

  it.each(["validate", "reject"] as const)("syncs patient %s and reviewer", async (action) => {
    const status = action === "validate" ? "VALIDATED" : "REJECTED";
    review.prepare.mockResolvedValue(status);
    await patientLogService.review("patient-id", { userId: "reviewer-id", role: "DEPARTMENT_HEAD" }, "0482", action, "Incorrect details");
    expect(db.vehicularDispatch.updateMany).toHaveBeenCalledWith({
      where: { patient_log_id: "patient-id", archive: null },
      data: {
        status, rejected_reason: action === "reject" ? "Incorrect details" : null, validated_by: "reviewer-id",
      },
    });
    expect(db.$transaction).toHaveBeenCalledOnce();
  });

  it("does not change a linked log if the PIN is invalid", async () => {
    review.prepare.mockRejectedValue(new Error("Invalid PIN."));
    await expect(operationService.validate("operation-id", { userId: "reviewer-id", role: "DEPUTY" }, "0000"))
      .rejects.toThrow("Invalid PIN.");
    await expect(patientLogService.review("patient-id", { userId: "reviewer-id", role: "DEPUTY" }, "0000", "validate"))
      .rejects.toThrow("Invalid PIN.");
    expect(db.vehicularDispatch.updateMany).not.toHaveBeenCalled();
    expect(db.$transaction).not.toHaveBeenCalled();
  });

  it("shows reviewed linked logs in the vehicle list and preserves source IDs", async () => {
    db.vehicularDispatch.findMany.mockResolvedValue([
      {
        dispatch_id: "dispatch-1", operation_id: "operation-id", patient_log_id: null,
        status: "VALIDATED", responders: [], other_responders: [], transfers: [], vehicle: null,
      },
      {
        dispatch_id: "dispatch-2", operation_id: null, patient_log_id: "patient-id",
        status: "REJECTED", responders: [], other_responders: [], transfers: [], vehicle: null,
      },
    ]);
    const records = await vehicularDispatchReportService.list();
    expect(db.vehicularDispatch.findMany.mock.calls[0]![0].where).toEqual({ archive: null });
    expect(records[0]).toMatchObject({ operation_id: "operation-id", patient_log_id: null, status: "VALIDATED" });
    expect(records[1]).toMatchObject({ operation_id: null, patient_log_id: "patient-id", status: "REJECTED" });
  });
});
