// factory-create-users.js
'use strict';

const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        isAdmin: false,
        isUser: true,
      });
    }
    return queryInterface.bulkInsert('users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
