const validator = require('validator');

const resolvers = {
  Query: {
    me: async (_, __, { models }) => {
      return await models.User.me();
    },

    users: async (_, { input }, { models }) =>
      await models.User.getAll(input.name),

    user: async (_, { input }, { models, loaders }) => {
      if (input.id && validator.isMongoId(input.id))
        return await loaders.user.userByIdLoader.load(input.id);

      return await models.User.getByUsername(input.username);
    },

    userCount: async (_, __, { models }) => await models.User.getUserCount(),

    recipes: async (_, __, { models }) => await models.Recipe.getAll(),

    recipe: async (_, { input }, { loaders }) =>
      await loaders.recipe.recipeByIdLoader.load(input.id),

    recipeCount: async (_, __, { models }) =>
      await models.Recipe.getRecipeCount()
  },

  Mutation: {
    signup: async (_, { input }, { auth }) => await auth.signup(input),

    login: async (_, { input }, { auth }) => await auth.login(input),

    followUser: async (_, { input }, { models }) =>
      await models.User.followUser(input.idToFollow),

    updateUser: async (_, { input }, { models }) =>
      await models.User.updateUser(input),

    updateUsername: async (_, { input }, { models }) =>
      await models.User.updateUsername(input),

    updatePassword: async (_, { input }, { models }) =>
      await models.User.updatePassword(input),

    deleteAccount: async (_, { input }, { models }) =>
      await models.User.updatePassword(input.password),

    createRecipe: async (_, { input }, { models }) =>
      await models.Recipe.createRecipe(input),

    updateRecipe: async (_, { input }, { models }) =>
      await models.Recipe.updateRecipe(input),

    publishRecipe: async (_, { input }, { models }) =>
      await models.Recipe.publishRecipe(input),

    commentRecipe: async (_, { input }, { models }) =>
      await models.Recipe.commentRecipe(input),

    updateComment: async (_, { input }, { models }) =>
      await models.Recipe.updateComment(input),

    deleteComment: async (_, { input }, { models }) =>
      await models.Recipe.deleteComment(input),

    likeRecipe: async (_, { input }, { models }) =>
      await models.Recipe.likeRecipe(input),

    unlikeRecipe: async (_, { input }, { models }) =>
      await models.Recipe.unlikeRecipe(input),

    rateRecipe: async (_, { input }, { models }) =>
      await models.Recipe.rateRecipe(input),

    deleteRecipe: async (_, { input }, { models }) =>
      await models.Recipe.deleteRecipe(input)
  },

  User: {
    // followees: async (user, _, { models }) => models.User.getFollowees(user.id),

    followeeCount: async user => user.followees.length,

    // followers: async (user, _, { models }) =>
    //   await models.User.getFollowers(user.id),

    followerCount: async user => user.followers.length,

    recipes: async (user, _, { loaders }) =>
      await loaders.recipe.recipesByUserIdLoader.load(user.id),

    recipeCount: async (user, _, { models }) => user.recipes.length,

    // likedRecipes: async (user, _, { models }) =>
    //   await models.User.getLikedRecipes(user.id),

    likedRecipeCount: async user => user.likedRecipes.length
  },

  Recipe: {
    author: async (recipe, args, { loaders }) =>
      await loaders.user.userByRecipeLoader.load(recipe.id)
  }
};

module.exports = resolvers;
