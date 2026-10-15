import type { Role } from "@/generated/prisma/client";
import { pinService } from "@/services/pin.service";
import { ConflictError, ForbiddenError } from "@/shared/errors";

export type ReportReviewAction = "authorize" | "validate" | "reject";
type ReviewableStatus = "PENDING" | "TO_REVIEW" | "VALIDATED" | "REJECTED" | "ARCHIVED";

const FINAL_REVIEW_ROLES: Role[] = ["TEAM_LEADER", "SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY"];
const REVIEWABLE_SOURCE_STATUSES: ReviewableStatus[] = ["PENDING", "TO_REVIEW"];

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
}): Promise<"TO_REVIEW" | "VALIDATED" | "REJECTED"> {
  if (action === "authorize" && actor.role !== "TEAM_LEADER") {
    throw new ForbiddenError("Only team leaders can send reports for review.");
  }

  if (action !== "authorize" && !FINAL_REVIEW_ROLES.includes(actor.role)) {
    throw new ForbiddenError("Insufficient permissions.");
  }

  await pinService.verifyPin(actor.userId, { pin });

  if (action === "authorize") {
    if (currentStatus !== "PENDING") {
      throw new ConflictError(`Cannot authorize from ${currentStatus}.`);
    }
    return "TO_REVIEW";
  }

  if (!REVIEWABLE_SOURCE_STATUSES.includes(currentStatus)) {
    throw new ConflictError(`Cannot ${action} from ${currentStatus}.`);
  }

  return action === "validate" ? "VALIDATED" : "REJECTED";
}
