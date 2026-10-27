import type { Role } from "@/generated/prisma/client";
import { pinService } from "@/services/pin.service";
import { ConflictError, ForbiddenError } from "@/shared/errors";

export type ReportReviewAction = "authorize" | "validate" | "reject";
type ReviewableStatus = "PENDING" | "VALIDATED" | "REJECTED" | "ARCHIVED";

export const REPORT_REVIEW_ROLES: Role[] = ["SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY", "TEAM_LEADER"];

export function getSubmissionStatus(role: Role): "PENDING" | "VALIDATED" {
  return REPORT_REVIEW_ROLES.includes(role) ? "VALIDATED" : "PENDING";
}
const REVIEWABLE_SOURCE_STATUSES: ReviewableStatus[] = ["PENDING"];

export async function prepareReportReview({
  actor,
  pin,
  action,
  currentStatus,
}: {
  actor: { userId: string; role: Role };
  pin: string;
  action: ReportReviewAction;
  currentStatus: ReviewableStatus;
}): Promise<"VALIDATED" | "REJECTED"> {
  if (!REPORT_REVIEW_ROLES.includes(actor.role)) {
    throw new ForbiddenError("Insufficient permissions.");
  }

  if (action === "authorize") {
    throw new ForbiddenError("This report action is no longer available.");
  }

  await pinService.verifyPin(actor.userId, { pin });

  const canReviewStatus = REVIEWABLE_SOURCE_STATUSES.includes(currentStatus);
  const canRejectAgain = action === "reject" && currentStatus === "REJECTED";

  if (!canReviewStatus && !canRejectAgain) {
    throw new ConflictError(`Cannot ${action} from ${currentStatus}.`);
  }

  return action === "validate" ? "VALIDATED" : "REJECTED";
}
