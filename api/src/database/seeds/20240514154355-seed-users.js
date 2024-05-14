"use strict";

const { faker } = require("@faker-js/faker");
const { hashSync } = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersData = Array.from({ length: 50 }).map((_, index) => ({
      id: index + 1,
      is_admin: faker.datatype.boolean(),
      selected_avatar: faker.number.int({ min: 1, max: 10 }),
      nickname: faker.internet.userName(),
      password: hashSync(faker.internet.password(), 10),
      xp: faker.number.int({ min: 0, max: 1000 }),
      created_at: new Date(),
      updated_at: new Date(),
    }));

    return queryInterface.bulkInsert("users", usersData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
