const DataLoader = require('dataloader');
const { prisma } = require('../prisma');
const keyBy = require('lodash.keyby');

const userByIdLoader = new DataLoader(async userIds => {
  const loadedUsers = await prisma.users({
    where: {
      id_in: userIds
    }
  });

  const usersById = keyBy(loadedUsers, 'id');

  const users = userIds.map(
    userId => usersById[userId] || new Error(`No result for ${userId}`)
  );

  for (let user of users) {
    userByRecipeLoader(await prisma.user({ id: user.id }).recipes, user);
  }

  console.log('users loaded with userByIdLoader: ', userIds.length);

  return users;
});

const userByUsernameLoader = new DataLoader(async usernames => {
  const loadedUsers = await prisma.users({
    where: {
      username_in: usernames
    }
  });

  const usersByUsername = keyBy(loadedUsers, 'username');

  const users = usernames.map(
    username =>
      usersByUsername[username] || new Error(`No result for ${username}`)
  );

  for (let user of users) {
    userByIdLoader.prime(user.id, user);
  }

  for (let user of users) {
    userByRecipeLoader.prime(
      await prisma.user({ username: user.username }).recipes,
      user
    );
  }

  console.log('users loaded with userByIdLoader: ', usernames.length);

  return users;
});

const userByRecipeLoader = new DataLoader(async recipeIds => {
  const recipes = await prisma.recipes({
    where: {
      id_in: recipeIds
    }
  });

  const promiseArray = recipes.map(async recipe => {
    const user = await prisma.recipe({ id: recipe.id }).author();
    user.recipeId = recipe.id;
    return user;
  });

  const loadedUsers = await Promise.all(promiseArray);

  const usersById = keyBy(loadedUsers, 'recipeId');

  const users = recipeIds.map(
    recipeId => usersById[recipeId] || new Error(`No result for ${recipeId}`)
  );

  for (let user of users) {
    userByIdLoader.prime(user.id, user);
  }

  for (let user of users) {
    userByUsernameLoader.prime(user.username, user);
  }

  console.log('users loaded with userByRecipeLoader: ', recipeIds.length);

  return users;
});

const recipeByIdLoader = new DataLoader(async recipeIds => {
  const recipes = await prisma.recipes({
    where: {
      id_in: recipeIds
    }
  });

  const recipesById = keyBy(recipes, 'id');

  console.log('recipes loaded with recipeByIdLoader: ', recipeIds.length);

  return recipeIds.map(
    recipeId => recipesById[recipeId] || new Error(`No result for ${recipeId}`)
  );
});

const recipesByUserIdLoader = new DataLoader(async userIds => {
  const users = await prisma.users({
    where: {
      id_in: userIds
    }
  });

  const promiseArray = users.map(async user => {
    const recipes = await prisma.user({ id: user.id }).recipes();
    recipes.author = user.id;
    return recipes;
  });

  const loadedRecipes = await Promise.all(promiseArray);

  const recipesById = keyBy(loadedRecipes, 'author');

  const recipes = userIds.map(
    userId => recipesById[userId] || new Error(`No result for ${userId}`)
  );

  console.log('recipes loaded with recipeByUserIdLoader: ', userIds.length);

  return recipes;
});

const createUserLoader = () => {
  return { userByIdLoader, userByRecipeLoader, userByUsernameLoader };
};

const createRecipeLoader = () => {
  return { recipeByIdLoader, recipesByUserIdLoader };
};

const loaders = () => ({
  user: createUserLoader(),
  recipe: createRecipeLoader()
});

module.exports = loaders;
