import type { Role } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { ConflictError, NotFoundError, ValidationError } from "@/shared/errors";
import { prepareReportReview, type ReportReviewAction } from "@/services/reportReviewWorkflow";
import { deductPatientInventory, readPatientInventory } from "./patientInventory.service";

const patientLogIncludes = {
  patient: { include: { images: true } },
  submitter: { select: { user_id: true, name: true, username: true, role: true } },
  validator: { select: { user_id: true, name: true, username: true, role: true } },
  responders: { include: { user: { select: { user_id: true, name: true } } } },
  dispatches: { include: { vehicle: true } },
  archive: true,
} as const;

export const patientLogService = {
  list(submittedBy?: string) {
    return prisma.patientLog.findMany({
      where: {
        archive: null,
        ...(submittedBy && {
          OR: [
            { submitted_by: submittedBy },
            { status: { in: ["VALIDATED", "REJECTED"] } },
          ],
        }),
      },
      include: patientLogIncludes,
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
    });
  },

  async getById(id: string, submittedBy?: string) {
    const patientLog = await prisma.patientLog.findUnique({
      where: { patient_log_id: id },
      include: patientLogIncludes,
    });
    const isReviewed = patientLog?.status === "VALIDATED" || patientLog?.status === "REJECTED"
    if (!patientLog || patientLog.archive || (submittedBy && patientLog.submitted_by !== submittedBy && !isReviewed)) {
      throw new NotFoundError("Patient log", id);
    }
    return patientLog;
  },

  async review(
    id: string,
    actor: { userId: string; role: Role },
    pin: string,
    action: ReportReviewAction,
    rejectedReason?: string,
  ) {
    const patientLog = await this.getById(id);
    if (action === "reject" && !rejectedReason?.trim()) {
      throw new ValidationError("A rejection reason is required.");
    }
    const nextStatus = await prepareReportReview({ actor, pin, action, currentStatus: patientLog.status });

    const rejectedReasonValue = action === "reject" ? rejectedReason!.trim() : null;
    return prisma.$transaction(async (transaction) => {
      const updated = await transaction.patientLog.updateMany({
        where: { patient_log_id: id, status: patientLog.status },
        data: {
          status: nextStatus,
          rejected_reason: rejectedReasonValue,
          validated_by: actor.userId,
        },
      });
      if (updated.count === 0) throw new ConflictError("This patient report was already reviewed.");
      if (nextStatus === "VALIDATED") {
        await deductPatientInventory(transaction, id, readPatientInventory(patientLog.report_data), actor.userId);
      }
      await transaction.vehicularDispatch.updateMany({
        where: { patient_log_id: id, archive: null },
        data: {
          status: nextStatus,
          rejected_reason: rejectedReasonValue,
          validated_by: actor.userId,
        },
      });
      return transaction.patientLog.findUniqueOrThrow({ where: { patient_log_id: id }, include: patientLogIncludes });
    });
  },
};
