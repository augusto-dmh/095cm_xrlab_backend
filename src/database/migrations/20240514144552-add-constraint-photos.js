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

    await queryInterface.addConstraint("photos", {
      fields: ["latitude"],
      type: "check",
      where: {
        latitude: {
          [Sequelize.Op.gte]: -90,
          [Sequelize.Op.lte]: 90,
        },
      },
      name: "latitude_range",
    });

    await queryInterface.addConstraint("photos", {
      fields: ["longitude"],
      type: "check",
      where: {
        longitude: {
          [Sequelize.Op.gte]: -180,
          [Sequelize.Op.lte]: 180,
        },
      },
      name: "longitude_range",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("photos", "fk_photos_user_id");
    await queryInterface.removeConstraint("photos", "latitude_range");
    await queryInterface.removeConstraint("photos", "longitude_range");
  },
};
