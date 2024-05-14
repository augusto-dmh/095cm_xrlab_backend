"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex("avatars", {
      fields: ["name"],
      name: "idx_avatars_name",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex("avatars", "idx_avatars_name");
  },
};
