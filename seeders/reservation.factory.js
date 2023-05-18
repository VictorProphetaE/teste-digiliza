const faker = require('faker');

const generateReservation = (userIds) => {
  const tableNumber = faker.random.number({ min: 1, max: 10 });
  const date = faker.date.future();
  const time = faker.random.arrayElement(['18:00', '19:00', '20:00', '21:00', '22:00']);
  const duration = faker.random.number({ min: 15, max: 90 });
  const userId = faker.random.arrayElement(userIds);

  return {
    table_number: tableNumber,
    date,
    time,
    duration,
    user_id: userId,
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

module.exports = {
  generateReservation
};
