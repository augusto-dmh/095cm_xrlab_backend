"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("users", {
      fields: ["nickname"],
      type: "unique",
      name: "uk_users_nickname",
    });

    await queryInterface.addConstraint("users", {
      fields: ["selected_avatar_id"],
      type: "foreign key",
      references: {
        table: "avatars",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
      name: "fk_users_selected_avatar_id",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("users", "uk_users_nickname");
    await queryInterface.removeConstraint("users", "fk_users_selected_avatar");
  },
};
