import { Model, DataTypes } from "sequelize";
import appConfig from "../config/appConfig";
import * as validations from "../validation";
import * as errors from "../validation/errors";

export default class Photo extends Model {
  static init(sequelize) {
    super.init(
      {
        filename: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            custom(value) {
              if (!validations.isNotEmpty(value)) {
                throw errors.models.filename.empty;
              }
            },
          },
        },
        url: {
          type: DataTypes.VIRTUAL,
          get() {
            return `${appConfig.url}/images/${this.getDataValue("filename")}`;
          },
        },
        latitude: {
          type: DataTypes.FLOAT,
          validate: {
            custom(value) {
              if (!validations.isNumber(value)) {
                throw errors.models.latitude.nonFloat;
              }
            },
          },
        },
        longitude: {
          type: DataTypes.FLOAT,
          validate: {
            custom(value) {
              if (!validations.isNumber(value)) {
                throw errors.models.longitude.nonFloat;
              }
            },
          },
        },
      },
      {
        sequelize,
        modelName: "photo",
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.user, { foreignKey: "userId" });
  }
}
