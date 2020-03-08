const DataLoader = require('dataloader');
const { prisma } = require('../prisma');
const fragments = require('../graphql/fragments');
const keyBy = require('lodash.keyby');

const createUserLoader = () => ({ userByIdLoader, userByUsernameLoader });

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

  for (let user of users) {
    userByUsernameLoader.prime(user.username, user);
  }

  console.log('users loaded with userByIdLoader: ', userIds.length);

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

  for (let user of users) {
    userByIdLoader.prime(user.id, user);
  }

  console.log('users loaded with userByIdLoader: ', usernames.length);

  return users;
});

const createRecipeLoader = () => ({
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

    console.log('recipes loaded with recipeByIdLoader: ', recipeIds.length);

    return recipeIds.map(
      recipeId =>
        recipesById[recipeId] || new Error(`No result for ${recipeId}`)
    );
  }),

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
