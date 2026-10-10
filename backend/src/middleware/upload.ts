import multer from "multer";
import fs from "fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { ValidationError } from "@/shared/errors";

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
      callback(null, file.originalname);
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
      callback(null, `${randomUUID()}${extensionsByMimeType[file.mimetype] ?? ".img"}`);
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
