import type { OperationDetails } from "@/types/operationLog";

export function getOperationNature(details: OperationDetails): string {
  if (details.natureOfOperation === "Other") {
    return details.natureOfOperationOther?.trim() ?? "";
  }
  return details.natureOfOperation.trim();
}
