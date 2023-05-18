const faker = require('faker');

const generateUser = () => {
  const username = faker.internet.userName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  return {
    username,
    email,
    password,
    isUser: true,
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

module.exports = {
  generateUser
};
