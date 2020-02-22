const resolvers = {
  Query: {
    getUsers: async (root, args, { services }) =>
      await services.users.getUsers(),

    getUser: async (root, args, { services }) => await services.users.getUser(),

    userCount: async (root, args, { services }) =>
      await services.users.userCount()
  },

  Mutation: {
    updateUser: async (root, { input }, { services }) =>
      await services.users.updateUser(input),

    updateUsername: async (root, { input }, { services }) =>
      await services.users.updateUsername(input),

    updatePassword: async (root, { input }, { services }) =>
      await services.users.updatePassword(input),

    followUser: async (root, { input }, { services }) =>
      await services.users.followUser(input),

    deleteUser: async (root, { password }, { services }) =>
      await services.users.deleteUser(password)
  }
};

module.exports = resolvers;
