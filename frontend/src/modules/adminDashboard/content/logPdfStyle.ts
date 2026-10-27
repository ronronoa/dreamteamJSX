import type { jsPDF } from "jspdf";
import { loadLogoDataUrl } from "./reports/reportPrintsLayout";

const PAGE_MARGIN = 15;
const PURPLE: [number, number, number] = [91, 33, 182];
const MUTED: [number, number, number] = [107, 114, 128];
const LIGHT: [number, number, number] = [249, 250, 251];
const BORDER: [number, number, number] = [229, 231, 235];

export interface LogPdfHeaderDetails {
  category: string;
  reportNumber: string;
  reportDate: string;
  status: string;
}

export async function prepareLogPdfHeader(): Promise<string> {
  try {
    return await loadLogoDataUrl();
  } catch {
    return "";
  }
}

export function drawLogPdfHeader(document: jsPDF, logo: string, details: LogPdfHeaderDetails): number {
  const pageWidth = document.internal.pageSize.getWidth();
  const contentWidth = pageWidth - PAGE_MARGIN * 2;
  const headerY = 12;

  if (logo) document.addImage(logo, "PNG", pageWidth - PAGE_MARGIN - 15, headerY, 15, 15);

  document.setFont("helvetica", "normal");
  document.setFontSize(7);
  document.setTextColor(31, 41, 55);
  document.text("Republic of the Philippines", pageWidth / 2, headerY + 2, { align: "center" });
  document.text("National Capital Region • City of Caloocan", pageWidth / 2, headerY + 6, { align: "center" });
  document.setFont("helvetica", "bold");
  document.setFontSize(12);
  document.text("BARANGAY 176-E", pageWidth / 2, headerY + 11, { align: "center" });
  document.setFontSize(7);
  document.text("DISASTER RISK REDUCTION AND MANAGEMENT OFFICE", pageWidth / 2, headerY + 15, { align: "center" });

  const stripeY = 32;
  document.setFillColor(...PURPLE);
  document.rect(PAGE_MARGIN, stripeY, contentWidth / 3, 1.5, "F");
  document.setFillColor(16, 185, 129);
  document.rect(PAGE_MARGIN + contentWidth / 3, stripeY, contentWidth / 3, 1.5, "F");
  document.setFillColor(245, 158, 11);
  document.rect(PAGE_MARGIN + (contentWidth * 2) / 3, stripeY, contentWidth / 3, 1.5, "F");

  const titleY = 37;
  document.setFillColor(...LIGHT);
  document.rect(PAGE_MARGIN, titleY, contentWidth, 16, "F");
  document.setFillColor(...PURPLE);
  document.rect(PAGE_MARGIN, titleY, 1.5, 16, "F");
  document.setFont("helvetica", "bold");
  document.setFontSize(11);
  document.setTextColor(...PURPLE);
  document.text(details.category, PAGE_MARGIN + 5, titleY + 6);
  document.setFont("helvetica", "normal");
  document.setFontSize(7);
  document.setTextColor(...MUTED);
  document.text(`REPORT NO. ${details.reportNumber}`, PAGE_MARGIN + 5, titleY + 12);

  const metadataY = 57;
  document.setFillColor(...LIGHT);
  document.rect(PAGE_MARGIN, metadataY, contentWidth, 12, "F");
  const fields = [
    ["REPORT DATE", details.reportDate],
    ["STATUS", details.status.replaceAll("_", " ")],
    ["GENERATED", new Date().toLocaleDateString()],
  ];
  const fieldWidth = contentWidth / fields.length;
  fields.forEach(([label, value], index) => {
    const x = PAGE_MARGIN + fieldWidth * index;
    document.setFont("helvetica", "bold");
    document.setFontSize(6);
    document.setTextColor(...MUTED);
    document.text(label, x + 3, metadataY + 4);
    document.setFontSize(7);
    document.setTextColor(31, 41, 55);
    document.text(document.splitTextToSize(value, fieldWidth - 6)[0] ?? "—", x + 3, metadataY + 9);
    if (index > 0) {
      document.setDrawColor(...BORDER);
      document.line(x, metadataY + 2, x, metadataY + 10);
    }
  });
  return 75;
}

export function drawLogSection(document: jsPDF, title: string, x: number, y: number, width: number): void {
  document.setFillColor(...LIGHT);
  document.setDrawColor(...BORDER);
  document.rect(x, y, width, 8, "FD");
  document.setFillColor(...PURPLE);
  document.rect(x, y, 1, 8, "F");
  document.setFont("helvetica", "bold");
  document.setFontSize(7);
  document.setTextColor(...PURPLE);
  document.text(title.toUpperCase(), x + 3, y + 5.2);
}

export function drawLogInfoCards(
  document: jsPDF,
  fields: Array<[string, unknown]>,
  startY: number,
  columns = 2,
): number {
  const pageWidth = document.internal.pageSize.getWidth();
  const contentWidth = pageWidth - PAGE_MARGIN * 2;
  const gap = 3;
  const cardWidth = (contentWidth - gap * (columns - 1)) / columns;
  let y = startY;

  for (let index = 0; index < fields.length; index += columns) {
    const row = fields.slice(index, index + columns);
    const values = row.map(([label, rawValue]) => {
      const value = rawValue === null || rawValue === undefined || String(rawValue).trim() === ""
        ? "—"
        : String(rawValue);
      const lines = document.splitTextToSize(value, cardWidth - 6);
      return { label, lines };
    });
    const cardHeight = Math.max(15, ...values.map(({ lines }) => 8 + lines.length * 3.5));

    values.forEach((field, columnIndex) => {
      const x = PAGE_MARGIN + columnIndex * (cardWidth + gap);
      document.setFillColor(255, 255, 255);
      document.setDrawColor(...BORDER);
      document.roundedRect(x, y, cardWidth, cardHeight, 1, 1, "FD");
      document.setFont("helvetica", "bold");
      document.setFontSize(5.5);
      document.setTextColor(...MUTED);
      document.text(field.label.toUpperCase(), x + 3, y + 4);
      document.setFont("helvetica", "normal");
      document.setFontSize(7);
      document.setTextColor(31, 41, 55);
      document.text(field.lines, x + 3, y + 9);
    });
    y += cardHeight + 2;
  }
  return y;
}

export function drawLogParagraph(document: jsPDF, value: unknown, y: number): number {
  const pageWidth = document.internal.pageSize.getWidth();
  const contentWidth = pageWidth - PAGE_MARGIN * 2;
  const text = value === null || value === undefined || String(value).trim() === "" ? "—" : String(value);
  const lines = document.splitTextToSize(text, contentWidth - 8);
  const boxHeight = Math.max(15, lines.length * 3.5 + 8);
  document.setFillColor(255, 255, 255);
  document.setDrawColor(...BORDER);
  document.roundedRect(PAGE_MARGIN, y, contentWidth, boxHeight, 1, 1, "FD");
  document.setFont("helvetica", "normal");
  document.setFontSize(7);
  document.setTextColor(31, 41, 55);
  document.text(lines, PAGE_MARGIN + 4, y + 6);
  return y + boxHeight + 3;
}

export function drawLogTable(
  document: jsPDF,
  columns: Array<{ label: string; width: number }>,
  rows: string[][],
  startY: number,
): number {
  const pageWidth = document.internal.pageSize.getWidth();
  const contentWidth = pageWidth - PAGE_MARGIN * 2;
  const headerHeight = 8;
  let y = startY;
  document.setFillColor(...PURPLE);
  document.rect(PAGE_MARGIN, y, contentWidth, headerHeight, "F");
  document.setFont("helvetica", "bold");
  document.setFontSize(6);
  document.setTextColor(255, 255, 255);
  let x = PAGE_MARGIN + 3;
  columns.forEach((column) => {
    document.text(column.label, x, y + 5);
    x += contentWidth * column.width;
  });
  y += headerHeight;

  rows.forEach((row) => {
    const cells = row.map((value, index) => document.splitTextToSize(value || "—", contentWidth * columns[index].width - 6));
    const rowHeight = Math.max(8, ...cells.map((lines) => lines.length * 3.5 + 4));
    document.setFillColor(255, 255, 255);
    document.setDrawColor(...BORDER);
    document.rect(PAGE_MARGIN, y, contentWidth, rowHeight, "FD");
    document.setFont("helvetica", "normal");
    document.setFontSize(6.5);
    document.setTextColor(31, 41, 55);
    let cellX = PAGE_MARGIN + 3;
    cells.forEach((lines, index) => {
      document.text(lines, cellX, y + 5);
      cellX += contentWidth * columns[index].width;
    });
    y += rowHeight;
  });
  return y + 3;
}

export function drawLogFooter(document: jsPDF, title: string): void {
  const pageCount = document.getNumberOfPages();
  const pageWidth = document.internal.pageSize.getWidth();
  const pageHeight = document.internal.pageSize.getHeight();
  for (let page = 1; page <= pageCount; page += 1) {
    document.setPage(page);
    document.setDrawColor(...BORDER);
    document.line(PAGE_MARGIN, pageHeight - 13, pageWidth - PAGE_MARGIN, pageHeight - 13);
    document.setFont("helvetica", "normal");
    document.setFontSize(7);
    document.setTextColor(...MUTED);
    document.text(`${title} • Official record`, PAGE_MARGIN, pageHeight - 8);
    document.text(`Page ${page} of ${pageCount}`, pageWidth - PAGE_MARGIN, pageHeight - 8, { align: "right" });
  }
}
