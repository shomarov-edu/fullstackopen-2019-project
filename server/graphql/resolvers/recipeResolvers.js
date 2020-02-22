const { GraphQLScalarType, Kind } = require('graphql');

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
    author: async ({ author }, args, { services }) =>
      await services.users.getUser(author)
  },

  Comment: {
    author: async ({ author }, args, { services }) =>
      await services.users.getUser(author)
  },

  Query: {
    getRecipes: async (root, args, { services }) =>
      await services.recipes.getRecipes(),

    getRecipe: async (root, { id }, { services }) =>
      await services.recipes.getRecipe(id),

    recipeCount: async (root, args, { services }) =>
      await services.recipes.recipeCount()
  },

  Mutation: {
    createRecipe: async (root, { input }, { services }) =>
      await services.recipes.createRecipe(input),

    updateRecipe: async (root, { input }, { services }) =>
      await services.recipes.updateRecipe(input),

    commentRecipe: async (root, { input }, { services }) =>
      await services.recipes.commentRecipe(input),

    updateComment: async (root, { input }, { services }) =>
      await services.recipes.updateComment(input),

    deleteComment: async (root, { input }, { services }) =>
      await services.recipes.deleteComment(input),

    likeRecipe: async (root, { input }, { services }) =>
      await services.recipes.likeRecipe(input),

    unlikeRecipe: async (root, { input }, { services }) =>
      await services.recipes.unlikeRecipe(input),

    rateRecipe: async (root, { input }, { services }) =>
      await services.recipes.rateRecipe(input),

    deleteRecipe: async (root, { input }, { services }) =>
      await services.recipes.deleteRecipe(input.recipeId)
  }
};

module.exports = recipeResolvers;
