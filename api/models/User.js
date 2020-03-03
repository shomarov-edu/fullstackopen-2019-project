const { prisma } = require('../prisma');
const { AuthenticationError, UserInputError } = require('apollo-server');
const comparePasswords = require('../helpers/comparePasswords');
const encryptPassword = require('../helpers/encryptPassword');
const titleCase = require('../helpers/titleCase');
const validator = require('../utils/validator');

// TODO: Input validations

const generateUserModel = currentUser => ({
  // QUERIES:

  me: async id => {
    if (!currentUser) return null;

    return await prisma.user({ id: currentUser.id }).$fragment(`
    fragment User {
      id
      username
      email
      name
      role
      registered
      recipes { id category title description cookingTime difficulty ingredients method notes tags source created updated published }
      likedRecipes { id category title description cookingTime difficulty ingredients method notes tags source created updated published }
      followees { username }
      followers { username }
    }
  `);
  },

  getAll: async name => {
    console.log(name);
    //if (!currentUser || currentUser.role !== 'ADMIN') return null;

    return await prisma.users({
      where: {
        AND: [
          { name_contains: name },
          { name_contains: name.toLowerCase() },
          { name_contains: name.toUpperCase() },
          { name_contains: titleCase(name) }
        ]
      }
    });
  },

  //getById: async id => await prisma.user({ id }),

  getById: async id => {},

  getByUsername: async username => {
    const userWithRecipes = await prisma.user({ username }).$fragment(`
    fragment UserRecipes on User {
      id
      username
      firstname
      lastname
      email
      role
      registered
      recipes { id category title description cookingTime difficulty ingredients method notes tags source created updated published }
      likedRecipes { id category title description cookingTime difficulty ingredients method notes tags source created updated published }
      followees { username }
      followers { username }
    }
  `);

    console.log('user', userWithRecipes);

    return userWithRecipes;
  },

  getUserCount: async () =>
    await prisma
      .usersConnection()
      .aggregate()
      .count(),

  getRecipesByUserId: async id => await prisma.user({ id }).recipes(),

  getRecipeCountByUserId: async id => {
    const recipes = await prisma.user({ id }).recipes();
    return recipes.length;
  },

  getFolloweesByUserId: async id => {
    const followees = await prisma.user({ id }).followees();
    return followees.length;
  },

  getFollowersByUserId: async id => {
    const followers = await prisma.user({ id }).followers();
    return followers.length;
  },

  getLikedRecipesByUserId: async id => {
    const likedRecipes = await prisma.user({ id }).likedRecipes();
    return likedRecipes.length;
  },

  // MUTATIONS:

  followUser: async input => {
    if (!currentUser) return null;

    const { idToFollow } = input;

    const userExists = prisma.$exists.user({
      id: idToFollow
    });

    if (!userExists) throw new UserInputError('no such user');

    return await prisma.updateUser({
      where: { id: currentUser.id },
      data: {
        following: {
          connect: { id: idToFollow }
        }
      }
    });
  },

  updateUser: async input => {
    if (!currentUser) return null;

    const { password, patch } = input;

    const user = await prisma.user({ id: currentUser.id });

    if (!(user && (await comparePasswords(password, user.passwordHash))))
      throw new AuthenticationError('invalid username or password');

    return await prisma.updateUser({
      data: patch,
      where: {
        id: currentUser.id
      }
    });
  },

  updateUsername: async input => {
    if (!currentUser) return null;

    const { password, newUsername } = input;

    const user = await prisma.user({ id: currentUser.id });

    if (!(user && (await comparePasswords(password, user.passwordHash))))
      throw new AuthenticationError('invalid username or password');

    return await prisma.updateUser({
      data: {
        username: newUsername
      },
      where: {
        id: currentUser.id
      }
    });
  },

  updatePassword: async input => {
    if (!currentUser) return null;

    const { password, newPassword } = input;

    const user = await prisma.user({ id: currentUser.id });

    if (!(user && (await comparePasswords(password, user.passwordHash))))
      throw new AuthenticationError('invalid username or password');

    return await prisma.updateUser({
      data: {
        passwordHash: encryptPassword(newPassword)
      },
      where: {
        id: currentUser.id
      }
    });
  },

  deleteUser: async password => {
    if (!currentUser) return null;

    const user = await prisma.user({ id: currentUser.id });

    if (!(user && (await comparePasswords(password, user.passwordHash))))
      throw new AuthenticationError('invalid username or password');

    await prisma.deleteUser({ id: currentUser.id });

    return true;
  }
});

module.exports = { generateUserModel };
