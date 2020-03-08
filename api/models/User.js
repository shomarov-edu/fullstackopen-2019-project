const { prisma } = require('../prisma');
const {
  AuthenticationError,
  ForbiddenError,
  UserInputError
} = require('apollo-server');
const comparePasswords = require('../helpers/comparePasswords');
const encryptPassword = require('../helpers/encryptPassword');
const fragments = require('../graphql/fragments');

// TODO: Input validations

const generateUserModel = currentUser => ({
  // QUERIES:

  me: async () => {
    if (!currentUser) return null;

    return await prisma
      .user({ id: currentUser.id })
      .$fragment(fragments.currentUserDetails);
  },

  // Only admins can view personal information of all users

  getAll: async input => {
    const users = await prisma.users().$fragment(fragments.userDetails);

    if (!input || !input.name) return users;

    return users.filter(user =>
      user.name.toLowerCase().includes(input.name.toLowerCase())
    );
  },

  // Retrieval of user by user id => moved to dataloaders

  getById: async id =>
    await prisma.user({ id }).$fragment(fragments.userDetails),

  // Retrieval of user by username => moved to dataloaders

  getByUsername: async username =>
    await prisma.user({ username }).$fragment(fragments.userDetails),

  // Count all registered users

  getUserCount: async () =>
    await prisma
      .usersConnection()
      .aggregate()
      .count(),

  // MUTATIONS:

  followUser: async idToFollow => {
    console.log(idToFollow);
    if (!currentUser) return null;

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

  unfollowUser: async idToUnfollow => {
    if (!currentUser) return null;

    const userExists = prisma.$exists.user({
      id: idToUnfollow
    });

    if (!userExists) throw new UserInputError('no such user');

    return await prisma.updateUser({
      where: { id: currentUser.id },
      data: {
        following: {
          disconnect: { id: idToUnfollow }
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
