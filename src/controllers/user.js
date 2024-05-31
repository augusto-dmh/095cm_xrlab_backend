import User from "../models/User";
import * as errors from "../validation/errors";
import ApiError from "../validation/errors/classes/ApiError";
import stacktrace from "stack-trace";
import ErrorContext from "../validation/errors/classes/ErrorContext";
import Photo from "../models/Photo";
import Avatar from "../models/Avatar";
import queryString from "query-string";

const store = async (req, res, next) => {
  const { nickname, birthdate, isAdmin, selectedAvatarId, password, xp } =
    req.body;

  try {
    const user = await User.create({
      nickname,
      birthdate,
      isAdmin,
      selectedAvatarId,
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
  const allowedFilters = ["photos", "avatars"];
  req.query = req.originalUrl.split("?")[1];
  const { filter } = queryString.parse(req.query, {
    arrayFormat: "bracket-separator",
    arrayFormatSeparator: ",",
  });

  const scopes = filter ? getValidFilters(filter, allowedFilters) : [];

  try {
    const users = await User.scope(
      "defaultScope",
      "noPassword",
      scopes
    ).findAll();

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

    res.json({ ...user.dataValues });
  } catch (err) {
    const trace = stacktrace.parse(err);
    const errorContext = new ErrorContext(err, trace);

    next(errorContext);
  }
};

const update = async (req, res, next) => {
  const { userId: id } = req;
  const { nickname, birthdate, isAdmin, selectedAvatarId, password, xp } =
    req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) throw new ApiError(...errors.controllers.createUserNotFound(id));

    const updatedUser = await user.update(
      nickname,
      birthdate,
      isAdmin,
      selectedAvatarId,
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

function getValidFilters(filter, allowedFilters) {
  return filter.filter((f) => allowedFilters.includes(f));
}

export default { store, index, show, update, destroy };

// function getValidFilters(filter, allowedFilters) {
//   if (!(filter instanceof Array)) {
//     if (allowedFilters.includes(filter)) {
//       return [filter];
//     }
//     return [];
//   }

//   return filter.filter((f) => allowedFilters.includes(f));
// }

// export default { store, index, show, update, destroy };
