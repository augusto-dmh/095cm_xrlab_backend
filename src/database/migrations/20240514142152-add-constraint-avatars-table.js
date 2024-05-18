"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("avatars", {
      fields: ["name"],
      type: "unique",
      name: "uk_avatars_name",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("avatars", "uk_avatars_name");
  },
};
