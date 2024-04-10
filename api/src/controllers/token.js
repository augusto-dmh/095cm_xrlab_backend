import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as errors from "../validation/errors";
import ApiError from "../validation/errors/classes/ApiError";
import User from "../models/User";
import stacktrace from "stack-trace";
import ErrorContext from "../validation/errors/classes/ErrorContext";

const store = async (req, res, next) => {
  const fullPath = req.baseUrl + req.path;
  const { email = "", password = "" } = req.body;

  if (!email || !password)
    throw new ApiError(
      ...errors.controllers.createMissingCredentials(fullPath)
    );

  try {
    const user = await User.findOne({ where: { email } });

    if (!user)
      throw new ApiError(...errors.controllers.createInvalidCredentials());
    // it would be more accurate to inform "Invalid credentials" on both, suggesting that at least one field is preventing the login,
    // or "No user found with matching email" at the validation above and "Wrong password" below, telling in which field
    // the problem lies and why.

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch)
      throw new ApiError(...errors.controllers.createPasswordsNotMatch());

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    res.json({ token, user: { name: user.name, id, email } });
  } catch (err) {
    const trace = stacktrace.parse(err);
    const errorContext = new ErrorContext(err, trace);

    next(errorContext);
  }
};

export default { store };
