import { API_URL } from "@/api/config";
import type { jsPDF } from "jspdf";

const PAGE_MARGIN = 16;
const IMAGE_WIDTH = 84;
const IMAGE_HEIGHT = 52;
const IMAGE_COLUMN_GAP = 6;
const IMAGE_ROW_GAP = 8;
const BOTTOM_MARGIN = 20;

export async function addAttachmentImages(
  document: jsPDF,
  attachmentPaths: string[],
  startingY: number,
): Promise<number> {
  const usablePaths = attachmentPaths.filter((path) => path.trim().length > 0);
  if (usablePaths.length === 0) return startingY;

  const images = await Promise.all(usablePaths.map(loadImage));
  const pageWidth = document.internal.pageSize.getWidth();
  const pageHeight = document.internal.pageSize.getHeight();
  const rowWidth = IMAGE_WIDTH * 2 + IMAGE_COLUMN_GAP;
  const rowStartX = (pageWidth - rowWidth) / 2;
  let y = startingY;

  document.setFont("helvetica", "bold");
  document.setFontSize(8);
  document.setTextColor(86, 35, 129);
  document.text("ATTACHED IMAGES", PAGE_MARGIN, y);
  y += 6;

  for (let index = 0; index < images.length; index += 2) {
    if (y + IMAGE_HEIGHT + IMAGE_ROW_GAP > pageHeight - BOTTOM_MARGIN) {
      document.addPage();
      y = 32;
      document.setFont("helvetica", "bold");
      document.setFontSize(8);
      document.setTextColor(86, 35, 129);
      document.text("ATTACHED IMAGES • CONTINUED", PAGE_MARGIN, y);
      y += 6;
    }

    const row = images.slice(index, index + 2);
    row.forEach((image, columnIndex) => {
      const x = rowStartX + columnIndex * (IMAGE_WIDTH + IMAGE_COLUMN_GAP);
      document.setDrawColor(226, 232, 240);
      document.roundedRect(x, y, IMAGE_WIDTH, IMAGE_HEIGHT, 1.5, 1.5, "S");
      if (image) {
        try {
          const imageProperties = document.getImageProperties(image.dataUrl);
          const availableWidth = IMAGE_WIDTH - 2;
          const availableHeight = IMAGE_HEIGHT - 2;
          const scale = Math.min(availableWidth / imageProperties.width, availableHeight / imageProperties.height);
          const imageWidth = imageProperties.width * scale;
          const imageHeight = imageProperties.height * scale;
          const imageX = x + (IMAGE_WIDTH - imageWidth) / 2;
          const imageY = y + (IMAGE_HEIGHT - imageHeight) / 2;
          document.addImage(image.dataUrl, image.format, imageX, imageY, imageWidth, imageHeight, undefined, "FAST");
        } catch {
          drawUnavailableImage(document, x, y);
        }
      } else {
        drawUnavailableImage(document, x, y);
      }
    });
    y += IMAGE_HEIGHT + IMAGE_ROW_GAP;
  }
  return y;
}

function drawUnavailableImage(document: jsPDF, x: number, y: number) {
  document.setFont("helvetica", "normal");
  document.setFontSize(8);
  document.setTextColor(107, 114, 128);
  document.text("Image unavailable", x + IMAGE_WIDTH / 2, y + IMAGE_HEIGHT / 2, { align: "center" });
}

async function loadImage(path: string): Promise<{ dataUrl: string; format: "JPEG" | "PNG" } | null> {
  try {
    const imageUrl = /^https?:\/\//i.test(path)
      ? path
      : `${API_URL.replace(/\/api\/?$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
    const response = await fetch(imageUrl);
    if (!response.ok) return null;

    const blob = await response.blob();
    const mimeType = blob.type.toLowerCase();
    if (!mimeType.includes("jpeg") && !mimeType.includes("jpg") && !mimeType.includes("png")) return null;

    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("Invalid image data"));
      reader.onerror = () => reject(new Error("Could not read image"));
      reader.readAsDataURL(blob);
    });

    return { dataUrl, format: mimeType.includes("png") ? "PNG" : "JPEG" };
  } catch {
    return null;
  }
}
