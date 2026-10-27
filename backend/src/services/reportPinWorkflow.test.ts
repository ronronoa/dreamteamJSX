import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Role } from "@/generated/prisma/client";
import { ReportPinSchema } from "@/schemas/pin.schema";
import { CreateUserSchema } from "@/schemas/user.schema";
import { OperationReportSchema } from "@/schemas/operationReport.schema";
import { PatientReportSchema } from "@/schemas/patientReport.schema";
import { VehicularDispatchReportSchema } from "@/schemas/vehicularDispatchReport.schema";
import { getPinLookupHash } from "@/utils/report-pin";

const db = vi.hoisted(() => ({
  responseTeam: { findMany: vi.fn(), findFirst: vi.fn() },
  user: { findMany: vi.fn(), findUnique: vi.fn(), update: vi.fn() },
  inventoryItem: { findMany: vi.fn(), updateMany: vi.fn() },
  operationInventoryEntry: { findMany: vi.fn() },
  inventoryTransaction: { create: vi.fn() },
  operationLog: { create: vi.fn() },
  operationLogEdit: { create: vi.fn() },
  patient: { create: vi.fn() },
  vehicularDispatch: { create: vi.fn() },
  $transaction: vi.fn(),
}));
vi.mock("@/config/env", () => ({ env: { REPORT_PIN_ENCRYPTION_KEY: "11".repeat(32) } }));
vi.mock("@/lib/prisma", () => ({ prisma: db }));

import { reportFormsService } from "./reportForms.service";
import { vehicularDispatchReportService } from "./vehicularDispatchReport.service";
import { pinService } from "./pin.service";
import { getSubmissionStatus, prepareReportReview } from "./reportReviewWorkflow";

const teamId = "00000000-0000-4000-8000-000000000001";
const personName = { firstName: "Test", surname: "Person", middleInitial: "", suffix: "" };
const dispatch = {
  from: "Station", to: "Hospital", vehicle: "none", driver: "",
  departTime: "10:00", departPeriod: "AM", arrivalTime: "11:00", arrivalPeriod: "AM",
  odometerIn: "", odometerOut: "",
};
const operation = OperationReportSchema.parse({
  operationDetails: {
    submitterName: "Untrusted name", date: "2026-01-01", time: "10:00",
    natureOfOperation: "Medical", nameOfCaller: personName, teamAssigned: [teamId], responders: [],
  },
  dispatch, people: [], inventory: [], operationDescription: { description: "Test report" },
});
const patient = PatientReportSchema.parse({
  responderDetails: {
    submitterName: "Untrusted name", date: "2026-01-01", time: "10:00", typeOfRequest: "FIRST_AID",
    caller: personName, dispositionType: "DROP_OFF", responders: [], otherResponders: ["Test responder"],
  },
  dispatch,
  patientDetails: {
    name: personName, birthdate: "2000-01-01", age: 26, sex: "Male", contactPerson: personName,
    contactNumber: "09171234567", address: { phase: "", package: "", block: "", lot: "" },
  },
  firstAidHospital: {
    bp: "", pr: "", spo2: "", temp: "", medicalAssessment: "Test assessment", firstAidGiven: "",
    hospitalName: "Hospital", hospitalRepresentative: personName,
    hospitalInTime: "11:00", hospitalInPeriod: "AM", hospitalOutTime: "12:00", hospitalOutPeriod: "PM",
  },
  inventory: [],
});
const vehicle = VehicularDispatchReportSchema.parse({
  details: {
    submitterName: "Untrusted name", date: "2026-01-01", time: "10:00",
    transfers: ["Drop-Off"], responders: [], otherResponders: ["Test responder"],
  },
  dispatch, passengers: [],
});

beforeEach(() => {
  vi.restoreAllMocks();
  vi.resetAllMocks();
  db.responseTeam.findMany.mockResolvedValue([{ team_id: teamId }]);
  db.user.findMany.mockResolvedValue([]);
  db.inventoryItem.findMany.mockResolvedValue([]);
  db.operationInventoryEntry.findMany.mockResolvedValue([]);
  db.operationLog.create.mockResolvedValue({ operation_id: "operation-id" });
  db.patient.create.mockResolvedValue({ patientLogs: [{ patient_log_id: "patient-id" }] });
  db.$transaction.mockImplementation((callback) => callback(db));
});

describe("personal report PINs", () => {
  it("generates only an unassigned four-digit PIN, even when almost full", async () => {
    const assigned = [];
    for (let number = 0; number < 10000; number += 1) {
      const pin = String(number).padStart(4, "0");
      if (pin !== "0482") assigned.push({ pinLookupHash: getPinLookupHash(pin) });
    }
    db.user.findMany.mockResolvedValue(assigned);
    await expect(pinService.generatePin()).resolves.toBe("0482");
    assigned.push({ pinLookupHash: getPinLookupHash("0482") });
    await expect(pinService.generatePin()).rejects.toThrow("All 10,000");
  });

  it("accepts the new format and rejects legacy and malformed formats", () => {
    expect(ReportPinSchema.parse(" 0482 ")).toBe("0482");
    for (const pin of ["123456", "176E11890", "20260001-A", "123", "12a4"]) {
      expect(ReportPinSchema.safeParse(pin).success).toBe(false);
    }
  });

  it("requires a team while allowing a server-generated PIN when adding a user", () => {
    const user = { name: "Member", username: "newmember", password: "test-password", role: "MEMBER" };
    expect(CreateUserSchema.safeParse(user).success).toBe(false);
    expect(CreateUserSchema.safeParse({ ...user, team_id: teamId }).success).toBe(true);
  });

  it("finds an active member PIN owner instead of consulting a shared PIN", async () => {
    db.user.findUnique.mockResolvedValue({ user_id: "owner-id", name: "Member", role: "MEMBER", isActive: true });
    const verify = vi.spyOn(pinService, "verifyPin").mockResolvedValue({ valid: true });
    const owner = await pinService.verifyReportFormPin({ pin: "0482" });
    expect(owner.ownerRole).toBe("MEMBER");
    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { pinLookupHash: getPinLookupHash("0482") },
      select: { user_id: true, name: true, role: true, isActive: true },
    });
    expect(verify).toHaveBeenCalledWith("owner-id", { pin: "0482" });
  });

  it("rejects unknown or inactive owners before verifying their PIN", async () => {
    const verify = vi.spyOn(pinService, "verifyPin");
    for (const owner of [null, { isActive: false }]) {
      db.user.findUnique.mockResolvedValue(owner);
      await expect(pinService.verifyReportFormPin({ pin: "0482" })).rejects.toThrow("Invalid report PIN");
    }
    expect(verify).not.toHaveBeenCalled();
  });

  it("honors account PIN lockout", async () => {
    db.user.findUnique.mockResolvedValue({
      user_id: "owner-id", isActive: true, team: { team_name: "Alpha", isArchived: false },
      pinHash: "hash", pinLookupHash: "lookup", pinLockedUntil: new Date(Date.now() + 60000),
    });
    await expect(pinService.verifyPin("owner-id", { pin: "0482" })).rejects.toThrow("PIN locked");
  });
});

describe.each<Role>(["SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY", "TEAM_LEADER", "MEMBER"])("%s report submission", (role) => {
  const status = role === "MEMBER" ? "PENDING" : "VALIDATED";
  const owner = { valid: true, type: "USER" as const, ownerId: "owner-id", ownerName: "Verified owner", ownerRole: role };

  it("assigns the operation and child dispatch status from the PIN owner", async () => {
    await reportFormsService.createOperation(operation, [], owner);
    const data = db.operationLog.create.mock.calls[0]![0].data;
    expect(data).toMatchObject({ status, submitted_by: "owner-id", submitter_name: "Verified owner", dispatches: { create: { status } } });
    expect(data.validated_by).toBe(role === "MEMBER" ? null : "owner-id");
    expect(db.operationLogEdit.create).toHaveBeenCalledTimes(role === "MEMBER" ? 0 : 1);
  });

  it("assigns the patient and child dispatch status from the PIN owner", async () => {
    await reportFormsService.createPatient(patient, [], owner);
    const data = db.patient.create.mock.calls[0]![0].data.patientLogs.create;
    expect(data).toMatchObject({ status, submitted_by: "owner-id", submitter_name: "Verified owner", dispatches: { create: { status } } });
  });

  it("assigns standalone dispatch status from the PIN owner", async () => {
    await vehicularDispatchReportService.create(vehicle, owner);
    expect(db.vehicularDispatch.create.mock.calls[0]![0].data).toMatchObject({ status, submitted_by: "owner-id", submitter_name: "Verified owner" });
    expect(getSubmissionStatus(role)).toBe(status);
  });

  it("permits senior reviewers and denies member self-validation", async () => {
    vi.spyOn(pinService, "verifyPin").mockResolvedValue({ valid: true });
    const review = prepareReportReview({ actor: { userId: "owner-id", role }, pin: "0482", action: "validate", currentStatus: "PENDING" });
    if (role === "MEMBER") await expect(review).rejects.toThrow("Insufficient permissions");
    else await expect(review).resolves.toBe("VALIDATED");
  });
});

it("rejects automatic operation validation when inventory is insufficient", async () => {
  db.operationInventoryEntry.findMany.mockResolvedValue([{ item_id: "item-id", item_name: "Bandage", quantity: 2 }]);
  db.inventoryItem.updateMany.mockResolvedValue({ count: 0 });
  const owner = { valid: true, type: "USER" as const, ownerId: "owner-id", ownerName: "Admin", ownerRole: "DEPARTMENT_HEAD" as const };
  await expect(reportFormsService.createOperation(operation, [], owner)).rejects.toThrow("Not enough stock");
  expect(db.inventoryTransaction.create).not.toHaveBeenCalled();
  expect(db.operationLogEdit.create).not.toHaveBeenCalled();
});
