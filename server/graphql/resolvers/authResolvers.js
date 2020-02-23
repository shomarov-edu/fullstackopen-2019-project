const resolvers = {
  Query: {
    me: (root, args, { currentUser }) => currentUser
  },

  Mutation: {
    signup: async (root, { input }, { authorization }) =>
      await authorization.signup(input),

    login: async (root, { input }, { authorization }) =>
      await authorization.login(input)
  }
};

module.exports = resolvers;
