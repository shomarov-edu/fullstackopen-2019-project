const DataLoader = require('dataloader');
const { prisma } = require('../prisma');
const fragments = require('../graphql/fragments');
const keyBy = require('lodash.keyby');

// Fetch user by id
const userByIdLoader = new DataLoader(async userIds => {
  const loadedUsers = await prisma
    .users({
      where: {
        id_in: userIds
      }
    })
    .$fragment(fragments.userDetails);

  const usersById = keyBy(loadedUsers, 'id');

  const users = userIds.map(
    userId => usersById[userId] || new Error(`No result for ${userId}`)
  );

  // Looked for users cached with userByUsernameLoader function
  for (let user of users) {
    userByUsernameLoader.prime(user.username, user);
  }

  return users;
});

const userByUsernameLoader = new DataLoader(async usernames => {
  const loadedUsers = await prisma
    .users({
      where: {
        username_in: usernames
      }
    })
    .$fragment(fragments.userDetails);

  const usersByUsername = keyBy(loadedUsers, 'username');

  const users = usernames.map(
    username =>
      usersByUsername[username] || new Error(`No result for ${username}`)
  );

  // Looked for users cached with userByIdLoader function
  for (let user of users) {
    userByIdLoader.prime(user.id, user);
  }

  return users;
});

const createUserLoader = () => ({ userByIdLoader, userByUsernameLoader });

const createRecipeLoader = () => ({
  // Fetch recipe by id
  recipeByIdLoader: new DataLoader(async recipeIds => {
    console.log('HERE');
    const recipes = await prisma
      .recipes({
        where: {
          id_in: recipeIds
        }
      })
      .$fragment(fragments.fullRecipeDetails);

    const recipesById = keyBy(recipes, 'id');

    return recipeIds.map(
      recipeId =>
        recipesById[recipeId] || new Error(`No result for ${recipeId}`)
    );
  }),

  // Fetch array of recipes by user id
  recipesByUserIdLoader: new DataLoader(async userIds => {
    const promiseArray = userIds.map(
      async userId =>
        (await prisma
          .recipes({
            where: {
              author: {
                id: userId
              }
            }
          })
          .$fragment(fragments.fullRecipeDetails)) ||
        new Error(`No result for ${userId}`)
    );

    const recipes = await Promise.all(promiseArray);

    return recipes;
  }),

  // Fetch array of published recipes by user id
  publishedRecipesByUserIdLoader: new DataLoader(async userIds => {
    const promiseArray = userIds.map(
      async userId =>
        (await prisma
          .recipes({
            where: {
              AND: [
                {
                  author: {
                    id: userId
                  },
                  published: true
                }
              ]
            }
          })
          .$fragment(fragments.fullRecipeDetails)) ||
        new Error(`No result for ${userId}`)
    );

    const publishedRecipes = await Promise.all(promiseArray);

    return publishedRecipes;
  })
});

module.exports = () => ({
  user: createUserLoader(),
  recipe: createRecipeLoader()
});
