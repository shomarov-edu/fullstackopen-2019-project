const Recipe = require('../../models/recipe');
const User = require('../../models/user');
const {
  AuthenticationError,
  ForbiddenError,
  UserInputError
} = require('apollo-server');
const errorHandler = require('../../helpers/errorHandler');

const generateRecipeService = currentUser => ({
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
    if (!currentUser) return null;

    try {
      const user = await User.findById(currentUser.id);

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
    if (!currentUser) return null;

    try {
      const recipe = await Recipe.findById(id);

      if (recipe.author !== currentUser.id)
        throw new ForbiddenError('forbidden');

      return await Recipe.findByIdAndUpdate(id, patch, { new: true });
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  commentRecipe: async ({ recipeId, content }) => {
    if (!currentUser) return null;

    try {
      const recipe = await Recipe.findById(recipeId);

      const comment = { author: currentUser.id, content, date: new Date() };

      recipe.comments.create(comment);

      return await recipe.save();
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  updateComment: async ({ recipeId, commentId, content }) => {
    if (!currentUser) return null;

    try {
      const recipe = await Recipe.findById(recipeId);

      const comment = recipe.comments.id(commentId);

      if (comment.author !== currentUser.id)
        throw new ForbiddenError('forbidden');

      comment.content = content;

      return await recipe.save();
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  deleteComment: async ({ recipeId, commentId }) => {
    if (!currentUser) return null;

    try {
      const recipe = await Recipe.findById(recipeId);

      recipe.comments.id(commentId).remove();

      return await recipe.save();
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  likeRecipe: async ({ recipeId }) => {
    if (!currentUser) return null;

    try {
      const recipe = await Recipe.findById(recipeId);

      if (recipe.likes.includes(currentUser.id))
        throw new UserInputError('operation not permitted');

      const patch = { likes: recipe.likes.concat(currentUser.id) };

      return await Recipe.findByIdAndUpdate(recipeId, patch, { new: true });
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  unlikeRecipe: async ({ recipeId }) => {
    if (!currentUser) return null;

    try {
      const recipe = await Recipe.findById(recipeId);

      if (!recipe.likes.includes(currentUser.id))
        throw new UserInputError('operation not permitted');

      const patch = {
        likes: recipe.likes.filter(like => like.user !== currentUser.id)
      };

      return await Recipe.findByIdAndUpdate(recipeId, patch, { new: true });
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  rateRecipe: async ({ recipeId, grade }) => {
    if (!currentUser) return null;

    try {
      const recipe = await Recipe.findById(recipeId);

      const rating = {
        user: currentUser.id,
        grade
      };

      const updatedRatings = recipe.ratings
        .filter(rating => rating.user !== currentUser.id)
        .concat(rating);

      const patch = { ratings: updatedRatings };
      return await Recipe.findByIdAndUpdate(recipeId, patch, { new: true });
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  deleteRecipe: async recipeId => {
    if (!currentUser) return null;

    try {
      const recipe = await Recipe.findById(recipeId);

      if (!recipe.author !== currentUser.id)
        throw new ForbiddenError('forbidden');

      await Recipe.findByIdAndRemove(recipeId);
      return true;
    } catch (error) {
      errorHandler.handleError(error);
      return false;
    }
  }
});

module.exports = { generateRecipeService };
