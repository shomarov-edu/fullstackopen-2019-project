const { prisma } = require('../prisma');
const { AuthenticationError, UserInputError } = require('apollo-server');
const comparePasswords = require('../helpers/comparePasswords');
const encryptPassword = require('../helpers/encryptPassword');
const { userDetails, recipeDetails } = require('../graphql/fragments');

// TODO: Input validations

const generateUserModel = currentUser => ({
  // QUERIES:

  me: async () => {
    if (!currentUser) return null;

    return await prisma.user({ id: currentUser.id }).$fragment(userDetails);
  },

  getAll: async input => {
    const users = await prisma.users().$fragment(userDetails);

    if (!input || !input.name) return users;

    return users.filter(user =>
      user.name.toLowerCase().includes(input.name.toLowerCase())
    );
  },

  // Retrieval of user by user id => moved to dataloaders

  getById: async id => await prisma.user({ id }).$fragment(userDetails),

  // Retrieval of user by username => moved to dataloaders

  getByUsername: async username =>
    await prisma.user({ username }).$fragment(userDetails),

  // Count all registered users

  getUserCount: async () =>
    await prisma
      .usersConnection()
      .aggregate()
      .count(),

  // Fetch all users the user is following
  getFollowingByUserId: async userId =>
    await prisma
      .users({
        where: {
          followers_some: {
            id: userId
          }
        }
      })
      .$fragment(userDetails),

  // Fetch all users which are following the user
  getFollowersByUserId: async userId =>
    await prisma
      .users({
        where: {
          following_some: {
            id: userId
          }
        }
      })
      .$fragment(userDetails),

  getLikedRecipesByUserId: async id =>
    await prisma
      .user({ id })
      .likedRecipes()
      .$fragment(recipeDetails),

  // MUTATIONS:

  followUser: async idToFollow => {
    idToFollow;
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

  updateName: async input => {
    if (!currentUser) return null;

    const { newName } = input;

    return await prisma.updateUser({
      data: { name: newName },
      where: {
        id: currentUser.id
      }
    });
  },

  updateEmail: async input => {
    if (!currentUser) return null;

    const { newEmail } = input;

    return await prisma.updateUser({
      data: { email: newEmail },
      where: {
        id: currentUser.id
      }
    });
  },

  updateUsername: async input => {
    if (!currentUser) return null;

    const { newUsername } = input;

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

    try {
      await prisma.updateUser({
        data: {
          passwordHash: await encryptPassword(newPassword)
        },
        where: {
          id: currentUser.id
        }
      });

      return true;
    } catch (e) {
      return false;
    }
  },

  deleteAccount: async input => {
    if (!currentUser) return null;

    const { password } = input;

    const user = await prisma.user({ id: currentUser.id });

    if (!(user && (await comparePasswords(password, user.passwordHash))))
      throw new AuthenticationError('invalid username or password');

    await prisma.deleteManyRecipes({
      author: { id: currentUser.id }
    });

    await prisma.deleteUser({ id: currentUser.id });

    return true;
  }
});

module.exports = { generateUserModel };
