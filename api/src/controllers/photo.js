import Photo from "../models/Photo";
import stacktrace from "stack-trace";
import ErrorContext from "../validation/errors/classes/ErrorContext";
import Log from "../logging/Log";
import fs from "fs";
import ApiError from "../validation/errors/classes/ApiError";
import * as errors from "../validation/errors";

const store = async (req, res, next) => {
  const fullPath = req.baseUrl + req.path;
  const [latitude, longitude] = parseReqBody(req.body);
  const { userId } = req;
  const { filename } = req.file;

  try {
    if (!req.file) {
      throw new ApiError(...errors.controllers.createMissingFile(fullPath));
    }

    const photo = await Photo.create({ userId, filename, latitude, longitude });

    const trace = stacktrace.get();
    const log = new Log(201, "Photo created", trace);
    res.json(photo);
  } catch (err) {
    req.file && fs.unlink(`./api/uploads/images/${filename}`, () => {});
    const trace = stacktrace.parse(err);
    const errorContext = new ErrorContext(err, trace);

    next(errorContext);
  }
};

const index = async (req, res, next) => {
  try {
    const photos = await Photo.findAll();
    res.json(photos);
  } catch (err) {
    const trace = stacktrace.parse(err);
    const errorContext = new ErrorContext(err, trace);

    next(errorContext);
  }
};

export default { store, index };

function parseReqBody(reqBody) {
  const { latitude, longitude } = reqBody;
  return [+latitude, +longitude];
}
