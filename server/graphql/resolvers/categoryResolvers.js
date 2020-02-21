const { AuthenticationError, ForbiddenError } = require('apollo-server');
const Category = require('../../models/category');
const User = require('../../models/user');
const errorHandler = require('../../helpers/errorHandler');

const resolvers = {
  Query: {
    getCategories: async (root, args, { currentUser }) => Category.find({}),
    getCategory: async (root, { id }, { currentUser }) => Category.findById(id),
    getCategoryRecipes: async (root, { id }, { currentUser }) =>
      Category.findById(id).recipes
  },

  Mutation: {
    createCategory: async (root, { input }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('you must be logged in');
      }

      try {
        const category = new Category({
          user: currentUser.id,
          name: input.name
        });

        currentUser.categories = currentUser.categories.concat(category);

        const patch = { categories: currentUser.categories };

        return await User.findByIdAndUpdate(currentUser.id, patch, {
          new: true
        });
      } catch (error) {
        errorHandler.handleError(error);
      }
    },

    renameCategory: async (root, { input }, { currentUser }) => {
      const { categoryId, name } = input;

      if (!currentUser) {
        throw new AuthenticationError('you must be logged in');
      } else if (!currentUser.categories.includes(categoryId)) {
        throw new ForbiddenError('forbidden');
      }

      try {
        return Category.findByIdAndUpdate(categoryId, { name }, { new: true });
      } catch (error) {
        errorHandler.handleError(error);
      }
    },

    addRecipe: async (root, { input }, { currentUser }) => {
      const { categoryId, recipeId } = input;

      if (!currentUser) {
        throw new AuthenticationError('you must be logged in');
      } else if (!currentUser.categories.includes(categoryId)) {
        throw new ForbiddenError('forbidden');
      }

      try {
        const category = await Category.findById(categoryId);

        const patch = { recipes: category.recipes.concat(recipeId) };

        return Category.findByIdAndUpdate(categoryId, patch, { new: true });
      } catch (error) {
        errorHandler.handleError(error);
      }
    },

    removeRecipe: async (root, { input }, { currentUser }) => {
      const { categoryId, recipeId } = input;

      if (!currentUser) {
        throw new AuthenticationError('you must be logged in');
      } else if (!currentUser.categories.includes(categoryId)) {
        throw new ForbiddenError('forbidden');
      }

      try {
        const category = await Category.findById(categoryId);

        const patch = {
          recipes: category.recipes.filter(recipe => recipe.id !== recipeId)
        };

        return Category.findByIdAndUpdate(categoryId, patch, { new: true });
      } catch (error) {
        errorHandler.handleError(error);
      }
    },

    deleteCategory: async (root, { input }, { currentUser }) => {
      const { categoryId } = input;

      if (!currentUser) {
        throw new AuthenticationError('you must be logged in');
      } else if (!currentUser.categories.includes(input.categoryId)) {
        throw new ForbiddenError('forbidden');
      }

      try {
        Category.findByIdAndRemove(categoryId);
        return true;
      } catch (error) {
        errorHandler.handleError(error);
      }
    }
  }
};

module.exports = resolvers;
