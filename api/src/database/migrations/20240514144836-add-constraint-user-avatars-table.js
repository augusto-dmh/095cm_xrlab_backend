"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("user_avatars", {
      fields: ["user_id"],
      type: "foreign key",
      references: {
        table: "users",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      name: "fk_user_avatars_user_id",
    });

    await queryInterface.addConstraint("user_avatars", {
      fields: ["avatar_id"],
      type: "foreign key",
      references: {
        table: "avatars",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      name: "fk_user_avatars_avatar_id",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("user_avatars", "cpk_user_avatars");
    await queryInterface.removeConstraint(
      "user_avatars",
      "fk_user_avatars_user_id"
    );
    await queryInterface.removeConstraint(
      "user_avatars",
      "fk_user_avatars_avatar_id"
    );
  },
};
