const { GraphQLScalarType, Kind } = require('graphql');
const {
  AuthenticationError,
  ForbiddenError,
  UserInputError
} = require('apollo-server');
const Recipe = require('../../models/recipe');
const errorHandler = require('../../helpers/errorHandler');

const recipeResolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      throw new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }
      return null;
    }
  }),

  Recipe: {
    author: async ({ author }, args, context) =>
      await context.services.users(author)
  },

  Comment: {
    author: async ({ author }, args, context) =>
      await context.services.users(author)
  },

  Query: {
    getRecipes: async (root, args, context) =>
      await context.services.recipes.getRecipes(),

    getRecipe: async (root, { id }, context) =>
      await context.services.recipes.getRecipe(id),

    recipeCount: async (root, args, context) =>
      await context.services.recipes.recipeCount()
  },

  Mutation: {
    createRecipe: async (root, { input }, context) =>
      await context.services.recipes.createRecipe(input),

    updateRecipe: async (root, { input }, context) =>
      await context.services.recipes.updateRecipe(input),

    commentRecipe: async (root, { input }, context) =>
      await context.services.recipes.commentRecipe(input),

    updateComment: async (root, { input }, context) =>
      await context.services.recipes.updateComment(input),

    deleteComment: async (root, { input }, context) =>
      await context.services.recipes.deleteComment(input),

    likeRecipe: async (root, { input }, context) =>
      await context.services.recipes.likeRecipe(input),

    unlikeRecipe: async (root, { input }, context) =>
      await context.services.recipes.unlikeRecipe(input),

    rateRecipe: async (root, { input }, context) =>
      await context.services.recipes.rateRecipe(input),

    deleteRecipe: async (root, input, context) =>
      await context.services.recipes.deleteRecipe(input.recipeId)
  }
};

module.exports = recipeResolvers;
