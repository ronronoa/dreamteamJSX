import "dotenv/config";
import { prisma } from "../src/lib/prisma";
import { deductPatientInventory, readPatientInventory } from "../src/services/patientInventory.service";
import { z } from "zod";

async function reconcilePatientInventory() {
  const patientLogId = z.uuid().parse(process.argv[2]);
  await prisma.$transaction(async (transaction) => {
    const report = await transaction.patientLog.findUniqueOrThrow({ where: { patient_log_id: patientLogId } });
    if (report.status !== "VALIDATED" || !report.submitted_by) {
      throw new Error("Only a validated report with an identified submitter can be reconciled.");
    }
    const deducted = await deductPatientInventory(transaction, patientLogId, readPatientInventory(report.report_data), report.submitted_by);
    console.log(deducted ? "Missing patient report inventory usage recorded." : "No missing inventory deduction.");
  });
}

reconcilePatientInventory()
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : "Could not reconcile patient inventory.");
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
