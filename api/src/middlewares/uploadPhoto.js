import multer from "multer";
import multerConfig from "../config/multer";
import * as errors from "../validation/errors/controllers";
import ApiError from "../validation/errors/classes/ApiError";
import stacktrace from "stack-trace";
import ErrorContext from "../validation/errors/classes/ErrorContext";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import path from "path";

export default (req, res, next) => {
  const upload = multer(multerConfig).single("photo");

  upload(req, res, async (err) => {
    const fullPath = req.baseUrl + req.path;

    if (err) {
      const trace = stacktrace.parse(err);

      try {
        switch (err.code) {
          case "LIMIT_INVALID_TYPE":
            throw new ApiError(...errors.createInvalidPhotoType());

          case "LIMIT_FILE_SIZE":
            throw new ApiError(...errors.createInvalidPhotoSize(fullPath, 5));

          default:
            throw new ApiError(...errors.createUnexpectedError(fullPath));
        }
      } catch (err) {
        const errorContext = new ErrorContext(err, trace);

        next(errorContext);
      }
    }

    try {
      const filename = `${uuidv4()}${path.extname(req.file.originalname)}`;
      const saveTo = path.resolve(__dirname, "..", "..", "uploads", "images");
      const filePath = path.join(saveTo, filename);

      await sharp(req.file.buffer).jpeg({ quality: 20 }).toFile(filePath);

      req.file.filename = filename;

      next();
    } catch (err) {
      const trace = stacktrace.parse(err);
      const errorContext = new ErrorContext(err, trace);

      next(errorContext);
    }
  });
};
