"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("users", {
      fields: ["selected_avatar_id"],
      type: "foreign key",
      references: {
        table: "avatars",
        field: "id",
      },
      onUpdate: "cascade",
      onDelete: "restrict",
      name: "fk_users_selected_avatar_id",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "users",
      "fk_users_selected_avatar_id"
    );
  },
};
