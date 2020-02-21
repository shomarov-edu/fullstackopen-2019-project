const Recipe = require('../../models/recipe');
const User = require('../../models/user');
const {
  AuthenticationError,
  ForbiddenError,
  UserInputError
} = require('apollo-server');
const errorHandler = require('../../helpers/errorHandler');

const generateRecipeService = user => ({
  getRecipes: async () => {
    try {
      return await Recipe.find({});
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  getRecipe: async id => {
    try {
      return await Recipe.findById(id);
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  recipeCount: async () => {
    try {
      return await Recipe.collection.countDocuments();
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  createRecipe: async input => {
    if (!user) throw new AuthenticationError('you must be logged in');

    try {
      const user = await User.findById(user.id);

      const recipe = new Recipe({
        author: user.id,
        created: new Date(),
        ...input
      });

      user.recipes = user.recipes.concat(recipe.id);
      await user.save();
      return await recipe.save();
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  updateRecipe: async ({ id, patch }) => {
    if (!user) throw new AuthenticationError('you must be logged in');

    try {
      const recipe = await Recipe.findById(id);

      if (recipe.author !== user.id) throw new ForbiddenError('forbidden');

      return await Recipe.findByIdAndUpdate(id, patch, { new: true });
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  commentRecipe: async ({ recipeId, content }) => {
    if (!user) return null;
    try {
      const recipe = await Recipe.findById(recipeId);

      const comment = { author: user.id, content, date: new Date() };

      recipe.comments.create(comment);

      return await recipe.save();
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  updateComment: async ({ recipeId, commentId, content }) => {
    if (!user) {
      throw new AuthenticationError('you must be logged in');
    }

    try {
      const recipe = await Recipe.findById(recipeId);

      const comment = recipe.comments.id(commentId);

      if (comment.author !== user.id) throw new ForbiddenError('forbidden');

      comment.content = content;

      return await recipe.save();
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  deleteComment: async ({ recipeId, commentId }) => {
    if (!user) {
      throw new AuthenticationError('you must be logged in');
    }

    try {
      const recipe = await Recipe.findById(recipeId);

      recipe.comments.id(commentId).remove();

      return await recipe.save();
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  likeRecipe: async ({ recipeId }) => {
    if (!user) {
      throw new AuthenticationError('you must be logged in');
    }

    try {
      const recipe = await Recipe.findById(recipeId);

      if (recipe.likes.includes(user.id))
        throw new UserInputError('operation not permitted');

      const patch = { likes: recipe.likes.concat(user.id) };
      return await Recipe.findByIdAndUpdate(recipeId, patch, { new: true });
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  unlikeRecipe: async ({ recipeId }) => {
    if (!user) {
      throw new AuthenticationError('you must be logged in');
    }

    try {
      const recipe = await Recipe.findById(recipeId);

      if (!recipe.likes.includes(user.id))
        throw new UserInputError('operation not permitted');

      const patch = {
        likes: recipe.likes.filter(like => like.user !== user.id)
      };

      return await Recipe.findByIdAndUpdate(recipeId, patch, { new: true });
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  rateRecipe: async ({ recipeId, grade }) => {
    if (!user) {
      throw new AuthenticationError('you must be logged in');
    }

    try {
      const recipe = await Recipe.findById(recipeId);

      const grade = {
        user: user.id,
        grade: grade
      };

      const updatedRatings = recipe.ratings
        .filter(rating => rating.user !== user.id)
        .concat(grade);

      const patch = { ratings: updatedRatings };
      return await Recipe.findByIdAndUpdate(recipeId, patch, { new: true });
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  deleteRecipe: async recipeId => {
    if (!user) {
      throw new AuthenticationError('you must be logged in');
    }

    try {
      const recipe = await Recipe.findById(recipeId);

      if (!recipe.author !== user.id) throw new ForbiddenError('forbidden');

      await Recipe.findByIdAndRemove(recipeId);
      return true;
    } catch (error) {
      errorHandler.handleError(error);
      return false;
    }
  }
});

module.exports = { generateRecipeService };
