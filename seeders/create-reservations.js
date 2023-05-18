'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('reservations', [
      {
        table_number: 1,
        date: '2023-05-17',
        time: '18:30',
        duration: 30,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        table_number: 2,
        date: '2023-05-17',
        time: '19:00',
        duration: 90,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        table_number: 3,
        date: '2023-05-17',
        time: '18:30',
        duration: 30,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        table_number: 4,
        date: '2023-05-17',
        time: '20:00',
        duration: 60,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Add more seed data as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('reservations', null, {});
  }
};