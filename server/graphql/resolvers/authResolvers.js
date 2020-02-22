const resolvers = {
  Query: {
    me: (root, args, { currentUser }) => currentUser
  },

  Mutation: {
    signup: async (root, { input }, { services }) =>
      await services.auth.signup(input),

    login: async (root, { input }, { services }) =>
      await services.auth.login(input)
  }
};

module.exports = resolvers;
