import { jsPDF } from "jspdf";
import type { VehicleDispatchDetailRecord } from "@/api/vehicularDispatches";
import { formatDate, formatTime } from "@/utils/dateTime";
import { formatVehicularDispatchId } from "@/api/vehicularDispatches";
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

export async function createVehiclePdf(records: VehicleDispatchDetailRecord[]) {
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
    document.text(`VEHICLE DISPATCH REPORT  /  ${reportNumber}  /  CONTINUED`, PAGE_MARGIN + 4, 20);
    y = 31;
  }

  function ensureSectionSpace(requiredHeight: number, reportNumber: string) {
    if (y + requiredHeight <= pageHeight - BOTTOM_CONTENT) return;
    startContinuationPage(reportNumber);
  }

  for (const [recordIndex, record] of records.entries()) {
    if (recordIndex > 0) document.addPage();
    const reportNumber = formatVehicularDispatchId(record.dispatch_id);
    y = drawLogPdfHeader(document, logo, {
      category: "VEHICLE DISPATCH REPORT",
      reportNumber,
      reportDate: formatDate(record.dispatch_date),
      status: record.status,
    });

    drawLogSection(document, "Dispatch and vehicle", PAGE_MARGIN, y, contentWidth);
    y += SECTION_GAP;
    y = drawLogInfoCards(document, [
      ["Submitted by", record.submitter?.name ?? record.submitter_name],
      ["Reviewed by", record.validator?.name],
      ["Vehicle", record.plate_number ? `${record.vehicle_name} (${record.plate_number})` : record.vehicle_name],
      ["Driver", record.driver_name],
      ["From", record.from_location],
      ["To", record.to_location],
      ["Departure", formatTime(record.depart_time)],
      ["Arrival", formatTime(record.arrival_time)],
      ["Odometer in", record.odometer_in === null ? "—" : `${record.odometer_in} km`],
      ["Odometer out", record.odometer_out === null ? "—" : `${record.odometer_out} km`],
      ["Responders", record.responders.join(", ")],
      ["Transfer types", record.transfers.join(", ")],
    ], y, 3);

    ensureSectionSpace(30, reportNumber);
    drawLogSection(document, "Passengers", PAGE_MARGIN, y, contentWidth);
    y += SECTION_GAP;
    y = drawLogTable(document, [
      { label: "NAME", width: 0.27 },
      { label: "AGE / SEX", width: 0.16 },
      { label: "CONTACT", width: 0.2 },
      { label: "ADDRESS", width: 0.37 },
    ], record.passengers.length > 0
      ? record.passengers.map((passenger) => [
        passenger.full_name,
        `${passenger.age} / ${passenger.sex.toLowerCase()}`,
        passenger.contact_no || "—",
        passenger.address || "—",
      ])
      : [["No passengers recorded", "—", "—", "—"]], y);
  }

  drawLogFooter(document, "Vehicle dispatch");
  document.save(`vehicle-dispatch-records-${formatDate(new Date(), "YYYY-MM-DD")}.pdf`);
}
