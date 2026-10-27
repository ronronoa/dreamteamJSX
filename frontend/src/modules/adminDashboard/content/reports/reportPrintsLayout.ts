import { jsPDF } from "jspdf";
import logoUrl from "@/assets/logo.png";
import type { OperationRecord } from "@/api/operations";
import type { PatientLogRecord } from "@/api/patients";
import type { VehicleDispatchRecord } from "@/api/vehicularDispatches";
import { formatDate, formatDuration, getElapsedMilliseconds } from "@/utils/dateTime";

const COLORS = {
  purple: [91, 33, 182] as [number, number, number],
  darkPurple: [76, 29, 149] as [number, number, number],
  ink: [31, 41, 55] as [number, number, number],
  muted: [107, 114, 128] as [number, number, number],
  border: [229, 231, 235] as [number, number, number],
  bgLight: [249, 250, 251] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  greenText: [22, 101, 52] as [number, number, number],
  greenBg: [220, 252, 231] as [number, number, number],
  amberText: [146, 64, 14] as [number, number, number],
  amberBg: [254, 243, 199] as [number, number, number],
  redText: [153, 27, 27] as [number, number, number],
  redBg: [254, 226, 226] as [number, number, number],
};

const MARGIN = 15;
const PAGE_WIDTH = 210;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const REGISTER_ROW_HEIGHT = 6.5;
const REGISTER_LIMIT = 6;

type ReportKind = "operation" | "patient" | "vehicle";
type Status = "PENDING" | "VALIDATED" | "REJECTED" | "ARCHIVED";

interface RegisterEntry {
  id: string;
  date: string;
  type: string;
  subject: string;
  area: string;
  assigned: string;
  response: string;
  status: Status;
}

interface ReportData {
  kind: ReportKind;
  title: string;
  description: string;
  reportNumber: string;
  reportingPeriod: string;
  totalRecords: number;
  categoryHeading: string;
  locationHeading: string;
  assignmentHeading: string;
  registerHeading: string;
  categories: Array<{ label: string; count: number; averageResponse: number | null }>;
  areas: Array<{ label: string; count: number }>;
  assignments: Array<{ label: string; count: number; averageResponse: number | null }>;
  statuses: Record<Status, number>;
  recordsWithImages: number;
  register: RegisterEntry[];
  generatedBy: string;
}

interface BasicRecord {
  id: string;
  date: string;
  type: string;
  subject: string;
  area: string;
  assigned: string;
  responseMilliseconds: number | null;
  status: Status;
  hasImage: boolean;
  groupingAssignment: string[];
}

function setFont(doc: jsPDF, style: "normal" | "bold", size: number, color = COLORS.ink) {
  doc.setFont("helvetica", style);
  doc.setFontSize(size);
  doc.setTextColor(...color);
}

function drawSectionHeader(doc: jsPDF, x: number, y: number, width: number, title: string, rightText?: string) {
  doc.setDrawColor(...COLORS.border);
  doc.setLineWidth(0.3);
  doc.line(x, y, x + width, y);
  setFont(doc, "bold", 8, COLORS.purple);
  doc.text(title.toUpperCase(), x + 2, y + 4);
  if (rightText) {
    setFont(doc, "normal", 7, COLORS.muted);
    doc.text(rightText, x + width - 2, y + 4, { align: "right" });
  }
}

function drawTable(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  columns: Array<{ label: string; width: number; align?: "left" | "right" }>,
  rows: string[][],
  footerRow?: string[],
) {
  const rowHeight = 6;
  let currentY = y;
  let currentX = x;

  setFont(doc, "normal", 7, COLORS.muted);
  for (const column of columns) {
    const align = column.align ?? "left";
    const textX = align === "right" ? currentX + column.width - 2 : currentX + 2;
    doc.text(column.label.toUpperCase(), textX, currentY + 4, { align });
    currentX += column.width;
  }
  currentY += rowHeight;
  doc.setDrawColor(...COLORS.border);
  doc.line(x, currentY, x + width, currentY);

  rows.forEach((row, rowIndex) => {
    currentX = x;
    setFont(doc, rowIndex === rows.length - 1 && !footerRow ? "bold" : "normal", 8, COLORS.ink);
    row.forEach((cell, columnIndex) => {
      const column = columns[columnIndex];
      const align = column.align ?? "left";
      const textX = align === "right" ? currentX + column.width - 2 : currentX + 2;
      doc.text(fitSingleLine(doc, cell, column.width - 4), textX, currentY + 4, { align });
      currentX += column.width;
    });
    currentY += rowHeight;
    doc.setDrawColor(240, 240, 240);
    doc.line(x, currentY, x + width, currentY);
  });

  if (footerRow) {
    currentX = x;
    setFont(doc, "bold", 8, COLORS.ink);
    footerRow.forEach((cell, columnIndex) => {
      const column = columns[columnIndex];
      const align = column.align ?? "left";
      const textX = align === "right" ? currentX + column.width - 2 : currentX + 2;
      doc.text(fitSingleLine(doc, cell, column.width - 4), textX, currentY + 4, { align });
      currentX += column.width;
    });
    currentY += rowHeight;
  }

  return currentY;
}

function normalizeStatus(status: string): Status {
  if (status === "VALIDATED" || status === "REJECTED" || status === "ARCHIVED") return status;
  return "PENDING";
}

function getResponseMilliseconds(departure: string | null | undefined, arrival: string | null | undefined) {
  if (!departure || !arrival) return null;
  const elapsed = getElapsedMilliseconds(departure, arrival);
  return elapsed !== null && elapsed >= 0 ? elapsed : null;
}

function average(values: Array<number | null>) {
  const validValues = values.filter((value): value is number => value !== null);
  if (validValues.length === 0) return null;
  return validValues.reduce((total, value) => total + value, 0) / validValues.length;
}

function summarize<T>(records: T[], getKey: (record: T) => string, getResponse: (record: T) => number | null) {
  const grouped = new Map<string, { count: number; responses: Array<number | null> }>();
  records.forEach((record) => {
    const label = getKey(record).trim() || "Unspecified";
    const current = grouped.get(label) ?? { count: 0, responses: [] };
    current.count += 1;
    current.responses.push(getResponse(record));
    grouped.set(label, current);
  });
  return [...grouped.entries()]
    .map(([label, value]) => ({ label, count: value.count, averageResponse: average(value.responses) }))
    .sort((first, second) => second.count - first.count || first.label.localeCompare(second.label));
}

function formatAverage(milliseconds: number | null) {
  return milliseconds === null ? "—" : formatDuration(milliseconds);
}

function createReportData(
  kind: ReportKind,
  records: BasicRecord[],
  generatedBy: string,
  labels: Pick<ReportData, "title" | "description" | "categoryHeading" | "locationHeading" | "assignmentHeading" | "registerHeading">,
): ReportData {
  const sortedRecords = [...records].sort((first, second) => Date.parse(second.date) - Date.parse(first.date));
  const datedRecords = sortedRecords.filter((record) => !Number.isNaN(Date.parse(record.date)));
  const dates = datedRecords.map((record) => Date.parse(record.date));
  const statuses: Record<Status, number> = { PENDING: 0, VALIDATED: 0, REJECTED: 0, ARCHIVED: 0 };
  records.forEach((record) => { statuses[record.status] += 1; });

  const period = dates.length === 0
    ? "No records"
    : dates.length === 1
      ? formatDate(new Date(dates[0]), "MMM D, YYYY")
      : `${formatDate(new Date(Math.min(...dates)), "MMM D, YYYY")} – ${formatDate(new Date(Math.max(...dates)), "MMM D, YYYY")}`;
  const generatedAt = new Date();
  const datePart = [generatedAt.getFullYear(), String(generatedAt.getMonth() + 1).padStart(2, "0"), String(generatedAt.getDate()).padStart(2, "0")].join("");

  return {
    ...labels,
    kind,
    reportNumber: `${kind.toUpperCase()}-${datePart}`,
    reportingPeriod: period,
    totalRecords: records.length,
    categories: summarize(records, (record) => record.type, (record) => record.responseMilliseconds),
    areas: summarize(records, (record) => record.area, () => null),
    assignments: summarize(
      records.flatMap((record) => record.groupingAssignment.map((label) => ({ label, responseMilliseconds: record.responseMilliseconds }))),
      (record) => record.label,
      (record) => record.responseMilliseconds,
    ),
    statuses,
    recordsWithImages: records.filter((record) => record.hasImage).length,
    register: sortedRecords.slice(0, REGISTER_LIMIT).map((record) => ({
      id: record.id,
      date: formatDate(record.date, "MMM D"),
      type: record.type,
      subject: record.subject,
      area: record.area,
      assigned: record.assigned,
      response: formatDuration(record.responseMilliseconds ?? -1),
      status: record.status,
    })),
    generatedBy: generatedBy.trim() || "Authorized user",
  };
}

export function createOperationLogReportPdf(records: OperationRecord[], generatedBy: string) {
  const normalized = records.map((record): BasicRecord => {
    const responseTimes = record.dispatches.map((dispatch) => getResponseMilliseconds(dispatch.depart_time, dispatch.arrival_time));
    return {
      id: `OP-${record.operation_id.slice(0, 8).toUpperCase()}`,
      date: record.operation_date,
      type: record.nature_of_operation || "Unspecified",
      subject: record.event_description || record.name_of_caller || "—",
      area: record.dispatches.find((dispatch) => dispatch.to_location)?.to_location || "Unspecified",
      assigned: record.team?.team_name || record.teamAssignments.map((assignment) => assignment.team.team_name).join(", ") || "Unassigned",
      responseMilliseconds: average(responseTimes),
      status: normalizeStatus(record.status),
      hasImage: record.images.length > 0,
      groupingAssignment: record.teamAssignments.map((assignment) => assignment.team.team_name).filter(Boolean),
    };
  });
  const data = createReportData("operation", normalized, generatedBy, {
    title: "OPERATION LOG REPORT",
    description: "Summary of response activity, operation types, and assigned teams recorded in the system",
    categoryHeading: "OPERATIONS BY TYPE",
    locationHeading: "OPERATIONS BY AREA",
    assignmentHeading: "RESPONSE TEAM PERFORMANCE",
    registerHeading: "OPERATION LOG REGISTER (LATEST ENTRIES)",
  });
  return renderReportPdf(data);
}

export function createPatientLogReportPdf(records: PatientLogRecord[], generatedBy: string) {
  const normalized = records.map((record): BasicRecord => {
    const responseTimes = record.dispatches.map((dispatch) => getResponseMilliseconds(dispatch.depart_time, dispatch.arrival_time));
    const patient = record.patient;
    return {
      id: `PT-${record.patient_log_id.slice(0, 8).toUpperCase()}`,
      date: record.log_date,
      type: record.type_of_request || "Unspecified",
      subject: patient.full_name || record.name_of_caller || "—",
      area: [patient.package, patient.phase].filter(Boolean).join(" / ") || "Unspecified",
      assigned: record.responders.map((responder) => responder.user.name).join(", ") || "Unassigned",
      responseMilliseconds: average(responseTimes),
      status: normalizeStatus(record.status),
      hasImage: Boolean(record.form_image) || patient.images.length > 0,
      groupingAssignment: record.responders.map((responder) => responder.user.name).filter(Boolean),
    };
  });
  const data = createReportData("patient", normalized, generatedBy, {
    title: "PATIENT LOG REPORT",
    description: "Summary of patient requests, recorded assessments, and response activity in the system",
    categoryHeading: "PATIENT LOGS BY REQUEST",
    locationHeading: "PATIENT LOGS BY AREA",
    assignmentHeading: "RESPONDER ACTIVITY",
    registerHeading: "PATIENT LOG REGISTER (LATEST ENTRIES)",
  });
  return renderReportPdf(data);
}

export function createVehicleDispatchReportPdf(records: VehicleDispatchRecord[], generatedBy: string) {
  const normalized = records.map((item): BasicRecord => {
    const record = item.record;
    return {
      id: item.id,
      date: record.dispatch_date,
      type: record.transfers.join(", ") || "Dispatch",
      subject: record.plate_number ? `${record.vehicle_name} (${record.plate_number})` : record.vehicle_name,
      area: record.to_location || "Unspecified",
      assigned: record.responders.join(", ") || record.driver_name || "Unassigned",
      responseMilliseconds: getResponseMilliseconds(record.depart_time, record.arrival_time),
      status: normalizeStatus(record.status),
      hasImage: false,
      groupingAssignment: record.responders.length ? record.responders : [record.driver_name || "Unassigned"],
    };
  });
  const data = createReportData("vehicle", normalized, generatedBy, {
    title: "VEHICLE DISPATCH REPORT",
    description: "Summary of vehicle assignments, destinations, transfer types, and dispatch times",
    categoryHeading: "DISPATCHES BY TRANSFER",
    locationHeading: "DISPATCHES BY DESTINATION",
    assignmentHeading: "RESPONDER ACTIVITY",
    registerHeading: "VEHICLE DISPATCH REGISTER (LATEST ENTRIES)",
  });
  return renderReportPdf(data);
}

async function loadLogoDataUrl() {
  const image = new Image();
  image.src = logoUrl;
  await image.decode();

  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("The organization logo could not be prepared for the report.");
  context.drawImage(image, 0, 0);
  return canvas.toDataURL("image/png");
}

async function renderReportPdf(data: ReportData) {
  const doc = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
  const logoDataUrl = await loadLogoDataUrl();
  const generatedAt = new Date();
  const fileDate = [generatedAt.getFullYear(), String(generatedAt.getMonth() + 1).padStart(2, "0"), String(generatedAt.getDate()).padStart(2, "0")].join("-");
  let y = 15;

  // Keep the existing report structure and header; the right badge is the barangay logo.
  doc.addImage(logoDataUrl, "PNG", PAGE_WIDTH - MARGIN - 14, y, 14, 14);
  setFont(doc, "normal", 8, COLORS.ink);
  doc.text("Republic of the Philippines", PAGE_WIDTH / 2, y, { align: "center" });
  doc.text("National Capital Region • City of Caloocan", PAGE_WIDTH / 2, y + 4, { align: "center" });
  setFont(doc, "bold", 14, COLORS.ink);
  doc.text("BARANGAY 176-E", PAGE_WIDTH / 2, y + 10, { align: "center" });
  setFont(doc, "bold", 8, COLORS.ink);
  doc.text("BARANGAY DISASTER RISK REDUCTION AND MANAGEMENT OFFICE (DRRMO)", PAGE_WIDTH / 2, y + 15, { align: "center" });
  doc.text("BARANGAY EMERGENCY RESPONSE TEAM (BHERT)", PAGE_WIDTH / 2, y + 19, { align: "center" });

  y += 25;
  doc.setFillColor(...COLORS.purple); doc.rect(MARGIN, y, CONTENT_WIDTH * 0.33, 1.5, "F");
  doc.setFillColor(16, 185, 129); doc.rect(MARGIN + CONTENT_WIDTH * 0.33, y, CONTENT_WIDTH * 0.33, 1.5, "F");
  doc.setFillColor(245, 158, 11); doc.rect(MARGIN + CONTENT_WIDTH * 0.66, y, CONTENT_WIDTH * 0.34, 1.5, "F");
  y += 6;

  doc.setFillColor(...COLORS.bgLight);
  doc.rect(MARGIN, y, CONTENT_WIDTH, 15, "F");
  doc.setFillColor(...COLORS.purple);
  doc.rect(MARGIN, y, 1.5, 15, "F");
  setFont(doc, "bold", 12, COLORS.purple);
  doc.text(data.title, MARGIN + 6, y + 6);
  setFont(doc, "normal", 7, COLORS.muted);
  doc.text(fitSingleLine(doc, data.description, CONTENT_WIDTH - 76), MARGIN + 6, y + 11);
  setFont(doc, "bold", 6, COLORS.muted);
  doc.text("OPERATION LOGISTICS MANAGEMENT SYSTEM", MARGIN + CONTENT_WIDTH - 4, y + 5, { align: "right" });
  setFont(doc, "bold", 7, COLORS.purple);
  doc.text(data.reportNumber, MARGIN + CONTENT_WIDTH - 4, y + 10, { align: "right" });
  y += 20;

  doc.setFillColor(...COLORS.bgLight);
  doc.rect(MARGIN, y, CONTENT_WIDTH, 12, "F");
  const metaFields = [
    { label: "REPORT NO.", value: data.reportNumber },
    { label: "REPORTING PERIOD", value: data.reportingPeriod },
    { label: "DATE GENERATED", value: formatDate(generatedAt, "ddd, MMM D, YYYY") },
    { label: "GENERATED BY", value: data.generatedBy },
  ];
  const metaWidth = CONTENT_WIDTH / metaFields.length;
  metaFields.forEach((field, index) => {
    const fieldX = MARGIN + index * metaWidth;
    setFont(doc, "bold", 6, COLORS.muted);
    doc.text(field.label, fieldX + 3, y + 4);
    setFont(doc, "bold", 7, COLORS.ink);
    doc.text(fitSingleLine(doc, field.value, metaWidth - 6), fieldX + 3, y + 8);
    if (index > 0) {
      doc.setDrawColor(...COLORS.border);
      doc.line(fieldX, y + 2, fieldX, y + 10);
    }
  });
  y += 18;

  const halfWidth = (CONTENT_WIDTH - 5) / 2;
  const rightX = MARGIN + halfWidth + 5;
  drawSectionHeader(doc, MARGIN, y, halfWidth, data.categoryHeading, `TOTAL: ${data.totalRecords}`);
  drawTable(doc, MARGIN, y + 7, halfWidth, [
    { label: "TYPE", width: halfWidth * 0.45 },
    { label: "LOGS", width: halfWidth * 0.15, align: "right" },
    { label: "SHARE", width: halfWidth * 0.15, align: "right" },
    { label: "AVG. TIME", width: halfWidth * 0.25, align: "right" },
  ], makeSummaryRows(data.categories, data.totalRecords, 4), [
    "Total / Average",
    String(data.totalRecords),
    data.totalRecords ? "100%" : "0%",
    formatAverage(average(data.categories.flatMap((category) => Array(category.count).fill(category.averageResponse)))),
  ]);

  drawSectionHeader(doc, rightX, y, halfWidth, data.locationHeading, "DB RECORDS");
  drawTable(doc, rightX, y + 7, halfWidth, [
    { label: "LOCATION / AREA", width: halfWidth * 0.5 },
    { label: "RECORDS", width: halfWidth * 0.25, align: "right" },
    { label: "SHARE", width: halfWidth * 0.25, align: "right" },
  ], makeAreaRows(data.areas, data.totalRecords, 5));
  y += 52;

  drawSectionHeader(doc, MARGIN, y, halfWidth, data.assignmentHeading);
  drawTable(doc, MARGIN, y + 7, halfWidth, [
    { label: "TEAM / RESPONDER", width: halfWidth * 0.35 },
    { label: "RECORDS", width: halfWidth * 0.2, align: "right" },
    { label: "SHARE", width: halfWidth * 0.2, align: "right" },
    { label: "AVG. TIME", width: halfWidth * 0.25, align: "right" },
  ], makeAssignmentRows(data.assignments, data.totalRecords, 3));

  drawSectionHeader(doc, rightX, y, halfWidth, "VALIDATION SUMMARY");
  const validationY = y + 7;
  doc.setFillColor(...COLORS.bgLight);
  doc.rect(rightX, validationY, halfWidth, 32, "F");
  const validationItems = [
    { label: "Validated records", value: `${data.statuses.VALIDATED} of ${data.totalRecords}`, green: true },
    { label: "Pending review", value: String(data.statuses.PENDING) },
    { label: "Rejected records", value: String(data.statuses.REJECTED) },
    { label: "Archived records", value: String(data.statuses.ARCHIVED) },
    { label: "Records with images", value: String(data.recordsWithImages) },
  ];
  let validationItemY = validationY + 6;
  validationItems.forEach((item) => {
    setFont(doc, "normal", 8, COLORS.ink);
    doc.text(fitSingleLine(doc, item.label, halfWidth * 0.72), rightX + 3, validationItemY);
    setFont(doc, "bold", 8, item.green ? COLORS.greenText : COLORS.ink);
    doc.text(item.value, rightX + halfWidth - 3, validationItemY, { align: "right" });
    validationItemY += 6;
  });
  y += 40;

  doc.setFillColor(...COLORS.darkPurple);
  doc.rect(MARGIN, y, CONTENT_WIDTH, 10, "F");
  setFont(doc, "bold", 9, COLORS.white);
  doc.text(data.registerHeading, MARGIN + 3, y + 6);
  setFont(doc, "normal", 7, [200, 200, 255]);
  doc.text(`Showing ${data.register.length} of ${data.totalRecords} records`, MARGIN + CONTENT_WIDTH - 3, y + 6, { align: "right" });
  y += 10;

  doc.setDrawColor(...COLORS.border);
  doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  setFont(doc, "bold", 7, COLORS.purple);
  const columns = [
    { label: "LOG NO.", width: 21 },
    { label: "DATE", width: 15 },
    { label: "TYPE", width: 25 },
    { label: "DESCRIPTION / SUBJECT", width: 45 },
    { label: "AREA", width: 20 },
    { label: "TEAM / STAFF", width: 20 },
    { label: "RESPONSE", width: 15 },
    { label: "STATUS", width: 19 },
  ];
  let columnX = MARGIN;
  columns.forEach((column) => {
    doc.text(column.label, columnX, y + 6);
    columnX += column.width;
  });
  y += 8;
  doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);

  data.register.forEach((record) => {
    const rowY = y + 4.5;
    let cellX = MARGIN;
    const values = [record.id, record.date, record.type, record.subject, record.area, record.assigned, record.response];
    values.forEach((value, index) => {
      const column = columns[index];
      setFont(doc, index === 0 ? "bold" : "normal", index === 0 ? 7 : 6.5, index === 0 ? COLORS.purple : COLORS.ink);
      doc.text(fitSingleLine(doc, value, column.width - 2), cellX + 1, rowY);
      cellX += column.width;
    });
    const badgeColumn = columns[columns.length - 1];
    const badgeStyle = getStatusStyle(record.status);
    doc.setFillColor(...badgeStyle.background);
    doc.roundedRect(cellX + 1, rowY - 3.5, badgeColumn.width - 2, 5, 2, 2, "F");
    setFont(doc, "bold", 5.5, badgeStyle.text);
    doc.text(record.status, cellX + badgeColumn.width / 2, rowY, { align: "center" });
    y += REGISTER_ROW_HEIGHT;
    doc.setDrawColor(245, 245, 245);
    doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  });

  y += 5;
  doc.setFillColor(...COLORS.bgLight);
  doc.rect(MARGIN, y, CONTENT_WIDTH, 12, "F");
  doc.setFillColor(...COLORS.darkPurple);
  doc.rect(MARGIN, y, 1, 12, "F");
  setFont(doc, "bold", 7, COLORS.ink);
  doc.text("Remarks:", MARGIN + 4, y + 5);
  setFont(doc, "normal", 7, COLORS.muted);
  const remarks = data.totalRecords
    ? "This report reflects the records available in the system when generated. Response time is calculated from dispatch departure to arrival where both times are recorded."
    : "No records were returned by the system for this report.";
  doc.text(doc.splitTextToSize(remarks, CONTENT_WIDTH - 22), MARGIN + 18, y + 5);
  y += 14;

  const signatureWidth = 70;
  const signatureLineY = y + 8;
  doc.setDrawColor(...COLORS.ink);
  doc.line(MARGIN + 5, signatureLineY, MARGIN + 5 + signatureWidth, signatureLineY);
  setFont(doc, "bold", 8, COLORS.purple);
  doc.text("MICHAEL L. SORIANO", MARGIN + 5 + signatureWidth / 2, y + 13, { align: "center" });
  setFont(doc, "normal", 7, COLORS.ink);
  doc.text("Department Head, DRRMO / BHERT", MARGIN + 5 + signatureWidth / 2, y + 17, { align: "center" });
  doc.text("Operation Logistics Management System", MARGIN + 5 + signatureWidth / 2, y + 21, { align: "center" });

  const rightSignatureX = PAGE_WIDTH - MARGIN - signatureWidth - 5;
  doc.line(rightSignatureX, signatureLineY, rightSignatureX + signatureWidth, signatureLineY);
  setFont(doc, "bold", 8, COLORS.ink);
  doc.text("HON. DHAREL D. CUNTAPAY", rightSignatureX + signatureWidth / 2, y + 13, { align: "center" });
  setFont(doc, "normal", 7, COLORS.ink);
  doc.text("Punong Barangay, Barangay 176-E", rightSignatureX + signatureWidth / 2, y + 17, { align: "center" });
  doc.text("Barangay Chairman / Approving Authority", rightSignatureX + signatureWidth / 2, y + 21, { align: "center" });

  doc.save(`${data.kind}-log-report-${fileDate}.pdf`);
}

function makeSummaryRows(categories: ReportData["categories"], total: number, limit: number) {
  return categories.slice(0, limit).map((category) => [
    category.label,
    String(category.count),
    formatShare(category.count, total),
    formatAverage(category.averageResponse),
  ]);
}

function makeAreaRows(areas: ReportData["areas"], total: number, limit: number) {
  return areas.slice(0, limit).map((area) => [area.label, String(area.count), formatShare(area.count, total)]);
}

function makeAssignmentRows(assignments: ReportData["assignments"], total: number, limit: number) {
  return assignments.slice(0, limit).map((assignment) => [
    assignment.label,
    String(assignment.count),
    formatShare(assignment.count, total),
    formatAverage(assignment.averageResponse),
  ]);
}

function formatShare(count: number, total: number) {
  return total === 0 ? "0%" : `${((count / total) * 100).toFixed(1)}%`;
}

function getStatusStyle(status: Status) {
  if (status === "VALIDATED") return { text: COLORS.greenText, background: COLORS.greenBg };
  if (status === "REJECTED") return { text: COLORS.redText, background: COLORS.redBg };
  return { text: COLORS.amberText, background: COLORS.amberBg };
}

function fitSingleLine(doc: jsPDF, value: string, maxWidth: number): string {
  const normalizedValue = value.trim() || "—";
  if (doc.getTextWidth(normalizedValue) <= maxWidth) return normalizedValue;

  let shortenedValue = normalizedValue;
  while (shortenedValue.length > 1 && doc.getTextWidth(`${shortenedValue}…`) > maxWidth) {
    shortenedValue = shortenedValue.slice(0, -1);
  }
  return `${shortenedValue}…`;
}
