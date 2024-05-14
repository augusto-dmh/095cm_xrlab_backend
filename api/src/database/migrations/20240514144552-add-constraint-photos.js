"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("photos", {
      fields: ["user_id"],
      type: "foreign key",
      references: {
        table: "users",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      name: "fk_photos_user_id",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("photos", "fk_photos_user_id");
  },
};
