const DataLoader = require('dataloader');
const { prisma } = require('../prisma');
const fragments = require('../graphql/fragments');
const keyBy = require('lodash.keyby');
const groupBy = require('lodash.groupby');

// Create PER REQUEST dataloader functions,
// so that we have a new loader every single request
const createUserLoader = () => ({
  // Fetch user by id
  userByIdLoader: new DataLoader(async userIds => {
    const loadedUsers = await prisma
      .users({
        where: {
          id_in: userIds
        }
      })
      .$fragment(fragments.userDetails);

    // Create a key:value objects from results
    const usersById = keyBy(loadedUsers, 'id');

    // Map initial array of userIds to results fetched from database
    const users = userIds.map(
      userId => usersById[userId] || new Error(`No result for ${userId}`)
    );

    // Fill cache of userByUsernameLoader with results
    // for (let user of users) {
    //   userByUsernameLoader.prime(user.username, user);
    // }

    return users;
  }),

  // Fetch user by username (not in use)
  userByUsernameLoader: new DataLoader(async usernames => {
    const loadedUsers = await prisma
      .users({
        where: {
          username_in: usernames
        }
      })
      .$fragment(fragments.userDetails);

    // Create a key:value objects from results
    const usersByUsername = keyBy(loadedUsers, 'username');

    // Map initial array of userIds to results fetched from database
    const users = usernames.map(
      username =>
        usersByUsername[username] || new Error(`No result for ${username}`)
    );

    // Fill cache of userByIdLoader with results
    // for (let user of users) {
    //   userByIdLoader.prime(user.id, user);
    // }

    return users;
  })
});

const createRecipeLoader = () => ({
  // Fetch individual recipe by recipe id
  recipeByIdLoader: new DataLoader(async recipeIds => {
    const recipes = await prisma
      .recipes({
        where: {
          id_in: recipeIds
        }
      })
      .$fragment(fragments.fullRecipeDetails);

    // Create a key:value objects from results
    const recipesById = keyBy(recipes, 'id');

    // Map initial array of userIds to results fetched from database
    return recipeIds.map(
      recipeId =>
        recipesById[recipeId] || new Error(`No result for ${recipeId}`)
    );
  }),

  // Fetch promise array of recipes by user id
  recipesByUserIdLoader: new DataLoader(async userIds => {
    // Fetch all recipes where author id match with userIds
    const loadedRecipes = await prisma
      .recipes({
        where: {
          AND: [
            {
              author: {
                id_in: userIds
              },
              published: true
            }
          ]
        }
      })
      .$fragment(fragments.fullRecipeDetails);

    // Group recipes by author id
    const groupedRecipes = groupBy(loadedRecipes, 'author.id');

    // Return either an array of published recipes match with userId, or an empty array if no recipes found
    const recipes = userIds.map(userId => groupedRecipes[userId] || []);
    return recipes;
  }),

  // Fetch array of published recipes by user id
  publishedRecipesByUserIdLoader: new DataLoader(async userIds => {
    // Fetch all published recipes where author id match with userIds
    const loadedRecipes = await prisma
      .recipes({
        where: {
          AND: [
            {
              author: {
                id_in: userIds
              },
              published: true
            }
          ]
        }
      })
      .$fragment(fragments.fullRecipeDetails);

    // Group recipes by author id
    const groupedRecipes = groupBy(loadedRecipes, 'author.id');

    // Return either an array of published recipes match with userId, or an empty array if no recipes found
    const publishedRecipes = userIds.map(
      userId => groupedRecipes[userId] || []
    );
    return publishedRecipes;
  })
});

module.exports = () => ({
  user: createUserLoader(),
  recipe: createRecipeLoader()
});
