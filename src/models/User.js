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
          unique: {
            msg: errors.models.nickname.inUse,
          },
        },
        birthdate: {
          type: DataTypes.DATEONLY,
          validate: {
            isDate: {
              msg: errors.models.birthdate.nonDate,
            },
          },
        },
        selectedAvatarId: {
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
        },
        xp: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        lastActivity: {
          type: DataTypes.DATE,
          defaultValue: new Date(),
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
      attributes: { exclude: ["selectedAvatarId"] },
      include: [
        { model: Avatar, as: "selectedAvatar", attributes: ["id", "url"] },
      ],
    });
    this.addScope("noPassword", {
      attributes: { exclude: ["password"] },
    });
    this.addScope("photos", {
      include: [{ model: Photo, attributes: ["id", "url"] }],
    });
    this.addScope("avatars", {
      include: [
        {
          model: Avatar,
          as: "avatars",
          through: { attributes: [] },
          attributes: ["id", "url"],
        },
      ],
    });
    this.addScope("age", {
      attributes: {
        include: [
          [sequelize.literal(`FLOOR(DATEDIFF(NOW(), birthdate) / 365)`), "age"],
        ],
      },
    });
    this.addScope("photoCount", {
      include: [
        {
          model: Photo,
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [sequelize.fn("COUNT", sequelize.col("photos.id")), "photoCount"],
        ],
      },
      group: ["id"],
    });
    this.addScope("orderByMostActiveUsers", {
      order: [
        ["lastActivity", "DESC"],
        ["xp", "DESC"],
        ["photoCount", "DESC"],
      ],
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.photo, { foreignKey: "userId" });
    this.belongsTo(models.avatar, {
      as: "selectedAvatar",
      foreignKey: "selectedAvatarId",
    });
    this.belongsToMany(models.avatar, {
      as: "avatars",
      foreignKey: "userId",
      through: "user_avatars",
    });
  }
}
