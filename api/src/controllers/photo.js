import Photo from "../models/Photo";
import stacktrace from "stack-trace";
import ErrorContext from "../validation/errors/classes/ErrorContext";
import Log from "../logging/Log";

const store = async (req, res, next) => {
  const { originalname, filename } = req.file;
  const { studentId } = req.body;

  try {
    const photo = await Photo.create({ filename, studentId });

    const trace = stacktrace.get();
    const log = new Log(201, "Photo created", trace);
    res.json(photo);
  } catch (err) {
    const trace = stacktrace.parse(err);
    const errorContext = new ErrorContext(err, trace);

    next(errorContext);
  }
};

export default { store };
