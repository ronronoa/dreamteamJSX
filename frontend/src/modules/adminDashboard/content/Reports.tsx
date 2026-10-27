import { Printer } from "lucide-react";
import CommonButton from "@/components/common/widgets/CommonButton";
import { fetchOperations } from "@/api/operations";
import { fetchPatientLogs } from "@/api/patients";
import { fetchVehicularDispatchRecords } from "@/api/vehicularDispatches";
import { useAuth } from "@/store/useAuth";
import { REPORT_CARDS as reports } from "./reports/reportCards";
import {
  createOperationLogReportPdf,
  createPatientLogReportPdf,
  createVehicleDispatchReportPdf,
} from "./reports/reportPrintsLayout";
import { useState } from "react";

export default function Reports() {
  const { session } = useAuth();
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);
  const [reportError, setReportError] = useState<string | null>(null);

  async function generateReport(title: string) {
    if (!session?.accessToken) {
      setReportError("Your session has expired. Sign in again to generate a report.");
      return;
    }

    setGeneratingReport(title);
    setReportError(null);

    try {
      if (title === "Operation Log Reports") {
        const records = await fetchOperations(session.accessToken);
        await createOperationLogReportPdf(records, session.user.name);
      } else if (title === "Patient Log Reports") {
        const records = await fetchPatientLogs(session.accessToken);
        await createPatientLogReportPdf(records, session.user.name);
      } else if (title === "Vehicle Dispatch Reports") {
        const records = await fetchVehicularDispatchRecords(session.accessToken);
        await createVehicleDispatchReportPdf(records, session.user.name);
      }
    } catch (error) {
      setReportError(error instanceof Error ? error.message : "Unable to generate this report.");
    } finally {
      setGeneratingReport(null);
    }
  }

  return (
    <>
      {reportError && (
        <div role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {reportError}
        </div>
      )}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map(({ title, description, icon: Icon }) => {
          const isSupported = title !== "Inventory Reports";
          const isGenerating = generatingReport === title;

          return (
            <article
              key={title}
              className="flex flex-col rounded-2xl border border-gray-600 bg-white p-5 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
                <Icon size={18} className="text-purple-600" strokeWidth={2} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">{title}</h3>

              <p className="mt-1.5 flex-1 text-md leading-relaxed text-gray-500">
                {description}
              </p>

              <CommonButton
                className="mt-5 w-full"
                disabled={!isSupported || generatingReport !== null}
                onClick={() => void generateReport(title)}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <Printer size={14} />
                  {isGenerating ? "Generating…" : "Generate / Print"}
                </span>
              </CommonButton>
            </article>
          );
        })}
      </div>
    </>
  );
}
