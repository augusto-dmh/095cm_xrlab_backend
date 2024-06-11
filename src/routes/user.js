import { Router } from "express";
import userController from "../controllers/user";
import loginRequired from "../middlewares/loginRequired";
import { body } from "express-validator";
import * as validations from "../validation";
import * as errors from "../validation/errors/models";
import Avatar from "../models/Avatar";
import User from "../models/User";

const router = new Router();

const fieldsValidation = [
  // FOR UPDATE, MAKE AN EQUAL VALIDATION MIDDLEWARES ARRAY BUT WITH ALL FIELDS AS OPTIONAL
  [
    body("nickname")
      .exists()
      .withMessage(errors.nickname.empty)
      .bail()
      .isLength({ min: 0, max: 20 })
      .withMessage(errors.nickname.invalidLength)
      .escape(),
  ],
  [
    body("birthdate")
      .exists()
      .withMessage(errors.birthdate.empty)
      .bail()
      .isISO8601("yyyy-mm-dd")
      .withMessage(errors.birthdate.nonDate)
      .escape(),
  ],
  [
    body("isAdmin")
      .optional()
      .isBoolean()
      .withMessage(errors.isAdmin.nonBoolean)
      .bail(),
  ],
  [
    body("selectedAvatar")
      .optional()
      .exists()
      .withMessage(errors.selectedAvatar.empty)
      .bail(),
  ],
  [
    body("password")
      .exists()
      .withMessage(errors.password.empty)
      .bail()
      .isLength({ min: 6, max: 50 })
      .withMessage(errors.password.invalidLength),
  ],
  [
    body("xp")
      .optional()
      .exists()
      .withMessage(errors.xp.empty)
      .bail()
      .isInt()
      .withMessage(errors.xp.nonInteger),
  ],
];

router.post("/users", fieldsValidation, userController.store);
router.get("/users", userController.index);
router.get("/users/user", loginRequired, userController.show);
router.put("/users", fieldsValidation, loginRequired, userController.update);
router.delete("/users", loginRequired, userController.destroy);

export default router;
