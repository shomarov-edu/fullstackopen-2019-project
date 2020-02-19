const Category = require('../../models/category');

const resolvers = {
  Query: {
    getCategories: async (root, args, context) => Category.find({}),
    getCategory: async (root, { id }, context) => Category.findById(id),
    getCategoryRecipes: async (root, { id }, context) =>
      Category.findById(id).recipes
  },

  Mutation: {
    createCategory: async (root, args, context) => {},
    renameCategory: async (root, args, context) => {},
    addRecipe: async (root, args, context) => {},
    removeRecipe: async (root, args, context) => {},
    deleteCategory: async (root, args, context) => {}
  }
};

module.exports = resolvers;
