const {
  AuthenticationError,
  ForbiddenError,
  UserInputError
} = require('apollo-server');
const Category = require('../../models/category');
const User = require('../../models/user');
const errorHandler = require('../../helpers/errorHandler');

const generateCategoryService = currentUser => {
  if (!currentUser) {
    throw new AuthenticationError('you must be logged in');
  }

  return {
    getCategories: async () => {
      try {
        const user = await User.findById(currentUser.id).categories;
        return user.categories;
      } catch (error) {
        errorHandler.handleError(error);
      }
    },

    getCategory: async categoryId => {
      try {
        return await Category.findById(categoryId).populate('recipes');
      } catch (error) {
        errorHandler.handleError(error);
      }
    },

    getCategoryRecipes: async categoryId => {
      try {
        const category = await Category.findById(categoryId).populate(
          'recipes'
        );
        return category.recipes;
      } catch (error) {
        errorHandler.handleError(error);
      }
    },

    createCategory: async input => {
      try {
        const user = await User.findById(currentUser.id);

        const category = new Category({
          currentUser: currentUser.id,
          name: input.name
        });

        user.categories.create(category);

        return await user.save();
      } catch (error) {
        errorHandler.handleError(error);
      }
    },

    renameCategory: async ({ categoryId, name }) => {
      if (!currentUser.categories.includes(categoryId)) {
        throw new ForbiddenError('forbidden');
      }

      try {
        return Category.findByIdAndUpdate(categoryId, { name }, { new: true });
      } catch (error) {
        errorHandler.handleError(error);
      }
    },

    addRecipe: async ({ categoryId, recipeId }) => {
      if (!currentUser.categories.includes(categoryId)) {
        throw new ForbiddenError('forbidden');
      }

      try {
        const user = await User.findById(currentUser.id);

        const category = await user.categories.id(categoryId);

        if (!category) throw new UserInputError('category not found');

        category.recipes = category.recipes.concat(recipeId);

        return await user.save();
      } catch (error) {
        errorHandler.handleError(error);
      }
    },

    removeRecipe: async ({ categoryId, recipeId }) => {
      if (!currentUser.categories.includes(categoryId)) {
        throw new ForbiddenError('forbidden');
      }

      try {
        const user = await User.findById(currentUser.id);

        const category = await user.categories.id(categoryId);

        category.recipes = category.recipes.filter(
          recipe => recipe.id !== recipeId
        );

        return await user.save();
      } catch (error) {
        errorHandler.handleError(error);
      }
    },

    deleteCategory: async ({ categoryId }) => {
      try {
        const user = await User.findById(currentUser.id);

        user.categories.id(categoryId).remove();

        return await user.save();
      } catch (error) {
        errorHandler.handleError(error);
      }
    }
  };
};

module.exports = generateCategoryService;
