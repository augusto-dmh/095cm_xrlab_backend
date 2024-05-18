"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const photosData = Array.from({ length: 100 }).map((_, index) => ({
      id: index + 1,
      user_id: faker.number.int({ min: 1, max: 50 }),
      filename: faker.system.fileName(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      created_at: new Date(),
      updated_at: new Date(),
    }));

    return queryInterface.bulkInsert("photos", photosData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("photos", null, {});
  },
};
