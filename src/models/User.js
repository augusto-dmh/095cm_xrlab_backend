import { Model, DataTypes } from "sequelize";
import { hashSync } from "bcryptjs";
import * as validations from "../validation";
import * as errors from "../validation/errors";
import Avatar from "./Avatar";
import { itExists } from "./../validation/index";
import Photo from "./Photo";

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
          validate: {
            itExists: async function (value) {
              const avatar = await Avatar.findByPk(value);
              if (!avatar) {
                throw new Error(errors.models.selectedAvatar.nonExistent);
              }
            },
          },
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

    this.addScope("defaultScope", {
      attributes: { exclude: ["password", "selected_avatar"] },
      include: [
        { model: Avatar, as: "selectedAvatar", attributes: ["id", "url"] },
        { model: Photo, attributes: ["id", "url"] },
        {
          model: Avatar,
          as: "avatars",
          through: { attributes: [] },
          attributes: ["id", "url"],
        },
      ],
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
