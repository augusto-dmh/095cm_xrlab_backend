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
        },
        selected_avatar: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
          references: {
            model: Avatar,
            key: "id",
          },
        },
        isAdmin: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        password: {
          type: DataTypes.STRING,
          defaultValue: "",
        },
        xp: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: "user",
      }
    );

    this.addHook("afterValidate", (user) => {
      user.password = hashSync(user.password, 10);
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.photo, { foreignKey: "userId" });
    this.belongsTo(models.avatar, {
      as: "selectedAvatar",
      foreignKey: "selected_avatar",
    });
    this.belongsToMany(models.avatar, {
      as: "avatars",
      foreignKey: "userId",
      through: "user_avatars",
    });
  }
}
