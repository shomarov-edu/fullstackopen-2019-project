const resolvers = {
  Query: {
    me: (root, args, { currentUser }) => currentUser
  },

  Mutation: {
    signup: async (root, { input }, context) =>
      await context.services.auth.signup(input),

    login: async (root, { input }, context) =>
      await context.services.auth.login(input)
  }
};

module.exports = resolvers;
