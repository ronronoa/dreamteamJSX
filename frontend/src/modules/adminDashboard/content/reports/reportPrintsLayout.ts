import { jsPDF } from "jspdf";

// --- Types & Constants ---
const COLORS = {
  purple: [91, 33, 182] as [number, number, number], // #5b21b6
  darkPurple: [76, 29, 149] as [number, number, number],
  ink: [31, 41, 55] as [number, number, number],
  muted: [107, 114, 128] as [number, number, number],
  border: [229, 231, 235] as [number, number, number],
  bgLight: [249, 250, 251] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  greenText: [22, 101, 52] as [number, number, number],
  greenBg: [220, 252, 231] as [number, number, number],
};

const M = 15; // Page margin
const W = 210; // A4 Width in mm
const CONTENT_W = W - M * 2;
const REGISTRATION_ROW_HEIGHT = 6.5;

// --- Helper Functions ---
function setFont(doc: jsPDF, style: "normal" | "bold", size: number, color = COLORS.ink) {
  doc.setFont("helvetica", style);
  doc.setFontSize(size);
  doc.setTextColor(...color);
}

function drawSectionHeader(doc: jsPDF, x: number, y: number, w: number, title: string, rightText?: string) {
  doc.setDrawColor(...COLORS.border);
  doc.setLineWidth(0.3);
  doc.line(x, y, x + w, y);
  
  setFont(doc, "bold", 8, COLORS.purple);
  doc.text(title.toUpperCase(), x + 2, y + 4);
  
  if (rightText) {
    setFont(doc, "normal", 7, COLORS.muted);
    doc.text(rightText, x + w - 2, y + 4, { align: "right" });
  }
  return y + 7;
}

function drawTable(doc: jsPDF, x: number, y: number, w: number, cols: { label: string, width: number, align?: "left"|"right"|"center" }[], rows: string[][], footerRow?: string[]) {
  const rowHeight = 6;
  let cy = y;

  // Header
  setFont(doc, "normal", 7, COLORS.muted);
  let cx = x;
  cols.forEach(col => {
    const align = col.align || "left";
    let textX = cx + (align === "right" ? col.width - 2 : align === "center" ? col.width / 2 : 2);
    doc.text(col.label.toUpperCase(), textX, cy + 4, { align });
    cx += col.width;
  });
  cy += rowHeight;
  doc.line(x, cy, x + w, cy);

  // Rows
  rows.forEach((row, i) => {
    setFont(doc, "normal", 8, COLORS.ink);
    cx = x;
    row.forEach((cell, j) => {
      const col = cols[j];
      const align = col.align || "left";
      let textX = cx + (align === "right" ? col.width - 2 : align === "center" ? col.width / 2 : 2);
      
      if (i === rows.length - 1 && !footerRow) setFont(doc, "bold", 8, COLORS.ink);
      
      doc.text(cell, textX, cy + 4, { align });
      cx += col.width;
    });
    cy += rowHeight;
    doc.setDrawColor(240, 240, 240);
    doc.line(x, cy, x + w, cy);
  });

  // Footer
  if (footerRow) {
    setFont(doc, "bold", 8, COLORS.ink);
    cx = x;
    footerRow.forEach((cell, j) => {
      const col = cols[j];
      const align = col.align || "left";
      let textX = cx + (align === "right" ? col.width - 2 : align === "center" ? col.width / 2 : 2);
      doc.text(cell, textX, cy + 4, { align });
      cx += col.width;
    });
    cy += rowHeight;
  }

  return cy;
}

// --- Main Generator ---
export function createDashboardReportPdf() {
  const doc = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
  let y = 15;
  const generatedAt = new Date();
  const generatedDate = generatedAt.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  const fileDate = [
    generatedAt.getFullYear(),
    String(generatedAt.getMonth() + 1).padStart(2, "0"),
    String(generatedAt.getDate()).padStart(2, "0"),
  ].join("-");

  // 1. Header / Logos
  // Placeholder logos
  doc.setDrawColor(...COLORS.purple);
  doc.setLineWidth(0.5);
  doc.circle(M + 5, y + 8, 7);
  doc.circle(W - M - 5, y + 8, 7);

  setFont(doc, "normal", 8, COLORS.ink);
  doc.text("Republic of the Philippines", W / 2, y, { align: "center" });
  doc.text("National Capital Region • City of Caloocan", W / 2, y + 4, { align: "center" });
  
  setFont(doc, "bold", 14, COLORS.ink);
  doc.text("BARANGAY 176-E", W / 2, y + 10, { align: "center" });
  
  setFont(doc, "bold", 8, COLORS.ink);
  doc.text("BARANGAY DISASTER RISK REDUCTION AND MANAGEMENT OFFICE (DRRMO)", W / 2, y + 15, { align: "center" });
  doc.text("BARANGAY EMERGENCY RESPONSE TEAM (BHERT)", W / 2, y + 19, { align: "center" });

  y += 25;

  // 2. Gradient Line
  doc.setFillColor(...COLORS.purple); doc.rect(M, y, CONTENT_W * 0.33, 1.5, "F");
  doc.setFillColor(16, 185, 129); doc.rect(M + CONTENT_W * 0.33, y, CONTENT_W * 0.33, 1.5, "F"); // Green
  doc.setFillColor(245, 158, 11); doc.rect(M + CONTENT_W * 0.66, y, CONTENT_W * 0.34, 1.5, "F"); // Yellow
  
  y += 6;

  // 3. Title Box
  doc.setFillColor(...COLORS.bgLight);
  doc.rect(M, y, CONTENT_W, 15, "F");
  doc.setFillColor(...COLORS.purple);
  doc.rect(M, y, 1.5, 15, "F");

  setFont(doc, "bold", 12, COLORS.purple);
  doc.text("OPERATION LOG REPORT", M + 6, y + 6);
  setFont(doc, "normal", 7, COLORS.muted);
  doc.text("Summary of prevention, preparedness, response and recovery operations recorded and validated", M + 6, y + 11);

  // Right side of Title Box
  setFont(doc, "bold", 6, COLORS.muted);
  doc.text("OPERATION LOGISTICS MANAGEMENT SYSTEM", M + CONTENT_W - 4, y + 5, { align: "right" });
  setFont(doc, "bold", 7, COLORS.purple);
  doc.text("SAMPLE LAYOUT PREVIEW", M + CONTENT_W - 4, y + 10, { align: "right" });

  y += 20;

  // 4. Meta Bar
  doc.setFillColor(...COLORS.bgLight);
  doc.rect(M, y, CONTENT_W, 12, "F");
  
  const metaFields = [
    { label: "REPORT NO.", val: "OLR-2026-0824-01" },
    { label: "REPORTING PERIOD", val: "01 Aug 2026 – 24 Aug 2026" },
    { label: "DATE GENERATED", val: generatedDate },
    { label: "GENERATED BY", val: "Report Preview" }
  ];

  const metaWidth = CONTENT_W / 4;
  metaFields.forEach((f, i) => {
    const mx = M + (i * metaWidth);
    setFont(doc, "bold", 6, COLORS.muted);
    doc.text(f.label, mx + 3, y + 4);
    setFont(doc, "bold", 7, COLORS.ink);
    doc.text(f.val, mx + 3, y + 8);
    if (i > 0) {
      doc.setDrawColor(...COLORS.border);
      doc.line(mx, y + 2, mx, y + 10);
    }
  });

  y += 18;

  // 5. Tables Section (Left & Right)
  const halfW = (CONTENT_W - 5) / 2;

  // Left: Operations by Type
  drawSectionHeader(doc, M, y, halfW, "OPERATIONS BY TYPE", "TOTAL LOGS: 37");
  drawTable(doc, M, y + 7, halfW, [
    { label: "TYPE OF OPERATION", width: halfW * 0.45 },
    { label: "LOGS", width: halfW * 0.15, align: "right" },
    { label: "SHARE", width: halfW * 0.15, align: "right" },
    { label: "AVG. RESPONSE", width: halfW * 0.25, align: "right" }
  ], [
    ["Prevention and Mitigation", "14", "37.8%", "34:15 min"],
    ["Response", "11", "29.7%", "22:10 min"],
    ["Preparedness", "8", "21.6%", "33:45 min"],
    ["Recovery and Rehabilitation", "4", "10.8%", "37:30 min"],
  ], ["Total / Average", "37", "100.0%", "30:54 min"]);

  // Right: Operations by Area
  const rx = M + halfW + 5;
  drawSectionHeader(doc, rx, y, halfW, "OPERATIONS BY AREA", "BARANGAY PACKAGES");
  drawTable(doc, rx, y + 7, halfW, [
    { label: "LOCATION / AREA", width: halfW * 0.5 },
    { label: "LOGS RECORDED", width: halfW * 0.25, align: "right" },
    { label: "SHARE (%)", width: halfW * 0.25, align: "right" }
  ], [
    ["Package 3", "12", "32.4%"],
    ["Package 1", "8", "21.6%"],
    ["Package 2", "7", "18.9%"],
    ["Package 4", "6", "16.2%"],
    ["Package 5", "4", "10.8%"],
  ]);

  y += 52;

  // 6. Tables Section (Middle)
  // Left: Response Team Performance
  drawSectionHeader(doc, M, y, halfW, "RESPONSE TEAM PERFORMANCE");
  drawTable(doc, M, y + 7, halfW, [
    { label: "RESPONSE TEAM", width: halfW * 0.35 },
    { label: "OPERATIONS", width: halfW * 0.2, align: "right" },
    { label: "SHARE", width: halfW * 0.2, align: "right" },
    { label: "AVG. RESPONSE", width: halfW * 0.25, align: "right" }
  ], [
    ["Alpha Team", "15", "40.5%", "29:50 min"],
    ["Bravo Team", "12", "32.4%", "31:30 min"],
    ["Charlie Team", "10", "27.0%", "31:45 min"],
  ]);

  // Right: Validation Summary
  drawSectionHeader(doc, rx, y, halfW, "VALIDATION SUMMARY");
  const valY = y + 7;
  doc.setFillColor(...COLORS.bgLight);
  doc.rect(rx, valY, halfW, 32, "F");

  const valItems = [
    { label: "Total Validated Logs", val: "37 of 37", color: true },
    { label: "Authorized by Team Leader (Admin Review)", val: "28", color: false },
    { label: "Authorized by Dept. Head / Deputy (Auto)", val: "9", color: false },
    { label: "Edited by Admin Before Validation", val: "3", color: false },
    { label: "Logs with Scene Images Attached", val: "29", color: false },
  ];

  let vy = valY + 6;
  valItems.forEach(item => {
    setFont(doc, "normal", 8, COLORS.ink);
    doc.text(item.label, rx + 3, vy);
    if (item.color) setFont(doc, "bold", 8, COLORS.greenText);
    else setFont(doc, "bold", 8, COLORS.ink);
    doc.text(item.val, rx + halfW - 3, vy, { align: "right" });
    vy += 6;
  });

  y += 40;

  // 7. Full Width Register Table
  // Header Bar
  doc.setFillColor(...COLORS.darkPurple);
  doc.rect(M, y, CONTENT_W, 10, "F");
  setFont(doc, "bold", 9, COLORS.white);
  doc.text("OPERATION LOG REGISTER (LATEST ENTRIES)", M + 3, y + 6);
  setFont(doc, "normal", 7, [200, 200, 255]);
  doc.text("Showing 6 of 37 records", M + CONTENT_W - 3, y + 6, { align: "right" });

  y += 10;

  // Table Headers
  doc.setDrawColor(...COLORS.border);
  doc.line(M, y, M + CONTENT_W, y);
  setFont(doc, "bold", 7, COLORS.purple);
  const regCols = [
    { label: "LOG NO.", w: 21 },
    { label: "DATE", w: 15 },
    { label: "TYPE OF OPERATION", w: 31 },
    { label: "DESCRIPTION", w: 47 },
    { label: "AREA", w: 18 },
    { label: "TEAM", w: 14 },
    { label: "RESPONSE", w: 15 },
    { label: "STATUS", w: 19 },
  ];
  let cx = M;
  regCols.forEach(c => {
    doc.text(c.label, cx, y + 6);
    cx += c.w;
  });
  y += 8;
  doc.line(M, y, M + CONTENT_W, y);

  // Table Rows
  const regData = [
    ["OL-2026-0067", "24 Aug", "Prevention", "Drain clearing, main road", "Package 3", "Alpha", "28:40", "Validated"],
    ["OL-2026-0066", "22 Aug", "Response", "Flash-flood aid; 6 families evacuated", "Package 1", "Bravo", "19:05", "Validated"],
    ["OL-2026-0065", "21 Aug", "Preparedness", "Earthquake drill and equipment check", "Package 3", "Alpha", "35:10", "Validated"],
    ["OL-2026-0064", "20 Aug", "Response", "Residential fire; area secured", "Package 2", "Charlie", "17:25", "Validated"],
    ["OL-2026-0063", "18 Aug", "Prevention", "Tree trimming near power lines", "Package 4", "Charlie", "41:30", "Validated"],
    ["OL-2026-0062", "17 Aug", "Recovery", "Debris clearing after strong winds", "Package 1", "Bravo", "33:50", "Validated"],
  ];

  regData.forEach((row) => {
    const rowY = y + 4.5;
    let cellX = M;

    setFont(doc, "bold", 7, COLORS.purple);
    doc.text(row[0], cellX + 1, rowY);
    cellX += regCols[0].w;

    for (let i = 1; i < row.length - 1; i += 1) {
      const column = regCols[i];
      setFont(doc, "normal", 6.5, COLORS.ink);
      const text = fitSingleLine(doc, row[i], column.w - 2);
      doc.text(text, cellX + 1, rowY);
      cellX += column.w;
    }

    const statusColumn = regCols[regCols.length - 1];
    const badgeWidth = statusColumn.w - 2;
    doc.setFillColor(...COLORS.greenBg);
    doc.roundedRect(cellX + 1, rowY - 3.5, badgeWidth, 5, 2, 2, "F");
    setFont(doc, "bold", 6, COLORS.greenText);
    doc.text("Validated", cellX + 1 + badgeWidth / 2, rowY, { align: "center" });

    y += REGISTRATION_ROW_HEIGHT;
    doc.setDrawColor(245, 245, 245);
    doc.line(M, y, M + CONTENT_W, y);
  });

  y += 5;

  // 8. Remarks Box
  doc.setFillColor(...COLORS.bgLight);
  doc.rect(M, y, CONTENT_W, 12, "F");
  doc.setFillColor(...COLORS.darkPurple);
  doc.rect(M, y, 1, 12, "F");
  setFont(doc, "bold", 7, COLORS.ink);
  doc.text("Remarks:", M + 4, y + 5);
  setFont(doc, "normal", 7, COLORS.muted);
  const remarks = doc.splitTextToSize(
    "Response time runs from call receipt to arrival. Only validated logs are included. Administrator-edited logs are identified in the source system.",
    CONTENT_W - 22,
  );
  doc.setFontSize(6.5);
  doc.text(remarks, M + 18, y + 5);

  y += 14;

  // 9. Signatures
  const sigW = 70;
  // Left
  doc.setDrawColor(...COLORS.ink);
  doc.line(M + 5, y + 8, M + 5 + sigW, y + 8);
  setFont(doc, "bold", 8, COLORS.purple);
  doc.text("MICHAEL L. SORIANO", M + 5 + (sigW/2), y + 13, { align: "center" });
  setFont(doc, "normal", 7, COLORS.ink);
  doc.text("Department Head, DRRMO / BHERT", M + 5 + (sigW/2), y + 17, { align: "center" });
  doc.text("Operation Logistics Management System", M + 5 + (sigW/2), y + 21, { align: "center" });

  // Right
  const rxSig = W - M - sigW - 5;
  doc.line(rxSig, y + 8, rxSig + sigW, y + 8);
  setFont(doc, "bold", 8, COLORS.ink);
  doc.text("HON. DHAREL D. CUNTAPAY", rxSig + (sigW/2), y + 13, { align: "center" });
  setFont(doc, "normal", 7, COLORS.ink);
  doc.text("Punong Barangay, Barangay 176-E", rxSig + (sigW/2), y + 17, { align: "center" });
  doc.text("Barangay Chairman / Approving Authority", rxSig + (sigW/2), y + 21, { align: "center" });

  doc.save(`operation-log-report-preview-${fileDate}.pdf`);
}

function fitSingleLine(doc: jsPDF, value: string, maxWidth: number): string {
  if (doc.getTextWidth(value) <= maxWidth) return value;

  let shortenedValue = value;
  while (shortenedValue.length > 1 && doc.getTextWidth(`${shortenedValue}…`) > maxWidth) {
    shortenedValue = shortenedValue.slice(0, -1);
  }

  return `${shortenedValue}…`;
}
