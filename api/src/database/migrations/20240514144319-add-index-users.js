"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex("users", {
      fields: ["nickname"],
      name: "idx_users_nickname",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex("users", "idx_users_nickname");
  },
};
