const resolvers = {
  Query: {
    users: async (root, args, { models }) => await models.User.getUsers(),

    user: async (root, { username }, { models }) =>
      await models.User.getUser(username),

    userCount: async (root, args, { models }) => await models.User.userCount()
  },

  Mutation: {
    updateUser: async (root, { input }, { models }) =>
      await models.User.updateUser(input),

    updateUsername: async (root, { input }, { models }) =>
      await models.User.updateUsername(input),

    updatePassword: async (root, { input }, { models }) =>
      await models.User.updatePassword(input),

    followUser: async (root, { input }, { models }) =>
      await models.User.followUser(input),

    deleteAccount: async (root, { password }, { models }) =>
      await models.User.deleteUser(password)
  }
};

module.exports = resolvers;
