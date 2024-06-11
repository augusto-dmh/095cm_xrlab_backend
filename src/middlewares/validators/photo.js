import { body } from "express-validator";
import * as errors from "../../validation/errors/models";

const store = () => [
  body("latitude")
    .exists()
    .withMessage(errors.latitude.empty)
    .bail()
    .isFloat()
    .withMessage(errors.latitude.nonFloat)
    .bail()
    .isLatitude()
    .withMessage(errors.latitude.invalidRange),
  body("longitude")
    .exists()
    .withMessage(errors.longitude.empty)
    .bail()
    .isFloat()
    .withMessage(errors.longitude.nonFloat)
    .bail()
    .isLongitude()
    .withMessage(errors.longitude.invalidRange),
];

export default { store };
