const { prisma } = require('../prisma');
const { AuthenticationError, UserInputError } = require('apollo-server');
const comparePasswords = require('../helpers/comparePasswords');
const encryptPassword = require('../helpers/encryptPassword');
const validator = require('../utils/validator');

// TODO: Input validations

const generateUserModel = currentUser => ({
  // QUERIES:

  getAll: async () => await prisma.users(),

  getByUsername: async username => await prisma.user({ username }),

  getUserCount: async () =>
    await prisma
      .usersConnection()
      .aggregate()
      .count(),

  getFollowees: async username => await prisma.user({ username }).followees(),

  getFollowers: async username => await prisma.user({ username }).followers(),

  getRecipes: async username => await prisma.user({ username }).recipes(),

  getLikedRecipes: async username =>
    await prisma.user({ username }).likedRecipes(),

  // MUTATIONS:

  followUser: async input => {
    if (!currentUser) return null;

    const { usernameToFollow } = input;

    const userExists = prisma.$exists.user({
      username: usernameToFollow
    });

    if (!userExists) throw new UserInputError('no such user');

    return await prisma.updateUser({
      where: { id: currentUser.id },
      data: {
        following: {
          connect: { id: usernameToFollow }
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
