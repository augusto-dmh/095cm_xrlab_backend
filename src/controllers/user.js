import User from "../models/User";
import * as errors from "../validation/errors";
import ApiError from "../validation/errors/classes/ApiError";
import stacktrace from "stack-trace";
import ErrorContext from "../validation/errors/classes/ErrorContext";
import Photo from "../models/Photo";
import Avatar from "../models/Avatar";

const store = async (req, res, next) => {
  const {
    nickname,
    isAdmin,
    selectedAvatar: selected_avatar,
    password,
    xp,
  } = req.body;

  try {
    const user = await User.create({
      nickname,
      isAdmin,
      selected_avatar,
      password,
      xp,
    });

    res.json(user);
  } catch (err) {
    const trace = stacktrace.parse(err);
    const errorContext = new ErrorContext(err, trace);

    next(errorContext);
  }
};

const index = async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.json(users);
  } catch (err) {
    const trace = stacktrace.parse(err);
    const errorContext = new ErrorContext(err, trace);

    next(errorContext);
  }
};

const show = async (req, res, next) => {
  const fullPath = req.baseUrl + req.path;
  const { userId: id } = req;

  try {
    const user = await User.findByPk(id);

    if (!user)
      throw new ApiError(
        ...errors.controllers.createUserNotFound(id, fullPath)
      );

    res.json({ ...user.dataValues, password: undefined });
  } catch (err) {
    const trace = stacktrace.parse(err);
    const errorContext = new ErrorContext(err, trace);

    next(errorContext);
  }
};

const update = async (req, res, next) => {
  const { userId: id } = req;
  const { nickname, isAdmin, selectedAvatar, password, xp } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) throw new ApiError(...errors.controllers.createUserNotFound(id));

    const updatedUser = await user.update(
      nickname,
      isAdmin,
      selectedAvatar,
      password,
      xp
    );

    res.json(updatedUser);
  } catch (err) {
    const trace = stacktrace.parse(err);
    const errorContext = new ErrorContext(err, trace);

    next(errorContext);
  }
};

const destroy = async (req, res, next) => {
  const { userId: id } = req;

  try {
    const user = await User.findByPk(id);

    if (!user) throw new ApiError(...errors.controllers.createUserNotFound(id));

    await user.destroy();

    res.json(user);
  } catch (err) {
    const trace = stacktrace.parse(err);
    const errorContext = new ErrorContext(err, trace);

    next(errorContext);
  }
};

export default { store, index, show, update, destroy };
