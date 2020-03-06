const { prisma } = require('../prisma');
const recipes = require('./recipes');

const createRecipe = async (user, input) => {
  await prisma.createRecipe({
    author: {
      connect: { id: user.id }
    },
    category: input.category,
    title: input.title,
    description: input.description,
    cookingTime: input.cookingTime,
    difficulty: input.difficulty,
    ingredients: { set: input.ingredients },
    method: { set: input.method },
    notes: { set: input.notes },
    tags: { set: input.tags },
    source: input.source,
    published: true
  });
};

(async () => {
  let user = await prisma.user({ username: 'user' });
  let input = recipes[0];
  await createRecipe(user, input);

  input = recipes[1];
  await createRecipe(user, input);

  user = await prisma.user({ username: 'root' });
  input = recipes[2];
  await createRecipe(user, input);

  input = recipes[3];
  await createRecipe(user, input);

  user = await prisma.user({ username: 'test' });
  input = recipes[4];
  await createRecipe(user, input);

  input = recipes[5];
  await createRecipe(user, input);
})();
