import { jsPDF } from "jspdf";
import type { OperationRecord } from "@/api/operations";
import { formatDate, formatDateTime, formatTime } from "@/utils/dateTime";
import { formatOperationId, formatPersonAddress } from "./operationUtils";

type PdfLayout = {
  document: jsPDF;
  pageWidth: number;
  pageHeight: number;
  margin: number;
  contentWidth: number;
  y: number;
};

type PdfColumn = {
  label: string;
  width: number;
};

const COLORS = {
  purple: [86, 35, 129] as [number, number, number],
  ink: [31, 41, 55] as [number, number, number],
  muted: [107, 114, 128] as [number, number, number],
  border: [226, 232, 240] as [number, number, number],
  pale: [248, 247, 250] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
};

const PAGE_MARGIN = 16;
const TOP_CONTENT = 32;
const BOTTOM_CONTENT = 20;

function formatValue(value: string | number | null | undefined) {
  if (value === null || value === undefined || String(value).trim() === "") return "-";
  return String(value);
}

function ensureSpace(layout: PdfLayout, height: number) {
  if (layout.y + height <= layout.pageHeight - BOTTOM_CONTENT) return;

  layout.document.addPage();
  layout.y = TOP_CONTENT;
}

function addText(
  layout: PdfLayout,
  text: string,
  options: { bold?: boolean; size?: number; color?: [number, number, number]; indent?: number } = {},
) {
  const { document } = layout;
  const fontSize = options.size ?? 9;
  const indent = options.indent ?? 0;
  const lineHeight = Math.max(4.5, fontSize * 0.42);
  document.setFont("helvetica", options.bold ? "bold" : "normal");
  document.setFontSize(fontSize);
  document.setTextColor(...(options.color ?? COLORS.ink));

  const lines = document.splitTextToSize(formatValue(text), layout.contentWidth - indent);
  ensureSpace(layout, lines.length * lineHeight);
  document.text(lines, layout.margin + indent, layout.y);
  layout.y += lines.length * lineHeight;
}

function addSection(layout: PdfLayout, title: string) {
  ensureSpace(layout, 13);
  const { document } = layout;
  document.setFillColor(...COLORS.pale);
  document.roundedRect(layout.margin, layout.y - 4, layout.contentWidth, 10, 1.5, 1.5, "F");
  addText(layout, title.toUpperCase(), { bold: true, size: 8, color: COLORS.purple, indent: 3 });
  layout.y += 5;
}

function addInfoCards(layout: PdfLayout, fields: Array<[string, string | number | null | undefined]>) {
  const gap = 4;
  const cardWidth = (layout.contentWidth - gap) / 2;

  for (let index = 0; index < fields.length; index += 2) {
    const row = fields.slice(index, index + 2);
    const cards = row.map(([label, value]) => {
      const valueLines = layout.document.splitTextToSize(formatValue(value), cardWidth - 8);
      return { label, valueLines };
    });
    const cardHeight = Math.max(17, ...cards.map((card) => 11 + card.valueLines.length * 4.5));
    ensureSpace(layout, cardHeight + 3);

    cards.forEach((card, columnIndex) => {
      const x = layout.margin + columnIndex * (cardWidth + gap);
      layout.document.setFillColor(...COLORS.white);
      layout.document.setDrawColor(...COLORS.border);
      layout.document.roundedRect(x, layout.y, cardWidth, cardHeight, 1.5, 1.5, "FD");
      layout.document.setFont("helvetica", "bold");
      layout.document.setFontSize(7);
      layout.document.setTextColor(...COLORS.muted);
      layout.document.text(card.label.toUpperCase(), x + 4, layout.y + 5);
      layout.document.setFont("helvetica", "normal");
      layout.document.setFontSize(9);
      layout.document.setTextColor(...COLORS.ink);
      layout.document.text(card.valueLines, x + 4, layout.y + 11);
    });

    layout.y += cardHeight + 3;
  }
}

function addParagraph(layout: PdfLayout, value: string) {
  const lines = layout.document.splitTextToSize(formatValue(value), layout.contentWidth - 10);
  const lineHeight = 4.5;
  let lineOffset = 0;

  while (lineOffset < lines.length) {
    ensureSpace(layout, 12);
    const availableHeight = layout.pageHeight - BOTTOM_CONTENT - layout.y - 8;
    const linesOnPage = Math.max(1, Math.floor(availableHeight / lineHeight));
    const pageLines = lines.slice(lineOffset, lineOffset + linesOnPage);
    const boxHeight = pageLines.length * lineHeight + 8;
    layout.document.setFillColor(...COLORS.white);
    layout.document.setDrawColor(...COLORS.border);
    layout.document.roundedRect(layout.margin, layout.y, layout.contentWidth, boxHeight, 1.5, 1.5, "FD");
    layout.document.setFont("helvetica", "normal");
    layout.document.setFontSize(9);
    layout.document.setTextColor(...COLORS.ink);
    layout.document.text(pageLines, layout.margin + 5, layout.y + 6);
    layout.y += boxHeight + 3;
    lineOffset += pageLines.length;
  }
}

function addTable(layout: PdfLayout, columns: PdfColumn[], rows: string[][]) {
  function addHeader() {
    ensureSpace(layout, 11);
    const { document } = layout;
    document.setFillColor(...COLORS.purple);
    document.rect(layout.margin, layout.y, layout.contentWidth, 9, "F");
    document.setFont("helvetica", "bold");
    document.setFontSize(7);
    document.setTextColor(...COLORS.white);
    let x = layout.margin + 3;

    columns.forEach((column) => {
      document.text(column.label, x, layout.y + 6);
      x += layout.contentWidth * column.width;
    });
    layout.y += 9;
  }

  addHeader();
  rows.forEach((row) => {
    const wrappedValues = row.map((value, index) => {
      const columnWidth = layout.contentWidth * columns[index].width - 7;
      return layout.document.splitTextToSize(formatValue(value), columnWidth);
    });
    const rowHeight = Math.max(9, ...wrappedValues.map((lines) => lines.length * 4 + 5));

    if (layout.y + rowHeight > layout.pageHeight - BOTTOM_CONTENT) {
      layout.document.addPage();
      layout.y = TOP_CONTENT;
      addHeader();
    }

    layout.document.setFillColor(...COLORS.white);
    layout.document.setDrawColor(...COLORS.border);
    layout.document.rect(layout.margin, layout.y, layout.contentWidth, rowHeight, "FD");
    layout.document.setFont("helvetica", "normal");
    layout.document.setFontSize(7.5);
    layout.document.setTextColor(...COLORS.ink);
    let x = layout.margin + 3;
    wrappedValues.forEach((lines, index) => {
      layout.document.text(lines, x, layout.y + 5);
      x += layout.contentWidth * columns[index].width;
    });
    layout.y += rowHeight;
  });

  layout.y += 4;
}

function addPageChrome(layout: PdfLayout) {
  const { document } = layout;
  const pageCount = document.getNumberOfPages();

  for (let page = 1; page <= pageCount; page += 1) {
    document.setPage(page);
    document.setDrawColor(...COLORS.border);
    document.setLineWidth(0.4);
    document.line(PAGE_MARGIN, 22, layout.pageWidth - PAGE_MARGIN, 22);
    document.setFont("helvetica", "bold");
    document.setFontSize(7);
    document.setTextColor(...COLORS.purple);
    document.text("BARANGAY 176-E DRRMO", PAGE_MARGIN, 17);
    document.setFont("helvetica", "normal");
    document.setTextColor(...COLORS.muted);
    document.text("OPERATION LOG REPORT", layout.pageWidth - PAGE_MARGIN, 17, { align: "right" });
    document.line(PAGE_MARGIN, layout.pageHeight - 13, layout.pageWidth - PAGE_MARGIN, layout.pageHeight - 13);
    document.setFontSize(7);
    document.text("Generated from the operation records dashboard", PAGE_MARGIN, layout.pageHeight - 8);
    document.text(`Page ${page} of ${pageCount}`, layout.pageWidth - PAGE_MARGIN, layout.pageHeight - 8, { align: "right" });
  }
}

export function createOperationPdf(records: OperationRecord[]) {
  if (records.length === 0) return;

  const document = new jsPDF();
  const layout: PdfLayout = {
    document,
    pageWidth: document.internal.pageSize.getWidth(),
    pageHeight: document.internal.pageSize.getHeight(),
    margin: PAGE_MARGIN,
    contentWidth: document.internal.pageSize.getWidth() - PAGE_MARGIN * 2,
    y: TOP_CONTENT,
  };

  records.forEach((record, index) => {
    if (index > 0) {
      document.addPage();
      layout.y = TOP_CONTENT;
    }

    addText(layout, `OPERATION LOG  /  ${formatOperationId(record.operation_id)}`, {
      bold: true,
      size: 15,
      color: COLORS.purple,
    });
    addText(layout, record.nature_of_operation || "Operation report", { bold: true, size: 12 });
    addText(layout, `Submitted ${formatDateTime(record.operation_date)}`, {
      size: 8,
      color: COLORS.muted,
    });
    layout.y += 4;

    addSection(layout, "Operation details");
    addInfoCards(layout, [
      ["Caller", record.name_of_caller],
      ["Status", record.status],
      ["Team assigned", record.teamAssignments.map(({ team }) => team.team_name).join(", ") || record.team.team_name],
      ["Responders", record.responders.map(({ user }) => user.name).join(", ")],
      ["Submitted by", record.submitter?.name ?? record.submitter_name ?? "Unknown submitter"],
      ["Approved by", record.validator?.name],
    ]);

    addSection(layout, "Incident description");
    addParagraph(layout, record.event_description);

    addSection(layout, "People involved");
    addTable(layout, [
      { label: "Name", width: 0.29 },
      { label: "Age", width: 0.08 },
      { label: "Sex", width: 0.1 },
      { label: "Contact", width: 0.18 },
      { label: "Address", width: 0.35 },
    ], record.personsInvolved.length > 0
      ? record.personsInvolved.map((person) => [person.full_name, String(person.age), person.sex, person.contact_no || "-", formatPersonAddress(person)])
      : [["No people recorded", "", "", "", ""]]);

    addSection(layout, "Vehicle dispatch");
    if (record.dispatches.length === 0) addText(layout, "No vehicle dispatch recorded.", { color: COLORS.muted });
    record.dispatches.forEach((dispatch, dispatchIndex) => {
      addText(layout, `Dispatch ${dispatchIndex + 1}`, { bold: true, size: 8, color: COLORS.purple });
      addInfoCards(layout, [
        ["From", dispatch.from_location],
        ["To", dispatch.to_location],
        ["Vehicle", dispatch.vehicle ? `${dispatch.vehicle.vehicle_name} (${dispatch.vehicle.plate_number})` : "-"],
        ["Driver", dispatch.driver_name],
        ["Dispatch date", formatDate(dispatch.dispatch_date)],
        ["Departure", formatTime(dispatch.depart_time)],
        ["Arrival", formatTime(dispatch.arrival_time)],
        ["Odometer in", dispatch.odometer_in === null ? "-" : `${dispatch.odometer_in} km`],
        ["Odometer out", dispatch.odometer_out === null ? "-" : `${dispatch.odometer_out} km`],
      ]);
    });

    addSection(layout, "Inventory used");
    addTable(layout, [
      { label: "Item", width: 0.75 },
      { label: "Quantity", width: 0.25 },
    ], record.inventoryEntries.length > 0
      ? record.inventoryEntries.map((entry) => [entry.item_name, `${entry.quantity}${entry.unit ? ` ${entry.unit}` : ""}`])
      : [["No inventory recorded", ""]]);

    if (record.images.length > 0) {
      addText(layout, `${record.images.length} image attachment${record.images.length === 1 ? "" : "s"} on file.`, {
        size: 8,
        color: COLORS.muted,
      });
    }
  });

  addPageChrome(layout);
  document.save(`operation-logs-${formatDate(new Date(), "YYYY-MM-DD")}.pdf`);
}
