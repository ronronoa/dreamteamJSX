import { jsPDF } from "jspdf";
import type { PatientLogRecord } from "@/api/patients";
import { formatDate, formatTime } from "@/utils/dateTime";
import { formatPatientLogId } from "./patientUtils";
import { addAttachmentImages } from "../reportPdfImages";
import {
  drawLogFooter,
  drawLogInfoCards,
  drawLogPdfHeader,
  drawLogSection,
  drawLogTable,
  prepareLogPdfHeader,
} from "../logPdfStyle";

const PAGE_MARGIN = 15;
const BOTTOM_CONTENT = 24;
const SECTION_GAP = 11;

export async function createPatientPdf(records: PatientLogRecord[]) {
  if (records.length === 0) return;

  const document = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
  const logo = await prepareLogPdfHeader();
  const pageWidth = document.internal.pageSize.getWidth();
  const contentWidth = pageWidth - PAGE_MARGIN * 2;
  const pageHeight = document.internal.pageSize.getHeight();
  let y = 0;

  function startContinuationPage(reportNumber: string) {
    document.addPage();
    document.setFillColor(91, 33, 182);
    document.rect(PAGE_MARGIN, 12, contentWidth, 12, "F");
    document.setFont("helvetica", "bold");
    document.setFontSize(8);
    document.setTextColor(255, 255, 255);
    document.text(`PATIENT LOG REPORT  /  ${reportNumber}  /  CONTINUED`, PAGE_MARGIN + 4, 20);
    y = 31;
  }

  function ensureSectionSpace(requiredHeight: number, reportNumber: string) {
    if (y + requiredHeight <= pageHeight - BOTTOM_CONTENT) return;
    startContinuationPage(reportNumber);
  }

  for (const [recordIndex, record] of records.entries()) {
    if (recordIndex > 0) document.addPage();
    const reportNumber = formatPatientLogId(record.patient_log_id);
    y = drawLogPdfHeader(document, logo, {
      category: "PATIENT LOG REPORT",
      reportNumber,
      reportDate: formatDate(record.log_date),
      status: record.status,
    });

    const report = record.report_data && typeof record.report_data === "object"
      ? record.report_data as Record<string, unknown>
      : {};
    const patientDetails = report.patientDetails && typeof report.patientDetails === "object"
      ? report.patientDetails as Record<string, unknown>
      : {};
    const firstAid = report.firstAidHospital && typeof report.firstAidHospital === "object"
      ? report.firstAidHospital as Record<string, unknown>
      : {};
    const inventory = Array.isArray(report.inventory)
      ? report.inventory as Array<Record<string, unknown>>
      : [];
    const responderDetails = report.responderDetails && typeof report.responderDetails === "object"
      ? report.responderDetails as Record<string, unknown>
      : {};
    const otherResponders = Array.isArray(responderDetails.otherResponders)
      ? responderDetails.otherResponders.filter((name): name is string => typeof name === "string")
      : [];
    const responders = [...record.responders.map(({ user }) => user.name), ...otherResponders].join(", ");
    const dispatch = record.dispatches[0];

    drawLogSection(document, "Patient and response", PAGE_MARGIN, y, contentWidth);
    y += SECTION_GAP;
    y = drawLogInfoCards(document, [
      ["Patient", record.patient.full_name],
      ["Request type", record.type_of_request.replaceAll("_", " ")],
      ["Birthdate", formatDate(record.patient.birthday)],
      ["Age", patientDetails.age],
      ["Sex", record.patient.sex],
      ["Address", [record.patient.phase, record.patient.package, record.patient.block, record.patient.lot].filter(Boolean).join(", ")],
      ["Contact person", record.patient.contact_person],
      ["Contact number", record.patient.contact_number],
      ["Caller", record.name_of_caller],
      ["Responders", responders],
      ["Submitted by", record.submitter?.name ?? record.submitter_name],
      ["Reviewed by", record.validator?.name],
    ], y, 3);

    ensureSectionSpace(45, reportNumber);
    drawLogSection(document, "Assessment and care", PAGE_MARGIN, y, contentWidth);
    y += SECTION_GAP;
    y = drawLogInfoCards(document, [
      ["Blood pressure", record.bp],
      ["Pulse", record.pr],
      ["SpO₂", record.spo2],
      ["Temperature", record.temp],
      ["Hospital", record.hospital_name],
      ["Hospital representative", record.hospital_representative],
      ["Hospital in", formatTime(record.hospital_in_time)],
      ["Hospital out", formatTime(record.hospital_out_time)],
    ], y, 4);
    if (record.medical_assessment || firstAid.firstAidGiven || record.waiver_description) {
      ensureSectionSpace(25, reportNumber);
      y = drawLogInfoCards(document, [
        ["Medical assessment", record.medical_assessment],
        ["First aid", firstAid.firstAidGiven],
        ["Waiver", record.waiver_description],
      ], y, 2);
    }

    ensureSectionSpace(45, reportNumber);
    drawLogSection(document, "Dispatch and inventory", PAGE_MARGIN, y, contentWidth);
    y += SECTION_GAP;
    y = drawLogInfoCards(document, [
      ["From", dispatch?.from_location],
      ["To", dispatch?.to_location],
      ["Vehicle", dispatch?.vehicle ? `${dispatch.vehicle.vehicle_name} (${dispatch.vehicle.plate_number})` : "—"],
      ["Driver", dispatch?.driver_name],
      ["Departure", formatTime(dispatch?.depart_time)],
      ["Arrival", formatTime(dispatch?.arrival_time)],
    ], y, 3);

    ensureSectionSpace(22, reportNumber);
    drawLogSection(document, "Inventory used", PAGE_MARGIN, y, contentWidth);
    y += SECTION_GAP;
    y = drawLogTable(document, [
      { label: "ITEM", width: 0.7 },
      { label: "QUANTITY", width: 0.3 },
    ], inventory.length
      ? inventory.map((item) => [String(item.itemName ?? "Inventory item"), String(item.quantity ?? "—")])
      : [["No inventory recorded", "—"]], y);

    const imagePaths = [
      ...(record.form_image ? [record.form_image] : []),
      ...record.patient.images.map((image) => image.image_url),
    ];
    if (imagePaths.length > 0) {
      ensureSectionSpace(65, reportNumber);
      y = await addAttachmentImages(document, imagePaths, y + 2);
    }
  }

  drawLogFooter(document, "Patient log");
  document.save(`patient-logs-${formatDate(new Date(), "YYYY-MM-DD")}.pdf`);
}
