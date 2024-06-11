import { body } from "express-validator";
import * as errors from "../../validation/errors/models";

const store = () => [
  body("nickname")
    .notEmpty()
    .withMessage(errors.nickname.empty)
    .bail()
    .isLength({ min: 0, max: 20 })
    .withMessage(errors.nickname.invalidLength)
    .escape(),
  body("birthdate")
    .notEmpty()
    .withMessage(errors.birthdate.empty)
    .bail()
    .isDate()
    .withMessage(errors.birthdate.nonDate)
    .escape(),
  body("isAdmin")
    .optional()
    .isBoolean()
    .withMessage(errors.isAdmin.nonBoolean)
    .bail()
    .escape(),
  body("selectedAvatar")
    .optional()
    .notEmpty()
    .withMessage(errors.selectedAvatar.empty)
    .bail()
    .escape(),
  body("password")
    .notEmpty()
    .withMessage(errors.password.empty)
    .bail()
    .isLength({ min: 6, max: 50 })
    .withMessage(errors.password.invalidLength)
    .escape(),
  body("xp")
    .optional()
    .notEmpty()
    .withMessage(errors.xp.empty)
    .bail()
    .isInt()
    .withMessage(errors.xp.nonInteger)
    .escape(),
];

const update = () => [
  [
    body("nickname")
      .optional()
      .notEmpty()
      .withMessage(errors.nickname.empty)
      .bail()
      .isLength({ min: 0, max: 20 })
      .withMessage(errors.nickname.invalidLength)
      .escape(),
  ],
  [
    body("birthdate")
      .optional()
      .notEmpty()
      .withMessage(errors.birthdate.empty)
      .bail()
      .isDate()
      .withMessage(errors.birthdate.nonDate)
      .escape(),
  ],
  [
    body("isAdmin")
      .optional()
      .isBoolean()
      .withMessage(errors.isAdmin.nonBoolean)
      .bail()
      .escape(),
  ],
  [
    body("selectedAvatar")
      .optional()
      .notEmpty()
      .withMessage(errors.selectedAvatar.empty)
      .bail()
      .escape(),
  ],
  [
    body("password")
      .optional()
      .notEmpty()
      .withMessage(errors.password.empty)
      .bail()
      .isLength({ min: 6, max: 50 })
      .withMessage(errors.password.invalidLength)
      .escape(),
  ],
  [
    body("xp")
      .optional()
      .notEmpty()
      .withMessage(errors.xp.empty)
      .bail()
      .isInt()
      .withMessage(errors.xp.nonInteger)
      .escape(),
  ],
];

export default { store, update };
