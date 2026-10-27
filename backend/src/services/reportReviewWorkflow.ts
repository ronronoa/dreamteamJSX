import type { Role } from "@/generated/prisma/client";
import { pinService } from "@/services/pin.service";
import { ConflictError, ForbiddenError } from "@/shared/errors";

export type ReportReviewAction = "authorize" | "validate" | "reject";
type ReviewableStatus = "PENDING" | "VALIDATED" | "REJECTED" | "ARCHIVED";

const FINAL_REVIEW_ROLES: Role[] = ["SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY"];
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
  if (actor.role === "TEAM_LEADER") {
    throw new ForbiddenError("Team Leaders have read-only access.");
  }

  if (!FINAL_REVIEW_ROLES.includes(actor.role)) {
    throw new ForbiddenError("Insufficient permissions.");
  }

  if (action === "authorize") {
    throw new ForbiddenError("This report action is no longer available.");
  }

  await pinService.verifyPin(actor.userId, { pin });

  if (action === "authorize") {
    if (currentStatus !== "PENDING") {
      throw new ConflictError(`Cannot authorize from ${currentStatus}.`);
    }
    return "VALIDATED";
  }

  const canReviewStatus = REVIEWABLE_SOURCE_STATUSES.includes(currentStatus);
  const canRejectAgain = action === "reject" && currentStatus === "REJECTED";

  if (!canReviewStatus && !canRejectAgain) {
    throw new ConflictError(`Cannot ${action} from ${currentStatus}.`);
  }

  return action === "validate" ? "VALIDATED" : "REJECTED";
}
