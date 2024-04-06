import multer from "multer";
import multerConfig from "../config/multer";
import * as errors from "../validation/errors/controllers";
import ApiError from "../validation/errors/classes/ApiError";
import stacktrace from "stack-trace";
import ErrorContext from "../validation/errors/classes/ErrorContext";

export default (req, res, next) => {
  const upload = multer(multerConfig).single("photo");

  upload(req, res, (err) => {
    if (!err) return next();
    const fullPath = req.baseUrl + req.path;
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
  });
};
