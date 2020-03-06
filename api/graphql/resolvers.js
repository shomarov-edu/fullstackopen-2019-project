const { Validator } = require('class-validator');
const validator = new Validator();

const resolvers = {
  Query: {
    // Fetch current user
    me: async (_, __, { models }) => {
      return await models.User.me();
    },

    // Fetch all users. Do I need this?
    users: async (_, { input }, { models }) => await models.User.getAll(input),

    user: async (_, { input }, { loaders }) => {
      console.log(input);

      if (input.id && validator.isMongoId(input.id))
        return await loaders.user.userByIdLoader.load(input.id);

      return await loaders.user.userByUsernameLoader.load(input.username);
    },

    userCount: async (_, __, { models }) => await models.User.getUserCount(),

    recipes: async (_, __, { models }) => await models.Recipe.getAll(),

    publishedRecipes: async (_, __, { models }) =>
      await models.Recipe.getPublishedRecipes(),

    recipe: async (_, { input }, { loaders }) =>
      await loaders.recipe.recipeByIdLoader.load(input.id),

    recipeCount: async (_, __, { models }) =>
      await models.Recipe.getPublishedRecipeCount()
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
      await models.Recipe.togglePublishRecipe(input),

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
    // E-Mail field viewable only to owner and admin
    email: (user, _, { currentUser }) => {
      if (
        !currentUser ||
        user.id !== currentUser.id ||
        currentUser.role !== 'ADMIN'
      )
        return null;
    },

    role: (user, _, { currentUser }) => {
      if (!currentUser || currentUser.role !== 'ADMIN') return null;
      return user.role;
    },

    recipes: async (user, _, { loaders }) =>
      await loaders.recipe.recipesByUserIdLoader.load(user.id),

    recipeCount: async user => user.recipes.length,

    // Should I put this in loaders or models?
    // followees: async (user, { loaders }) =>
    //   loaders.user.followeesByUserIdLoader.load(user.id),

    followeeCount: async user => user.followees.length,

    // Should I put this in loaders or models?
    // followers: async (user, { loaders }) =>
    //   loaders.user.followersByUserIdLoader.load(user.id),

    followerCount: async user => user.followers.length,

    publishedRecipes: user => {
      console.log(user);

      return user.recipes.filter(r => r.published);
    },

    publishedRecipeCount: (user, _, __) =>
      user.recipes.filter(r => r.published).length,

    likedRecipeCount: async user => user.likedRecipes.length
  },

  Recipe: {
    author: async (recipe, _, { loaders }) => {
      return await loaders.user.userByUsernameLoader.load(
        recipe.author.username
      );
    },

    rating: async (recipe, args, { models }) =>
      recipe.ratings.reduce((a, b) => a + b, 0) / recipe.ratings.length || 0
  }
};

module.exports = resolvers;
