const { prisma } = require('../prisma');
const {
  AuthenticationError,
  ForbiddenError,
  UserInputError
} = require('apollo-server');
const comparePasswords = require('../helpers/comparePasswords');
const encryptPassword = require('../helpers/encryptPassword');

const fragmentDetailsForCurrentUser = `
fragment DetailsForCurrentUser on User {
  id
  name
  email
  username
  registered
  recipes { id author { id } category title description cookingTime difficulty ingredients method notes tags source created updated published }
  likedRecipes { id }
  followees { username }
  followers { username }
}
`;

const fragmentUserDetails = `
fragment UserDetails on User {
  username
  name
  registered
  recipes { id }
  followees { id username }
  followers { id username }
}
`;

// TODO: Input validations

const generateUserModel = currentUser => ({
  // QUERIES:

  me: async () => {
    if (!currentUser) return null;

    return await prisma
      .user({ id: currentUser.id })
      .$fragment(fragmentDetailsForCurrentUser);
  },

  // Only admins can view personal information of all users

  getAll: async input => {
    const users = await prisma.users().$fragment(fragmentUserDetails);

    if (!input || !input.name) return users;

    return users.filter(user =>
      user.name.toLowerCase().includes(input.name.toLowerCase())
    );
  },

  // Retrieval of user by user id => moved to dataloaders

  getById: async id => await prisma.user({ id }).$fragment(fragmentUserDetails),

  // Retrieval of user by username => moved to dataloaders

  getByUsername: async username =>
    await prisma.user({ username }).$fragment(fragmentUserDetails),

  // Count all registered users

  getUserCount: async () =>
    await prisma
      .usersConnection()
      .aggregate()
      .count(),

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
