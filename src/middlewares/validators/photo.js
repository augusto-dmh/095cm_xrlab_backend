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
    .custom((value) => {
      if (value < -90 || value > 90) {
        throw new Error(errors.latitude.invalidRange);
      }
      return true;
    }),
  body("longitude")
    .exists()
    .withMessage(errors.longitude.empty)
    .bail()
    .isFloat()
    .withMessage(errors.longitude.nonFloat)
    .bail()
    .custom((value) => {
      if (value < -180 || value > 180) {
        throw new Error(errors.longitude.invalidRange);
      }
      return true;
    }),
];

export default { store };
