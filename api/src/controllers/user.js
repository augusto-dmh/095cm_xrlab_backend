import User from "../models/User";
import * as errors from "../validation/errors";
import ApiError from "../validation/errors/classes/ApiError";
import stacktrace, { parse } from "stack-trace";
import ErrorContext from "../validation/errors/classes/ErrorContext";

const store = async (req, res, next) => {
  parseReqBody(req.body) = { nickname, selected_avatar, email, password, xp }

  try {
    const user = await User.create();
    const { id, name, email } = user;
    res.json({ id, name, email });
  } catch (err) {
    const trace = stacktrace.parse(err);
    const errorContext = new ErrorContext(err, trace);

    next(errorContext);
  }
};

const index = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: ["id", "name", "email"] });
    res.json(users);
  } catch (err) {
    const trace = stacktrace.parse(err);
    const errorContext = new ErrorContext(err, trace);

    next(errorContext);
  }
};

const show = async (req, res, next) => {
  const fullPath = req.baseUrl + req.path;
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) throw new ApiError(...errors.controllers.createUserNotFound(id, fullPath));

    const { name, email } = user;
    res.json({ id, name, email });
  } catch (err) {
    const trace = stacktrace.parse(err);
    const errorContext = new ErrorContext(err, trace);

    next(errorContext);
  }
};

const update = async (req, res, next) => {
  const id = req.userId;

  try {
    const user = await User.findByPk(id);

    if (!user) throw new ApiError(...errors.controllers.createUserNotFound(id));

    const updatedData = await user.update(req.body);
    const { name, email } = updatedData;

    res.json({ id, name, email });
  } catch (err) {
    const trace = stacktrace.parse(err);
    const errorContext = new ErrorContext(err, trace);

    next(errorContext);
  }
};

const destroy = async (req, res, next) => {
  const id = req.userId;

  try {
    const user = await User.findByPk(id);

    if (!user) throw new ApiError(...errors.controllers.createUserNotFound(id));

    await user.destroy();
    res.json(null);
  } catch (err) {
    const trace = stacktrace.parse(err);
    const errorContext = new ErrorContext(err, trace);

    next(errorContext);
  }
};

export default { store, index, show, update, destroy };

function parseReqBody(reqBody) {
  const { nickname, selected_avatar, email, password, xp } = reqBody;
  return [String(nickname), +selected_avatar, String(email), String(password), +xp];
}
