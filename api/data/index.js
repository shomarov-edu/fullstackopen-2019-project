const { createUsers, createRecipes } = require('./seed');

(async () => {
  await createUsers();
  await createRecipes();
})();
