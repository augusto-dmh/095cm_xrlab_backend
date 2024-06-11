import { Router } from "express";
import userController from "../controllers/user";
import loginRequired from "../middlewares/loginRequired";
import { body } from "express-validator";
import * as validations from "../validation";
import * as errors from "../validation/errors/models";
import Avatar from "../models/Avatar";
import User from "../models/User";
import userValidator from "../middlewares/validators/user";

const router = new Router();

router.post("/users", userValidator.store(), userController.store);
router.get("/users", userController.index);
router.get("/users/user", loginRequired, userController.show);
router.put(
  "/users",
  userValidator.update(),
  loginRequired,
  userController.update
);
router.delete("/users", loginRequired, userController.destroy);

export default router;
