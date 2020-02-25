const { GraphQLScalarType, Kind } = require('graphql');

const recipeResolvers = {
  Query: {
    getRecipes: async (root, args, { models }) =>
      await models.Recipe.getRecipes(),

    getRecipe: async (root, { id }, { models }) =>
      await models.Recipe.getRecipe(id),

    recipeCount: async (root, args, { models }) =>
      await models.Recipe.recipeCount()
  },

  Mutation: {
    createRecipe: async (root, { input }, { models }) =>
      await models.Recipe.createRecipe(input),

    updateRecipe: async (root, { input }, { models }) =>
      await models.Recipe.updateRecipe(input),

    commentRecipe: async (root, { input }, { models }) =>
      await models.Recipe.commentRecipe(input),

    updateComment: async (root, { input }, { models }) =>
      await models.Recipe.updateComment(input),

    deleteComment: async (root, { input }, { models }) =>
      await models.Recipe.deleteComment(input),

    likeRecipe: async (root, { input }, { models }) =>
      await models.Recipe.likeRecipe(input),

    unlikeRecipe: async (root, { input }, { models }) =>
      await models.Recipe.unlikeRecipe(input),

    rateRecipe: async (root, { input }, { models }) =>
      await models.Recipe.rateRecipe(input),

    deleteRecipe: async (root, { input }, { models }) =>
      await models.Recipe.deleteRecipe(input.recipeId)
  },

  Recipe: {
    author: async ({ author }, args, { models }) =>
      await models.User.getUser(author)
  },

  Comment: {
    author: async ({ author }, args, { models }) =>
      await models.User.getUser(author)
  }
};

module.exports = recipeResolvers;