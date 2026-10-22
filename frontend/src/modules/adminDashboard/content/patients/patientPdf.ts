import { jsPDF } from "jspdf";
import type { PatientLogRecord } from "@/api/patients";
import { formatDate, formatTime } from "@/utils/dateTime";
import { formatPatientLogId } from "./patientUtils";

const MARGIN = 16;
const BOTTOM_MARGIN = 18;
const PURPLE: [number, number, number] = [86, 35, 129];
const INK: [number, number, number] = [31, 41, 55];
const MUTED: [number, number, number] = [107, 114, 128];

export function createPatientPdf(records: PatientLogRecord[]) {
  if (records.length === 0) return;
  const document = new jsPDF();
  let y = 31;

  function ensureSpace(height: number) {
    if (y + height <= document.internal.pageSize.getHeight() - BOTTOM_MARGIN) return;
    document.addPage();
    y = 31;
  }

  function addLine(label: string, value: unknown) {
    const formattedValue = value === null || value === undefined || String(value).trim() === "" ? "—" : String(value);
    const textLines = document.splitTextToSize(`${label}: ${formattedValue}`, document.internal.pageSize.getWidth() - MARGIN * 2);
    ensureSpace(textLines.length * 5 + 2);
    document.setFont("helvetica", "normal");
    document.setFontSize(9);
    document.setTextColor(...INK);
    document.text(textLines, MARGIN, y);
    y += textLines.length * 5 + 2;
  }

  records.forEach((record, index) => {
    if (index > 0) {
      document.addPage();
      y = 31;
    }
    const report = record.report_data && typeof record.report_data === "object" ? record.report_data as Record<string, unknown> : {};
    const patientDetails = report.patientDetails && typeof report.patientDetails === "object" ? report.patientDetails as Record<string, unknown> : {};
    const firstAid = report.firstAidHospital && typeof report.firstAidHospital === "object" ? report.firstAidHospital as Record<string, unknown> : {};
    const inventory = Array.isArray(report.inventory) ? report.inventory as Array<Record<string, unknown>> : [];
    const dispatch = record.dispatches[0];

    document.setFont("helvetica", "bold");
    document.setFontSize(8);
    document.setTextColor(...PURPLE);
    document.text("PATIENT LOG REPORT", MARGIN, 17);
    document.setDrawColor(226, 232, 240);
    document.line(MARGIN, 22, document.internal.pageSize.getWidth() - MARGIN, 22);
    document.setFontSize(15);
    document.setTextColor(...INK);
    document.text(formatPatientLogId(record.patient_log_id), MARGIN, y);
    y += 9;

    const addSection = (title: string) => {
      ensureSpace(12);
      document.setFillColor(248, 247, 250);
      document.roundedRect(MARGIN, y - 4, document.internal.pageSize.getWidth() - MARGIN * 2, 9, 1.5, 1.5, "F");
      document.setFont("helvetica", "bold");
      document.setFontSize(8);
      document.setTextColor(...PURPLE);
      document.text(title.toUpperCase(), MARGIN + 3, y + 2);
      y += 11;
    };

    addSection("Patient and report");
    addLine("Patient", record.patient.full_name);
    addLine("Report date", formatDate(record.log_date));
    addLine("Birthdate", formatDate(record.patient.birthday));
    addLine("Age", patientDetails.age);
    addLine("Sex", record.patient.sex);
    addLine("Address", [record.patient.phase, record.patient.package, record.patient.block, record.patient.lot].filter(Boolean).join(", "));
    addLine("Contact person", record.patient.contact_person);
    addLine("Contact number", record.patient.contact_number);
    addLine("Request type", record.type_of_request.replaceAll("_", " "));
    addLine("Caller", record.name_of_caller);
    addLine("Submitted by", record.submitter?.name ?? record.submitter_name);
    addLine("Responders", record.responders.map(({ user }) => user.name).join(", "));

    addSection("Assessment and care");
    addLine("Assessment", record.medical_assessment);
    addLine("First aid", firstAid.firstAidGiven);
    addLine("Waiver description", record.waiver_description);
    addLine("Blood pressure", record.bp);
    addLine("Pulse", record.pr);
    addLine("SpO₂", record.spo2);
    addLine("Temperature", record.temp);
    addLine("Hospital", record.hospital_name);
    addLine("Hospital representative", record.hospital_representative);
    addLine("Hospital in", formatTime(record.hospital_in_time));
    addLine("Hospital out", formatTime(record.hospital_out_time));

    addSection("Dispatch");
    addLine("From", dispatch?.from_location);
    addLine("To", dispatch?.to_location);
    addLine("Vehicle", dispatch?.vehicle ? `${dispatch.vehicle.vehicle_name} (${dispatch.vehicle.plate_number})` : "—");
    addLine("Driver", dispatch?.driver_name);
    addLine("Departure", formatTime(dispatch?.depart_time));
    addLine("Arrival", formatTime(dispatch?.arrival_time));

    addSection("Inventory used");
    if (inventory.length === 0) {
      addLine("Items", "None recorded");
    } else {
      inventory.forEach((item) => addLine(String(item.itemName ?? "Inventory item"), item.quantity));
    }

    document.setFont("helvetica", "normal");
    document.setFontSize(7);
    document.setTextColor(...MUTED);
    document.text("Generated from the patient records dashboard", MARGIN, document.internal.pageSize.getHeight() - 8);
  });

  document.save(`patient-logs-${new Date().toISOString().slice(0, 10)}.pdf`);
}
