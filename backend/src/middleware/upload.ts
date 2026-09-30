import multer from "multer";
import fs from "fs";

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
