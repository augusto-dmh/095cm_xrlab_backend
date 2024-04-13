import Photo from "../models/Photo";
import stacktrace from "stack-trace";
import ErrorContext from "../validation/errors/classes/ErrorContext";
import Log from "../logging/Log";
import fs from "fs";
import ApiError from "../validation/errors/classes/ApiError";
import * as errors from "../validation/errors";

const store = async (req, res, next) => {
  const fullPath = req.baseUrl + req.path;
  const [userId, latitude, longitude] = parseReqBody(req.body);

  try {
    if (!req.file) {
      throw new ApiError(...errors.controllers.createMissingFile(fullPath));
    }
    const { filename } = req.file;

    const photo = await Photo.create({ userId, filename, latitude, longitude });

    const trace = stacktrace.get();
    const log = new Log(201, "Photo created", trace);
    res.json(photo);
  } catch (err) {
    fs.unlink(`./api/uploads/images/${filename}`, () => {});
    const trace = stacktrace.parse(err);
    const errorContext = new ErrorContext(err, trace);

    next(errorContext);
  }
};

export default { store };

function parseReqBody(reqBody) {
  const { userId, latitude, longitude } = reqBody;
  return [+userId, +latitude, +longitude];
}
