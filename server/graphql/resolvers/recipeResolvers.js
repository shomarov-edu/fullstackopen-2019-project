const { GraphQLScalarType, Kind } = require('graphql');
const { AuthenticationError } = require('apollo-server');
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
    getRecipes: async (root, args, context) => await Recipe.find({}),
    getRecipe: async (root, args, context) => await Recipe.findById(args.id),
    recipeCount: async (root, args, context) =>
      await Recipe.collection.countDocuments()
  },

  Mutation: {
    createRecipe: async (root, args, { currentUser }) => {
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

      try {
        await recipe.save();
        user.recipes = user.recipes.concat(recipe._id);
        await user.save();
        return recipe;
      } catch (error) {
        logger.error(error);
      }
    },

    updateRecipe: async (root, { input }, { currentUser }) => {
      if (!currentUser) return new AuthenticationError('must authenticate');

      const { id, patch } = input;

      try {
        return await Recipe.findByIdAndUpdate(id, patch, { new: true });
      } catch (error) {
        logger.error(error);
      }
    },

    commentRecipe: async (root, args, context) => {
      try {
        const recipe = await Recipe.findById(args.id);

        const comment = {
          author: args.author,
          comment: args.comment
        };

        recipe.comments = recipe.comments.concat(comment);
        return await recipe.save();
      } catch (error) {
        logger.error(error);
      }
    },

    likeRecipe: async (root, args, context) => {
      try {
        const recipe = await Recipe.findById(args.id);

        recipe.likes = recipe.likes.concat(args.user);

        return await recipe.save();
      } catch (error) {
        logger.error(error);
      }
    },

    unlikeRecipe: async (root, args, context) => {
      try {
        const recipe = await Recipe.findById(args.id);

        recipe.likes = recipe.likes.filter(like => like.user !== args.user);

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

    deleteRecipe: async (root, { id }, context) => {
      try {
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
