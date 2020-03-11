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

    // Fetch user with either id or username
    user: async (_, { input }, { loaders }) => {
      if (input.id && validator.isMongoId(input.id))
        return await loaders.user.userByIdLoader.load(input.id);

      return await loaders.user.userByUsernameLoader.load(input.username);
    },

    userCount: async (_, __, { models }) => await models.User.getUserCount(),

    recipes: async (_, __, { models }) => await models.Recipe.getAll(),

    recipeCount: async (_, __, { models }) =>
      await models.Recipe.getPublishedRecipeCount(),

    publishedRecipes: async (_, __, { models }) =>
      await models.Recipe.getPublishedRecipes(),

    publishedRecipeCount: async (_, __, { models }) =>
      await models.Recipe.getPublishedRecipeCount(),

    recipe: async (_, { input }, { loaders }) =>
      await loaders.recipe.recipeByIdLoader.load(input.id)
  },

  Mutation: {
    signup: async (_, { input }, { auth }) => await auth.signup(input),

    login: async (_, { input }, { auth }) => await auth.login(input),

    followUser: async (_, { input }, { models }) =>
      await models.User.followUser(input.idToFollow),

    unfollowUser: async (_, { input }, { models }) =>
      await models.User.unfollowUser(input.idToUnfollow),

    updateName: async (_, { input }, { models }) =>
      await models.User.updateName(input),

    updateEmail: async (_, { input }, { models }) =>
      await models.User.updateEmail(input),

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

    editComment: async (_, { input }, { models }) =>
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
      user;
      if (
        !currentUser ||
        (user.id !== currentUser.id && currentUser.role !== 'ADMIN')
      ) {
        return null;
      } else {
        return user.email;
      }
    },

    role: (user, _, { currentUser }) => {
      if (!currentUser || currentUser.role !== 'ADMIN') return null;
      return user.role;
    },

    recipes: async (user, _, { currentUser, loaders }) => {
      // Authorize viewing all recipes including drafts only to owner and admin
      if (
        !currentUser ||
        (user.id !== currentUser.id && currentUser.role !== 'ADMIN')
      ) {
        return [];
      }
      return await loaders.recipe.recipesByUserIdLoader.load(user.id);
    },

    recipeCount: async user => user.recipes.length,

    publishedRecipes: async (user, _, { loaders }) =>
      await loaders.recipe.publishedRecipesByUserIdLoader.load(user.id),

    publishedRecipeCount: (user, _, __) =>
      user.recipes.filter(r => r.published === true),

    likedRecipes: async (user, _, { models }) =>
      await models.User.getLikedRecipesByUserId(user.id),

    following: async (user, _, { models }) =>
      await models.User.getFollowingByUserId(user.id),

    followeeCount: user => user.following.length,

    followers: async (user, _, { models }) =>
      await models.User.getFollowersByUserId(user.id),

    followerCount: async user => user.followers.length,

    likedRecipeCount: async user => user.likedRecipes.length
  },

  Recipe: {
    author: async (recipe, _, { loaders }) => {
      return await loaders.user.userByIdLoader.load(recipe.author.id);
    },

    likes: (recipe, _, __) => (recipe.likedBy ? recipe.likedBy.length : 0),

    commentCount: (recipe, _, __) => recipe.comments.length,

    rating: async (recipe, args, { models }) =>
      recipe.ratings.reduce((a, b) => a + b, 0) / recipe.ratings.length || 0
  },

  Comment: {
    author: async (comment, _, { loaders }) =>
      await loaders.user.userByIdLoader.load(comment.author.id)
  }
};

module.exports = resolvers;
