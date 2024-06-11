import { body } from "express-validator";
import * as errors from "../../validation/errors/models";

const store = () => [
  body("nickname")
    .exists()
    .withMessage(errors.nickname.empty)
    .bail()
    .isLength({ min: 0, max: 20 })
    .withMessage(errors.nickname.invalidLength)
    .escape(),
  body("birthdate")
    .exists()
    .withMessage(errors.birthdate.empty)
    .bail()
    .isISO8601("yyyy-mm-dd")
    .withMessage(errors.birthdate.nonDate)
    .escape(),
  body("isAdmin")
    .optional()
    .isBoolean()
    .withMessage(errors.isAdmin.nonBoolean)
    .bail(),
  body("selectedAvatar")
    .optional()
    .exists()
    .withMessage(errors.selectedAvatar.empty)
    .bail(),
  body("password")
    .exists()
    .withMessage(errors.password.empty)
    .bail()
    .isLength({ min: 6, max: 50 })
    .withMessage(errors.password.invalidLength),
  body("xp")
    .optional()
    .exists()
    .withMessage(errors.xp.empty)
    .bail()
    .isInt()
    .withMessage(errors.xp.nonInteger),
];

const update = () => [
  body("nickname")
    .optional()
    .exists()
    .withMessage(errors.nickname.empty)
    .bail()
    .isLength({ min: 0, max: 20 })
    .withMessage(errors.nickname.invalidLength)
    .escape(),
  body("birthdate")
    .optional()
    .exists()
    .withMessage(errors.birthdate.empty)
    .bail()
    .isISO8601("yyyy-mm-dd")
    .withMessage(errors.birthdate.nonDate)
    .escape(),
  body("isAdmin")
    .optional()
    .isBoolean()
    .withMessage(errors.isAdmin.nonBoolean)
    .bail(),
  body("selectedAvatar")
    .optional()
    .exists()
    .withMessage(errors.selectedAvatar.empty)
    .bail(),
  body("password")
    .optional()
    .exists()
    .withMessage(errors.password.empty)
    .bail()
    .isLength({ min: 6, max: 50 })
    .withMessage(errors.password.invalidLength),
  body("xp")
    .optional()
    .exists()
    .withMessage(errors.xp.empty)
    .bail()
    .isInt()
    .withMessage(errors.xp.nonInteger),
];

export default { store, update };
