const { GraphQLScalarType, Kind } = require('graphql');
const {
  AuthenticationError,
  ForbiddenError,
  UserInputError
} = require('apollo-server');
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
    getRecipe: async (root, { id }, context) => await Recipe.findById(id),
    recipeCount: async (root, args, context) =>
      await Recipe.collection.countDocuments(),
    myRecipes: async (root, args, context) => context.currentUser.recipes,
    myRecipeCount: (root, args, context) => context.currentUser.recipes.length
  },

  Mutation: {
    createRecipe: async (root, args, { currentUser }) => {
      if (!currentUser) {
        return new AuthenticationError('must authenticate');
      }

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

    commentRecipe: async (root, { input }, { currentUser }) => {
      if (!currentUser) {
        return new AuthenticationError('must authenticate');
      }

      try {
        const { recipeId, content } = input;
        const recipe = await Recipe.findById(recipeId);

        const comment = { author: currentUser.id, content };

        const patch = { comments: recipe.comments.concat(comment) };
        return await Recipe.findByIdAndUpdate(recipeId, patch, { new: true });
      } catch (error) {
        logger.error(error);
      }
    },

    updateComment: async (root, { input }, { currentUser }) => {
      if (!currentUser) {
        return new AuthenticationError('must authenticate');
      }

      try {
        const { recipeId, content } = input;
        const recipe = await Recipe.findById(recipeId);

        const comment = { author: currentUser.id, content };

        const patch = { comments: recipe.comments.concat(comment) };
        return await Recipe.findByIdAndUpdate(recipeId, patch, { new: true });
      } catch (error) {
        logger.error(error);
      }
    },

    deleteComment: async (root, { input }, { currentUser }) => {
      if (!currentUser) {
        return new AuthenticationError('must authenticate');
      }

      try {
        const { recipeId, content } = input;
        const recipe = await Recipe.findById(recipeId);

        const comment = { author: currentUser.id, content };

        const patch = { comments: recipe.comments.concat(comment) };
        return await Recipe.findByIdAndUpdate(recipeId, patch, { new: true });
      } catch (error) {
        logger.error(error);
      }
    },

    likeRecipe: async (root, { recipeId, userId }, { currentUser }) => {
      if (!currentUser) {
        return new AuthenticationError('must authenticate');
      }

      try {
        const recipe = await Recipe.findById(recipeId);
        if (recipe.likes.includes(userId)) {
          return new UserInputError('operation not permitted');
        }

        const patch = { likes: recipe.likes.concat(userId) };
        return await Recipe.findByIdAndUpdate(recipeId, patch, { new: true });
      } catch (error) {
        logger.error(error);
      }
    },

    unlikeRecipe: async (root, { recipeId, userId }, { currentUser }) => {
      if (!currentUser) {
        return new AuthenticationError('must authenticate');
      }

      try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe.likes.includes(userId)) {
          return new UserInputError('operation not permitted');
        }

        const patch = {
          likes: recipe.likes.filter(like => like.user !== userId)
        };

        return await Recipe.findByIdAndUpdate(recipeId, patch, { new: true });
      } catch (error) {
        logger.error(error);
      }
    },

    rateRecipe: async (root, { recipeId, grade }, { currentUser }) => {
      if (!currentUser) {
        return new AuthenticationError('must authenticate');
      }

      try {
        const recipe = await Recipe.findById(recipeId);

        const grade = {
          user: currentUser.id,
          grade: grade
        };

        const updatedRatings = recipe.ratings
          .filter(rating => rating.user !== currentUser.id)
          .concat(grade);

        const patch = { ratings: updatedRatings };
        return await Recipe.findByIdAndUpdate(recipeId, patch, { new: true });
      } catch (error) {
        logger.error(error);
      }
    },

    deleteRecipe: async (root, { recipeId }, { currentUser }) => {
      if (!currentUser) {
        return new AuthenticationError('must authenticate');
      }

      try {
        const recipe = await Recipe.findById(recipeId);

        if (!recipe.author !== currentUser.id) {
          return new ForbiddenError('forbidden');
        }
        await Recipe.findByIdAndRemove(recipeId);
        return true;
      } catch (error) {
        logger.error(error);
        return false;
      }
    }
  }
};

module.exports = recipeResolvers;
