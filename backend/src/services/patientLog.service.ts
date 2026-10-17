import type { Role } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { NotFoundError } from "@/shared/errors";
import { prepareReportReview, type ReportReviewAction } from "@/services/reportReviewWorkflow";

const patientLogIncludes = {
  patient: { include: { images: true } },
  submitter: { select: { user_id: true, name: true, username: true } },
  responders: { include: { user: { select: { user_id: true, name: true } } } },
  dispatches: { include: { vehicle: true } },
  archive: true,
} as const;

export const patientLogService = {
  list() {
    return prisma.patientLog.findMany({
      where: { archive: null },
      include: patientLogIncludes,
      orderBy: [{ log_date: "desc" }, { createdAt: "desc" }],
    });
  },

  async getById(id: string) {
    const patientLog = await prisma.patientLog.findUnique({
      where: { patient_log_id: id },
      include: patientLogIncludes,
    });
    if (!patientLog || patientLog.archive) throw new NotFoundError("Patient log", id);
    return patientLog;
  },

  async review(
    id: string,
    actor: { userId: string; role: Role },
    pin: string,
    action: ReportReviewAction,
  ) {
    const patientLog = await this.getById(id);
    const nextStatus = await prepareReportReview({ actor, pin, action, currentStatus: patientLog.status });

    return prisma.patientLog.update({
      where: { patient_log_id: id },
      data: { status: nextStatus },
      include: patientLogIncludes,
    });
  },
};
