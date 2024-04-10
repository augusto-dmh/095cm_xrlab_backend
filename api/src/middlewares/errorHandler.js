import { ValidationError } from "sequelize";
import {
  createUnexpectedError,
  createValidationError,
} from "../validation/errors/controllers";
import ApiError from "../validation/errors/classes/ApiError";
import logHandler from "../logging/handler";
import Log from "../logging/Log";

/* eslint-disable no-unused-vars */ // error-handling middleware demands "next" to work.
export default ({ err, trace }, req, res, next) => {
  if (err instanceof ValidationError) {
    const subErrors = [];
    const fields = [];
    err.errors.forEach(({ message, path }) => {
      subErrors.push(message);
      fields.push(path);
    });
    const validationError = createValidationError(fields.join(", "));
    validationError.subErrors = err.errors.map((error) => error.message);
    const { status, detail } = validationError;

    const log = new Log(status, detail, trace, err.stack);
    logHandler(log, "error");

    res.status(400).json({ error: { ...validationError, detail: undefined } });
    return;
  }

  if (err instanceof ApiError) {
    const { status, detail } = err;
    const log = new Log(status, detail, trace, err.stack);
    logHandler(log, "error");

    res.status(err.status).json({ error: { ...err, detail: undefined } });
    return;
  }

  const unexpectedError = createUnexpectedError(trace[0].getFileName());
  const { status, detail } = unexpectedError;
  const log = new Log(status, detail, trace, err.stack);
  logHandler(log, "error");

  res.status(500).json({ error: { ...unexpectedError, detail: undefined } });
};
