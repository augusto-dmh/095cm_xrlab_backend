"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex("photos", {
      fields: ["user_id"],
      name: "idx_photos_user_id",
    });

    await queryInterface.addIndex("photos", {
      fields: ["latitude"],
      name: "idx_photos_latitude",
    });

    await queryInterface.addIndex("photos", {
      fields: ["longitude"],
      name: "idx_photos_longitude",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex("photos", "idx_photos_user_id");
    await queryInterface.removeIndex("photos", "idx_photos_latitude");
    await queryInterface.removeIndex("photos", "idx_photos_longitude");
  },
};
