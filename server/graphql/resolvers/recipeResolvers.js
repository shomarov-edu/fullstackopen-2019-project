const { GraphQLScalarType, Kind } = require('graphql');
const { AuthenticationError, ForbiddenError } = require('apollo-server');
const bcrypt = require('bcrypt');
const Recipe = require('../../models/recipe');
const User = require('../../models/user');
const logger = require('../../config/winston');

const fetchUser = async id => {
  try {
    return await User.findById(id);
  } catch (error) {
    logger.error(error);
  }
};

const recipeResolvers = {
  Recipe: {
    author: async root => await fetchUser(root.author)
  },

  Comment: {
    author: async root => await fetchUser(root.author)
  },

  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value);
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

  Query: {
    getRecipes: async (root, args) => await Recipe.find({}),
    getRecipe: async (root, args) => await Recipe.findById(args.id),
    recipeCount: async (root, args) => await Recipe.collection.countDocuments(),
    myRecipes: async (root, args, context) => context.currentUser.recipes,
    myRecipeCount: (root, args, context) => context.currentUser.recipes.length
  },

  Mutation: {
    createRecipe: async (root, args, { currentUser }) => {
      try {
        const user = await fetchUser(currentUser.id);

        const recipe = new Recipe({
          author: args.author,
          title: args.title,
          description: args.description,
          cookTime: args.time,
          difficulty: args.difficulty,
          ingredients: args.ingredients,
          method: args.method,
          notes: args.notes,
          tags: args.tags,
          source: args.source,
          created: new Date()
        });

        await recipe.save();
        user.recipes = user.recipes.concat(recipe._id);
        await user.save();
        return recipe;
      } catch (error) {
        logger.error(error);
      }
    },

    updateRecipe: async (root, { input }, { currentUser }) => {
      try {
        const { id, patch } = input;
        if (!currentUser) {
          return new AuthenticationError('must authenticate');
        } else if (!currentUser.recipes.contains(id)) {
          return new ForbiddenError('forbidden');
        }

        return await Recipe.findByIdAndUpdate(id, patch, { new: true });
      } catch (error) {
        logger.error(error);
      }
    },

    commentRecipe: async (root, { input }, context) => {
      try {
        const { id, author, content } = input;
        const recipe = await Recipe.findById(id);

        const comment = { author, content };

        const patch = { comments: recipe.comments.concat(comment) };
        return await Recipe.findByIdAndUpdate(id, patch, { new: true });
      } catch (error) {
        logger.error(error);
      }
    },

    likeRecipe: async (root, { recipeId, userId }, context) => {
      try {
        const recipe = await Recipe.findById(recipeId);
        recipe.likes = recipe.likes.concat(userId);
        return await recipe.save();
      } catch (error) {
        logger.error(error);
      }
    },

    unlikeRecipe: async (root, { recipeId, userId }, context) => {
      try {
        const recipe = await Recipe.findById(recipeId);

        recipe.likes = recipe.likes.filter(like => like.user !== userId);

        return await recipe.save();
      } catch (error) {
        logger.error(error);
      }
    },

    rateRecipe: async (root, args, context) => {
      try {
        const recipe = await Recipe.findById(args.id);

        const grade = {
          user: args.user,
          grade: args.grade
        };

        recipe.ratings = recipe.ratings.concat(grade);
        return await recipe.save();
      } catch (error) {
        logger.error(error);
      }
    },

    deleteRecipe: async (root, { id }, { currentUser }) => {
      try {
        if (!currentUser) {
          return new AuthenticationError('must authenticate');
        } else if (!currentUser.recipes.contains(id)) {
          return new ForbiddenError('forbidden');
        }
        await Recipe.findByIdAndRemove(id);
        return true;
      } catch (error) {
        logger.error(error);
        return false;
      }
    }
  }
};

module.exports = recipeResolvers;
