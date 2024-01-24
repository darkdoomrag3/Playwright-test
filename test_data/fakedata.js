const { faker } = require('@faker-js/faker');

class RandomData {
  createRandomUser() {
    const randomName = faker.name.firstName() + ' ' + faker.name.lastName();
    const randomEmail = faker.internet.email();
    const ramdomPassword = faker.internet.password();

    return {
      name: randomName,
      email: randomEmail,
      password: ramdomPassword
    };
  }
}

module.exports = {RandomData};
