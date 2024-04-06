import { Model, DataTypes } from "sequelize";
import { hashSync } from "bcryptjs";
import * as validations from "../validation";
import * as errors from "../validation/errors";
import Avatar from "./Avatar";

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nickname: {
          type: DataTypes.STRING,
          defaultValue: "",
          unique: {
            msg: errors.models.nickname.inUse,
          },
          validate: {
            custom(value) {
              if (!validations.isNotEmpty(value)) {
                throw errors.models.name.empty;
              }
              if (!validations.isLengthValid(value, 0, 20)) {
                throw errors.models.name.invalidLength;
              }
            },
          },
        },
        selected_avatar: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
          validate: {
            custom(value) {
              if (!validations.itExists(value, "id", Avatar)) {
                throw errors.models.selectedAvatar.nonExistent;
              }
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          defaultValue: "",
          unique: {
            msg: errors.models.email.inUse,
          },
          validate: {
            custom(value) {
              if (!validations.isNotEmpty(value)) {
                throw errors.models.email.empty;
              }
              if (!validations.isEmailValid(value)) {
                throw errors.models.email.invalid;
              }
            },
          },
        },
        password: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            custom(value) {
              if (!validations.isNotEmpty(value)) {
                throw errors.models.password.empty;
              }
              if (!validations.isLengthValid(value, 6, 60)) {
                throw errors.models.password.invalidLength;
              }
            },
          },
        },
        xp: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          validate: {
            custom(value) {
              if (!validations.isNotEmpty(value)) {
                throw errors.models.password.empty;
              }
              if (!validations.isLengthValid(value, 6, 60)) {
                throw errors.models.password.invalidLength;
              }
            },
          },
        },
      },
      {
        sequelize,
        modelName: "user",
      },
    );

    this.addHook("afterValidate", (user) => {
      user.password = hashSync(user.password, 10);
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.photo, { foreignKey: "photoId" });
  }

  static associate(models) {
    this.hasOne(models.avatar, { foreignKey: "avatarId" });
  }

  static associate(models) {
    this.belongsToMany(models.avatar, { foreignKey: "avatarId" });
  }
}
