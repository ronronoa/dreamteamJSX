import { jsPDF } from "jspdf";
import type { InventoryRecord, InventoryTransactionRecord } from "@/api/inventory";
import type { WorkspaceSettings } from "@/api/settings";
import { loadLogoDataUrl } from "./reportPrintsLayout";

const COLORS = {
  purple: [46, 26, 71] as [number, number, number],
  red: [153, 27, 27] as [number, number, number],
  brown: [120, 53, 15] as [number, number, number],
  ink: [31, 41, 55] as [number, number, number],
  muted: [107, 114, 128] as [number, number, number],
  border: [229, 231, 235] as [number, number, number],
  bgLight: [249, 250, 251] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  redText: [185, 28, 28] as [number, number, number],
};

const MARGIN = 15;
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const PAGE_BOTTOM_MARGIN = 15;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

function setFont(doc: jsPDF, style: "normal" | "bold" | "italic", size: number, color = COLORS.ink) {
  doc.setFont("helvetica", style);
  doc.setFontSize(size);
  doc.setTextColor(...color);
}

// Custom table drawer with header color and background stripes
function drawInventoryTable(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  headers: string[],
  colWidths: number[],
  rows: string[][],
  headerColor: [number, number, number],
  rowBgColors?: [number, number, number][],
  customTextColors?: Record<string, [number, number, number]> // maps "row-col" to color
) {
  const rowHeight = 7;
  const headerHeight = 7;
  let cy = y;

  function drawHeader() {
    doc.setFillColor(...headerColor);
    doc.rect(x, cy, width, headerHeight, "F");
    setFont(doc, "bold", 7, COLORS.white);
    let headerX = x;
    headers.forEach((header, index) => {
      doc.text(header, headerX + 2, cy + 4.5);
      headerX += colWidths[index];
    });
    cy += headerHeight;
  }

  if (cy + headerHeight + rowHeight > PAGE_HEIGHT - PAGE_BOTTOM_MARGIN) {
    doc.addPage();
    cy = MARGIN;
  }
  drawHeader();

  // Rows
  rows.forEach((row, rowIndex) => {
    if (cy + rowHeight > PAGE_HEIGHT - PAGE_BOTTOM_MARGIN) {
      doc.addPage();
      cy = MARGIN;
      drawHeader();
    }

    if (rowBgColors && rowBgColors[rowIndex]) {
      doc.setFillColor(...rowBgColors[rowIndex]);
      doc.rect(x, cy, width, rowHeight, "F");
    }
    
    setFont(doc, "bold", 7, COLORS.ink);
    let cx = x;
    row.forEach((cell, colIndex) => {
      const key = `${rowIndex}-${colIndex}`;
      if (customTextColors && customTextColors[key]) {
        setFont(doc, "bold", 7, customTextColors[key]);
      } else {
        setFont(doc, "normal", 7, COLORS.ink);
      }
      doc.text(cell, cx + 2, cy + 4.5);
      cx += colWidths[colIndex];
    });
    
    cy += rowHeight;
    doc.setDrawColor(...COLORS.border);
    doc.setLineWidth(0.2);
    doc.line(x, cy, x + width, cy);
  });
  
  return cy;
}

export async function createInventoryAuditPdf(
  items: InventoryRecord[],
  transactions: InventoryTransactionRecord[],
  generatedBy: string,
  workspace: WorkspaceSettings,
) {
  const doc = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
  const logoDataUrl = await loadLogoDataUrl();
  let y = 15;
  const generatedAt = new Date();
  const itemById = new Map(items.map((item) => [item.itemId, item]));
  const stockOutTransactions = transactions
    .filter((transaction) => transaction.transaction_type === "STOCK_OUT")
    .sort((first, second) => new Date(second.transaction_date).getTime() - new Date(first.transaction_date).getTime());
  const datedTransactions = transactions
    .map((transaction) => new Date(transaction.transaction_date))
    .filter((date) => !Number.isNaN(date.getTime()));
  const reportingPeriod = getReportingPeriod(datedTransactions);
  const reportControlNumber = `INV-REP-${formatCompactDate(generatedAt)}`;

  // 1. Header
  setFont(doc, "normal", 9, COLORS.ink);
  doc.text("Republic of the Philippines", PAGE_WIDTH / 2, y, { align: "center" });
  doc.text("National Capital Region", PAGE_WIDTH / 2, y + 4, { align: "center" });
  doc.text("City of Caloocan", PAGE_WIDTH / 2, y + 8, { align: "center" });
  
  setFont(doc, "bold", 12, COLORS.ink);
  doc.text("BARANGAY 176-E", PAGE_WIDTH / 2, y + 13, { align: "center" });

  doc.addImage(logoDataUrl, "PNG", PAGE_WIDTH - MARGIN - 14, y, 14, 14);

  y += 18;

  // Colored Bar
  doc.setFillColor(16, 185, 129); // Green
  doc.rect(MARGIN, y, CONTENT_WIDTH * 0.33, 1.5, "F");
  doc.setFillColor(...COLORS.purple);
  doc.rect(MARGIN + CONTENT_WIDTH * 0.33, y, CONTENT_WIDTH * 0.33, 1.5, "F");
  doc.setFillColor(245, 158, 11); // Orange
  doc.rect(MARGIN + CONTENT_WIDTH * 0.66, y, CONTENT_WIDTH * 0.34, 1.5, "F");

  y += 10;

  // Subtitles
  setFont(doc, "bold", 9, COLORS.ink);
  doc.text(fitInventoryText(doc, workspace.officeName.toUpperCase(), CONTENT_WIDTH), PAGE_WIDTH / 2, y, { align: "center" });
  doc.text("BARANGAY EMERGENCY RESPONSE TEAM (BHERT)", PAGE_WIDTH / 2, y + 4, { align: "center" });
  setFont(doc, "normal", 7, COLORS.muted);
  doc.text(`Office hotline: ${workspace.officeHotline}`, PAGE_WIDTH / 2, y + 8, { align: "center" });

  y += 16;

  // Title
  setFont(doc, "bold", 14, COLORS.ink);
  doc.text("INVENTORY DISPOSITION & AUDIT REPORT", PAGE_WIDTH / 2, y, { align: "center" });
  setFont(doc, "normal", 8, COLORS.muted);
  doc.text(`${fitInventoryText(doc, workspace.systemName.toUpperCase(), CONTENT_WIDTH)} — OFFICIAL AUDIT`, PAGE_WIDTH / 2, y + 5, { align: "center" });

  y += 10;

  // Meta Box
  doc.setDrawColor(...COLORS.border);
  doc.setLineWidth(0.3);
  doc.rect(MARGIN, y, CONTENT_WIDTH, 14, "D");
  
  const half = CONTENT_WIDTH / 2;
  // Vertical line
  doc.line(MARGIN + half, y, MARGIN + half, y + 14);
  // Horizontal line
  doc.line(MARGIN, y + 7, MARGIN + CONTENT_WIDTH, y + 7);

  // Meta Text
  setFont(doc, "bold", 7, COLORS.ink);
  doc.text("Report Control No.:", MARGIN + 3, y + 4.5);
  setFont(doc, "normal", 7, COLORS.muted);
   doc.text(reportControlNumber, MARGIN + 30, y + 4.5);

  setFont(doc, "bold", 7, COLORS.ink);
  doc.text("Coverage Period:", MARGIN + half + 3, y + 4.5);
  setFont(doc, "normal", 7, COLORS.muted);
   doc.text(reportingPeriod, MARGIN + half + 30, y + 4.5);

  setFont(doc, "bold", 7, COLORS.ink);
  doc.text("Date Generated:", MARGIN + 3, y + 11.5);
  setFont(doc, "normal", 7, COLORS.muted);
   doc.text(formatGeneratedDate(generatedAt), MARGIN + 30, y + 11.5);

  setFont(doc, "bold", 7, COLORS.ink);
  doc.text("Prepared By:", MARGIN + half + 3, y + 11.5);
  setFont(doc, "normal", 7, COLORS.muted);
   doc.text(generatedBy, MARGIN + half + 30, y + 11.5);

  y += 22;

  // SECTION I
  setFont(doc, "bold", 9, COLORS.ink);
  doc.text("SECTION I: STOCKS & SUPPLIES CONSUMED DURING OPERATIONS", MARGIN, y);
  setFont(doc, "normal", 7, COLORS.muted);
  doc.text("The following medical and emergency logistics items were disbursed and utilized during patient dispatch and disaster response operations during the", MARGIN, y + 4);
  doc.text("reporting period:", MARGIN, y + 7);

  y += 12;

  const section1Headers = ["ITEM ID", "ITEM NAME", "CATEGORY", "QTY USED", "DISPATCH / LOG NO."];
  const section1Widths = [25, 55, 40, 30, CONTENT_WIDTH - 150];
  const section1Rows = stockOutTransactions.map((transaction) => {
    const item = itemById.get(transaction.item_id);
    return [
      item?.id ?? "—",
      item?.item ?? "Unknown item",
      item?.category ?? "—",
      `${transaction.quantity} ${item?.unit ?? ""}`.trim(),
      getTransactionReference(transaction),
    ];
  });
  if (section1Rows.length === 0) {
    section1Rows.push(["—", "No stock-out transactions recorded", "—", "—", "—"]);
  }

  y = drawInventoryTable(doc, MARGIN, y, CONTENT_WIDTH, section1Headers, section1Widths, section1Rows, COLORS.purple);
  
  y += 15;
  y = ensurePageSpace(doc, y, 25);

  // SECTION II
  setFont(doc, "bold", 9, COLORS.ink);
  doc.text("SECTION II: LOW STOCK ALERTS & OUT-OF-STOCK INCIDENTS", MARGIN, y);
  setFont(doc, "normal", 7, COLORS.muted);
  doc.text("Items below safety thresholds or currently out of stock requiring immediate procurement replenishment:", MARGIN, y + 4);

  y += 10;

  const section2Headers = ["ITEM ID", "ITEM NAME", "CURRENT", "MIN LEVEL", "LAST UPDATED"];
  const section2Widths = [25, 60, 35, 35, CONTENT_WIDTH - 155];
  const section2Items = items.filter((item) => item.quantity <= item.minimum);
  const section2Rows = section2Items.map((item) => [
    item.id,
    item.item,
    `${item.quantity} ${item.unit}`,
    `${item.minimum} ${item.unit}`,
    `${formatInventoryDate(item.updatedAt)} (${item.quantity === 0 ? "Out" : "Low"})`,
  ]);
  if (section2Rows.length === 0) {
    section2Rows.push(["—", "No low-stock items", "—", "—", "—"]);
  }
  
  const rowBg = section2Items.map(() => [254, 242, 242] as [number, number, number]);
  const customColors = Object.fromEntries(section2Items.map((_, index) => [`${index}-2`, COLORS.redText]));

  y = drawInventoryTable(doc, MARGIN, y, CONTENT_WIDTH, section2Headers, section2Widths, section2Rows, COLORS.red, rowBg, customColors);

  y += 15;
  y = ensurePageSpace(doc, y, 25);

  // SECTION III
  setFont(doc, "bold", 9, COLORS.ink);
  doc.text("SECTION III: EXPIRY MONITORING & QUALITY ASSURANCE SCHEDULE", MARGIN, y);
  setFont(doc, "normal", 7, COLORS.muted);
  doc.text("Inventory items with recorded expiry dates and their remaining shelf life:", MARGIN, y + 4);

  y += 10;

  const section3Headers = ["ITEM ID", "ITEM NAME", "EXPIRY / AUDIT", "TIME REMAINING"];
  const section3Widths = [25, 75, 40, CONTENT_WIDTH - 140];
  const section3Rows = items
    .filter((item) => item.expiry)
    .map((item) => [
      item.id,
      item.item,
      formatInventoryDate(item.expiry!),
      getTimeUntilExpiry(item.expiry!),
    ]);
  if (section3Rows.length === 0) {
    section3Rows.push(["—", "No expiry dates recorded", "—", "—"]);
  }
  
  const rowBg3 = section3Rows.map(() => [255, 251, 235] as [number, number, number]);

  y = drawInventoryTable(doc, MARGIN, y, CONTENT_WIDTH, section3Headers, section3Widths, section3Rows, COLORS.brown, rowBg3);

  y += 25;
  y = ensurePageSpace(doc, y, 32);

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

  doc.save(`Inventory_Audit_Report_${formatCompactDate(generatedAt)}.pdf`);
}

function getTransactionReference(transaction: InventoryTransactionRecord): string {
  const reportId = transaction.reason?.match(/[0-9a-f]{8}-[0-9a-f-]{27}/i)?.[0];
  if (reportId) return reportId.slice(0, 8).toUpperCase();
  return transaction.reason?.slice(0, 24) || transaction.transaction_id.slice(0, 8).toUpperCase();
}

function fitInventoryText(doc: jsPDF, text: string, maximumWidth: number): string {
  let fittedText = text.trim();
  while (fittedText.length > 0 && doc.getTextWidth(fittedText) > maximumWidth) {
    fittedText = fittedText.slice(0, -1);
  }
  if (fittedText === text.trim()) return fittedText;
  return `${fittedText.slice(0, -1).trimEnd()}…`;
}

function ensurePageSpace(doc: jsPDF, currentY: number, requiredHeight: number): number {
  if (currentY + requiredHeight <= PAGE_HEIGHT - PAGE_BOTTOM_MARGIN) return currentY;

  doc.addPage();
  return MARGIN;
}

function getReportingPeriod(dates: Date[]): string {
  if (dates.length === 0) return "No recorded stock movements";

  const earliest = new Date(Math.min(...dates.map((date) => date.getTime())));
  const latest = new Date(Math.max(...dates.map((date) => date.getTime())));
  return `${formatInventoryDate(earliest)} – ${formatInventoryDate(latest)}`;
}

function formatInventoryDate(value: Date | string): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function formatGeneratedDate(date: Date): string {
  return date.toLocaleString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatCompactDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}${month}${day}-${hours}${minutes}`;
}

function getTimeUntilExpiry(expiryDate: Date): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);
  const daysRemaining = Math.ceil((expiry.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));

  if (daysRemaining < 0) return "Expired";
  if (daysRemaining === 0) return "Expires today";
  return `${daysRemaining} Days`;
}
