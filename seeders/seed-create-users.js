// seed-create-users.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'user1',
        email: 'user1@example.com',
        password: 'password1',
        isUser: false,
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123',
        isUser: false,
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Add more seed data as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
