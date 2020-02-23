const resolvers = {
  Query: {
    getUsers: async (root, args, { models }) => await models.User.getUsers(),

    getUser: async (root, { username }, { models }) =>
      await models.User.getUser(username),

    userCount: async (root, args, { models }) => await models.User.userCount(),

    getCategories: async (root, args, { models }) =>
      await models.User.getCategories(),

    getCategory: async (root, { categoryId }, { models }) =>
      await models.User.getCategory(categoryId),

    getCategoryRecipes: async (root, { categoryId }, { models }) =>
      await models.User.getCategoryRecipes(categoryId)
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

    deleteUser: async (root, { password }, { models }) =>
      await models.User.deleteUser(password),

    createCategory: async (root, { input }, { models }) =>
      await models.Category.createCategory(input),

    renameCategory: async (root, { input }, { models }) =>
      await models.User.renameCategory(input),

    addRecipe: async (root, { input }, { models }) =>
      await models.User.addRecipe(input),

    removeRecipe: async (root, { input }, { models }) =>
      await models.User.removeRecipe(input),

    deleteCategory: async (root, { input }, { models }) =>
      await models.User.deleteCategory(input)
  },

  CreateCategoryPayload: {
    user: async (root, args, { models }) => root
  }
};

module.exports = resolvers;
