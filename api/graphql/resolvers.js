const resolvers = {
  Query: {
    me: async (_, __, { currentUser, models }) =>
      await models.User.getByUsername(currentUser.username),

    users: async (_, __, { models }) => {
      await models.User.getAll();
    },

    user: async (_, { input }, { models }) =>
      await models.User.getByUsername(input.username),

    userCount: async (_, __, { models }) => await models.User.getUserCount(),

    recipes: async (_, __, { models }) => await models.Recipe.getRecipes(),

    recipe: async (_, { input }, { models }) =>
      await models.Recipe.getById(input.id),

    recipeCount: async (_, __, { models }) =>
      await models.Recipe.getRecipeCount()
  },

  Mutation: {
    signup: async (_, { input }, { auth }) => await auth.signup(input),

    login: async (_, { input }, { auth }) => await auth.login(input),

    followUser: async (_, { input }, { models }) =>
      await models.User.followUser(input.usernameToFollow),

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
    followees: async user => user.following.length,

    followeeCount: async user => user.following.length,

    followers: async (user, _, { models }) =>
      await models.User.getFollowers(user.username),

    followerCount: async user => user.following.length,

    recipes: async (user, _, { models }) =>
      await models.User.getRecipes(user.username),

    recipeCount: async user => user.recipes.length,

    likedRecipes: async (user, _, { models }) =>
      await models.User.getLikedRecipes(user.username),

    likedRecipeCount: async user => user.likedRecipes.length
  },

  Recipe: {
    author: async (recipe, args, { models }) =>
      await models.recipe({ id: recipe.id }).author()
  }
};

module.exports = resolvers;
