import type { Role } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { ConflictError, ForbiddenError, NotFoundError } from "@/shared/errors";
import { pinService } from "./pin.service";

const patientLogIncludes = {
  patient: { include: { images: true } },
  submitter: { select: { user_id: true, name: true, username: true } },
  responders: { include: { user: { select: { user_id: true, name: true } } } },
  dispatches: { include: { vehicle: true, driver: { select: { user_id: true, name: true } } } },
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
    action: "authorize" | "validate" | "reject",
  ) {
    if (action === "authorize") {
      if (actor.role !== "TEAM_LEADER") throw new ForbiddenError("Only team leaders can send reports for review.");
    } else if (actor.role !== "SUPER_ADMIN" && actor.role !== "DEPARTMENT_HEAD" && actor.role !== "DEPUTY") {
      throw new ForbiddenError("Insufficient permissions.");
    }

    const patientLog = await this.getById(id);
    await pinService.verifyPin(actor.userId, { pin });

    if (action === "authorize") {
      if (patientLog.status !== "PENDING") throw new ConflictError(`Cannot authorize from ${patientLog.status}.`);
      return prisma.patientLog.update({
        where: { patient_log_id: id },
        data: { status: "TO_REVIEW" },
        include: patientLogIncludes,
      });
    }

    if (patientLog.status !== "PENDING" && patientLog.status !== "TO_REVIEW") {
      throw new ConflictError(`Cannot ${action} from ${patientLog.status}.`);
    }

    return prisma.patientLog.update({
      where: { patient_log_id: id },
      data: { status: action === "validate" ? "VALIDATED" : "REJECTED" },
      include: patientLogIncludes,
    });
  },
};
