const resolvers = {
  Query: {
    getUsers: async (root, args, context) =>
      await context.services.users.getUsers(),

    getUser: async (root, args, context) =>
      await context.services.users.getUser(),

    userCount: async (root, args, context) =>
      await context.services.users.userCount()
  },

  Mutation: {
    updateUser: async (root, { input }, context) =>
      await context.services.users.updateUser(input, context.currentUser),

    updateUsername: async (root, { input }, context) =>
      await context.services.users.updateUsername(input, context.currentUser),

    updatePassword: async (root, { input }, context) =>
      await context.services.users.updatePassword(input, context.currentUser),

    followUser: async (root, { input }, context) =>
      await context.services.users.followUser(input, context.currentUser),

    deleteUser: async (root, { password }, context) =>
      await context.services.users.deleteUser(password)
  }
};

module.exports = resolvers;
