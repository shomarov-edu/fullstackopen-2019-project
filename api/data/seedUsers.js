const { prisma } = require('../prisma');
const encryptPassword = require('../helpers/encryptPassword');
const users = require('./users');

(async () => {
  await prisma.deleteManyRecipes();
  await prisma.deleteManyUsers();

  users.forEach(async user => {
    const { password, ...userInput } = user;
    const savedUser = await prisma.createUser({
      ...userInput,
      passwordHash: await encryptPassword(password)
    });
  });
})();
