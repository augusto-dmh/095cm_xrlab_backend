import Photo from "../models/Photo";
import stacktrace from "stack-trace";
import ErrorContext from "../validation/errors/classes/ErrorContext";
import Log from "../logging/Log";
import fs from "fs";

const store = async (req, res, next) => {
  const fullPath = req.baseUrl + req.path;
  const { filename } = req.file;
  const [userId, latitude, longitude] = parseReqBody(req.body);

  if (!req.file) {
    throw new ApiError(...errors.controllers.createMissingFile(fullPath));
  }

  try {
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
