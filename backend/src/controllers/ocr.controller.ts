import type { Request, Response as ExpressResponse, NextFunction } from "express";
import { env } from "@/config/env";
import { BadGatewayError, ValidationError } from "@/shared/errors";

const OCR_REQUEST_TIMEOUT_MS = 120_000;

function getSafeImageFilename(mimeType: string) {
  const extensionByMimeType: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };

  return `patient-log-image.${extensionByMimeType[mimeType] ?? "img"}`;
}

export const ocrController = {
  async scanPatientLogImage(req: Request, res: ExpressResponse, next: NextFunction) {
    console.log("ocr start")
    try {
      if (!env.OCR_BACKEND_URL) {
        throw new BadGatewayError("Image scanning is not configured. Set OCR_BACKEND_URL on the server.");
      }
      const image = req.file;
      if (!image) {
        throw new ValidationError("Choose an image to scan.", {
          file: ["Choose an image to scan."],
        });
      }

      const requestBody = new FormData();
      const imageBlob = new Blob([new Uint8Array(image.buffer)], {
        type: image.mimetype,
      });
      requestBody.append("file", imageBlob, getSafeImageFilename(image.mimetype));

      let ocrResponse: globalThis.Response;
      try {
        ocrResponse = await fetch(env.OCR_BACKEND_URL, {
          method: "POST",
          body: requestBody,
          signal: AbortSignal.timeout(OCR_REQUEST_TIMEOUT_MS),
        });
      } catch {
        throw new BadGatewayError("Could not reach the OCR service. Try again shortly.");
      }

      if (!ocrResponse.ok) {
        throw new BadGatewayError("The OCR service could not read this image.");
      }

      let result: unknown;
      try {
        result = await ocrResponse.json();
      } catch {
        throw new BadGatewayError("The OCR service returned an invalid response.");
      }

      if (!result || typeof result !== "object" || Array.isArray(result)) {
        throw new BadGatewayError("The OCR service returned an invalid response.");
      }

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
