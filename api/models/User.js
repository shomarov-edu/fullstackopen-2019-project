const { prisma } = require('../prisma');
const { AuthenticationError, UserInputError } = require('apollo-server');
const comparePasswords = require('../helpers/comparePasswords');
const encryptPassword = require('../helpers/encryptPassword');
const validator = require('../utils/validator');
const { handleError } = require('../utils/errorHandler');

// TODO: Input validations

const generateUserModel = currentUser => ({
  // QUERIES

  getAll: async () => {
    try {
      return await prisma.users();
    } catch (error) {
      handleError(error);
    }
  },

  getByUsername: async username => {
    try {
      return await prisma.user({ username });
    } catch (error) {
      handleError(error);
    }
  },

  getUserCount: async () => {
    try {
      return await prisma
        .usersConnection()
        .aggregate()
        .count();
    } catch (error) {
      handleError(error);
    }
  },

  getFollowing: async username => {
    try {
      return await prisma.user({ username }).following();
    } catch (error) {
      handleError(error);
    }
  },

  getFollowers: async username => {
    try {
      return await prisma.user({ username }).followers();
    } catch (error) {
      handleError(error);
    }
  },

  getRecipes: async username => {
    try {
      return await prisma.user({ username }).recipes();
    } catch (error) {
      handleError(error);
    }
  },

  getLikedRecipes: async username => {
    try {
      return await prisma.user({ username }).likedRecipes();
    } catch (error) {
      handleError(error);
    }
  },

  // MUTATIONS:

  followUser: async input => {
    if (!currentUser) return null;

    try {
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
    } catch (error) {
      handleError(error);
    }
  },

  updateUser: async input => {
    if (!currentUser) return null;

    try {
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
    } catch (error) {
      handleError(error);
    }
  },

  updateUsername: async input => {
    if (!currentUser) return null;

    try {
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
    } catch (error) {
      handleError(error);
    }
  },

  updatePassword: async input => {
    if (!currentUser) return null;

    try {
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
    } catch (error) {
      handleError(error);
    }
  },

  deleteUser: async password => {
    if (!currentUser) return null;

    try {
      const user = await prisma.user({ id: currentUser.id });

      if (!(user && (await comparePasswords(password, user.passwordHash))))
        throw new AuthenticationError('invalid username or password');

      await prisma.deleteUser({ id: currentUser.id });

      return true;
    } catch (error) {
      handleError(error);
    }
  }
});

module.exports = { generateUserModel };
