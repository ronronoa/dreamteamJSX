import multer from "multer";
import fs from "fs";
import path from "node:path";
import { ValidationError } from "@/shared/errors";

function getAvailableFilename(directory: string, originalName: string) {
  const safeName = path.basename(originalName);
  const extension = path.extname(safeName);
  const name = path.basename(safeName, extension);
  let filename = `${name}${extension}`;
  let duplicateNumber = 1;

  while (fs.existsSync(path.join(directory, filename))) {
    filename = `${name}_${duplicateNumber}${extension}`;
    duplicateNumber += 1;
  }

  return filename;
}

export function createUpload(dirname: string) {
  const dir = `uploads/${dirname}/`;

  const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      callback(null, dir);
    },

    filename: (_req, file, callback) => {
      callback(null, getAvailableFilename(dir, file.originalname));
    },
  });

  return multer({ storage });
}

export function createProfileImageUpload() {
  const directory = path.resolve("uploads/profiles");
  const extensionsByMimeType: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
  };

  const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
      fs.mkdirSync(directory, { recursive: true });
      callback(null, directory);
    },
    filename: (_req, file, callback) => {
      callback(null, getAvailableFilename(directory, file.originalname));
    },
  });

  return multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024, files: 1 },
    fileFilter: (_req, file, callback) => {
      if (!extensionsByMimeType[file.mimetype]) {
        callback(new ValidationError("Profile photos must be JPG or PNG images.", {
          image: ["Profile photos must be JPG or PNG images."],
        }));
        return;
      }
      callback(null, true);
    },
  });
}

export function createReportFormUpload() {
  const directory = path.resolve("uploads/report-forms");
  const extensionsByMimeType: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
  };
  const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
      fs.mkdirSync(directory, { recursive: true });
      callback(null, directory);
    },
    filename: (_req, file, callback) => {
      callback(null, getAvailableFilename(directory, file.originalname));
    },
  });

  return multer({
    storage,
    // A patient report can include 10 attachments plus its scanned source form.
    limits: { fileSize: 8 * 1024 * 1024, files: 11 },
    fileFilter: (_req, file, callback) => {
      if (!extensionsByMimeType[file.mimetype]) {
        callback(new ValidationError("Report attachments must be JPG, PNG, or WebP images.", {
          images: ["Report attachments must be JPG, PNG, or WebP images."],
        }));
        return;
      }
      callback(null, true);
    },
  });
}

export function createOcrImageUpload() {
  const supportedMimeTypes = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
  ]);

  return multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 8 * 1024 * 1024, files: 1 },
    fileFilter: (_req, file, callback) => {
      if (!supportedMimeTypes.has(file.mimetype)) {
        callback(new ValidationError("Upload a JPG, PNG, or WebP image.", {
          file: ["Upload a JPG, PNG, or WebP image."],
        }));
        return;
      }
      callback(null, true);
    },
  });
}
