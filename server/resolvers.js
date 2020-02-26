const { AuthenticationError, ForbiddenError } = require('apollo-server');
const {
  encryptPassword,
  comparePasswords,
  isAuthenticated
} = require('./helpers/authorizationHelper');
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    me: async (root, args, { currentUser, prisma }) =>
      await prisma.user(currentUser.id),

    users: async (root, args, { prisma }) => await prisma.users(),

    user: async (root, { username }, { prisma }) =>
      await prisma.user({ username }),

    userCount: async (root, args, { prisma }) =>
      await prisma
        .usersConnection()
        .aggregate()
        .count(),

    recipes: async (root, args, { prisma }) => await prisma.recipes(),

    recipe: async (root, { id }, { prisma }) => await prisma.recipe(id),

    recipeCount: async (root, args, { prisma }) =>
      await prisma
        .recipeConnection()
        .aggregate()
        .count()
  },

  Mutation: {
    signup: async (root, { input }, { prisma }) => {
      const { password, ...userInput } = input;

      await prisma.createUser({
        ...userInput,
        passwordHash: await encryptPassword(password)
      });

      return true;
    },

    login: async (root, { input }, { prisma }) => {
      const { username, password } = input;

      const user = await prisma.user({ username });

      const passwordCorrect =
        user === null
          ? false
          : await comparePasswords(password, user.passwordHash);

      if (!(user && passwordCorrect)) {
        throw new AuthenticationError('invalid username or password');
      }

      const userForToken = {
        id: user.id,
        username: user.username,
        roles: user.role
      };

      return { token: await jwt.sign(userForToken, process.env.SECRET) };
    },

    updateUser: async (root, { input }, { currentUser, prisma }) => {
      if (!currentUser) throw new ForbiddenError('forbidden');

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

    updateUsername: async (root, { input }, { currentUser, prisma }) => {
      if (!currentUser) throw new ForbiddenError('forbidden');

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

    updatePassword: async (root, { input }, { currentUser, prisma }) => {
      if (!currentUser) throw new ForbiddenError('forbidden');

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

    followUser: async (root, { input }, { currentUser, prisma }) => {
      if (!currentUser) throw new ForbiddenError('forbidden');

      const { userIdToFollow } = input;

      return await prisma.updateUser({
        where: { id: currentUser.id },
        data: {
          following: {
            connect: { id: userIdToFollow }
          }
        }
      });
    },

    deleteAccount: async (root, { password }, { currentUser, prisma }) => {
      if (!currentUser) throw new ForbiddenError('forbidden');

      const user = await prisma.user({ id: currentUser.id });

      if (!(user && (await comparePasswords(password, user.passwordHash))))
        throw new AuthenticationError('invalid username or password');

      await prisma.deleteUser({ id: currentUser.id });

      return true;
    }
  },

  User: {
    following: async (root, args, { prisma }) =>
      await prisma.user({ id: root.id }).following(),

    followers: async (root, args, { prisma }) =>
      await prisma.user({ id: root.id }).followers()
  }
};

module.exports = resolvers;
