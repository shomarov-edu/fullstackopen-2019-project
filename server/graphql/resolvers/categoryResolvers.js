const resolvers = {
  Query: {
    getCategories: async (root, args, { services }) =>
      await services.categories.getCategories(),
    getCategory: async (root, { categoryId }, { services }) =>
      await services.categories.getCategory(categoryId),
    getCategoryRecipes: async (root, { categoryId }, { services }) =>
      await services.categories.getCategoryRecipes(categoryId)
  },

  Mutation: {
    createCategory: async (root, { input }, { services }) =>
      await services.categories.createCategory(input),

    renameCategory: async (root, { input }, { services }) =>
      await services.categories.renameCategory(input),

    addRecipe: async (root, { input }, { services }) =>
      await services.categories.addRecipe(input),

    removeRecipe: async (root, { input }, { services }) =>
      await services.categories.removeRecipe(input),

    deleteCategory: async (root, { input }, { services }) =>
      await services.categories.deleteCategory(input)
  }
};

module.exports = resolvers;
