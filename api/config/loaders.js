const DataLoader = require('dataloader');
const { prisma } = require('../prisma');
const keyBy = require('lodash.keyby');

const userByIdLoader = new DataLoader(async userIds => {
  const loadedUsers = await prisma.users({
    where: {
      id_in: userIds
    }
  }).$fragment(`
    fragment UserDetails on User {
      id
      username
      name
      registered
      role
      recipes { id author {id} category title cookingTime published }
      followees { username }
      followers { username }
    }
  `);

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
  const loadedUsers = await prisma.users({
    where: {
      username_in: usernames
    }
  }).$fragment(`
    fragment UserDetails on User {
      username
      name
      registered
      role
      recipes { id category title cookingTime published }
      followees { id username }
      followers { id username }
    }
  `);

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
    const recipes = await prisma.recipes({
      where: {
        id_in: recipeIds
      }
    }).$fragment(`
    fragment FullRecipe on Recipe {
      id
      title
      author {
        name
        username
      }
      category
      description
      cookingTime
      difficulty
      ingredients
      method
      notes
      tags
      source
      created
      updated
      published
      likedBy {
        name
        username
      }
      comments {
        id
        author {
          username
        }
        content
      }
      ratings {
        id
        rater {
          username
        }
        grade
      }
    }
`);

    const recipesById = keyBy(recipes, 'id');

    console.log('recipes loaded with recipeByIdLoader: ', recipeIds.length);

    return recipeIds.map(
      recipeId =>
        recipesById[recipeId] || new Error(`No result for ${recipeId}`)
    );
  }),

  recipesByUserId: new DataLoader(async userIds => {
    console.log(userIds);
    const users = await prisma.users({
      where: {
        id_in: userIds
      }
    }).$fragment(`
    fragment UserRecipes on User {
      recipes {
        id
        title
        author {
          id
        }
        category
        description
        cookingTime
        difficulty
        ingredients
        method
        notes
        tags
        source
        created
        updated
        published
        likedBy {
          name
          username
        }
        comments {
          id
          author {
            username
          }
          content
        }
        ratings {
          id
          rater {
            username
          }
          grade
        }
      }
    `);

    const usersById = keyBy(users, 'id');

    console.log('recipe arrays loaded with recipeByIdLoader: ', users.length);

    return userIds.map(
      userId => usersById[userId] || new Error(`No result for ${userId}`)
    );
  })
});

const createUserLoader = () => ({ userByIdLoader, userByUsernameLoader });

module.exports = () => ({
  user: createUserLoader(),
  recipe: createRecipeLoader()
});
