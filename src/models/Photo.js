import { Model, DataTypes } from "sequelize";
import appConfig from "../config/appConfig";
import * as validations from "../validation";
import * as errors from "../validation/errors";
import User from "./User";

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
            return `${appConfig.url}/photos/${this.getDataValue("filename")}`;
          },
        },
        latitude: {
          type: DataTypes.FLOAT,
          defaultValue: "",
        },
        longitude: {
          type: DataTypes.FLOAT,
          defaultValue: "",
        },
        userId: {
          type: DataTypes.INTEGER,
          references: {
            model: User,
            key: "id",
          },
          validate: {
            custom(value) {
              if (!validations.isNotEmpty(value)) {
                throw errors.models.userId.empty;
              }
              if (!validations.isNumber(value)) {
                throw errors.models.userId;
              }
            },
          },
        },
      },
      {
        sequelize,
        modelName: "photo",
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.user, { foreignKey: "userId" });
  }
}
