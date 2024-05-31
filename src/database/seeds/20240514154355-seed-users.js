"use strict";

const { faker } = require("@faker-js/faker");
const { hashSync } = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usedNicknames = new Set();

    const usersData = Array.from({ length: 50 }).map((_, index) => {
      while (true) {
        const nickname = faker.internet.userName({ min: 3, max: 19 });
        /** this function generates a username based on a random first name and a random last name separated by a period or an underscore,
         * so if the first and last name together have together 20 characters, with the separator it will be 21 characters; that's why the max length is 19.
         * */
        if (!usedNicknames.has(nickname)) {
          usedNicknames.add(nickname);

          return {
            id: index + 1,
            is_admin: faker.datatype.boolean(),
            birthdate: faker.date.past(),
            selected_avatar_id: faker.number.int({ min: 1, max: 10 }),
            nickname: nickname,
            password: hashSync(faker.internet.password(), 10),
            xp: faker.number.int({ min: 0, max: 1000 }),
            last_activity: faker.date.recent(),
            created_at: new Date(),
            updated_at: new Date(),
          };
        }
      }
    });

    return queryInterface.bulkInsert("users", usersData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
