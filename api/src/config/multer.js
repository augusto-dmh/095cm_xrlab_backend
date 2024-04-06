import multer, { MulterError } from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
      return cb(new MulterError("LIMIT_INVALID_TYPE"));
    }

    return cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "uploads", "images"));
    },
    filename: (req, file, cb) => {
      cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
    },
  }),
};
