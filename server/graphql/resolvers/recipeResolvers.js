const { GraphQLScalarType, Kind } = require('graphql');
const Recipe = require('../../models/recipe');
const User = require('../../models/user');
const logger = require('../../config/winston');

const recipeResolvers = {
  Recipe: {
    author: async root => await User.findById(root.author)
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
    allRecipes: async (root, args, context) => await Recipe.find({}),
    findRecipe: async (root, args, context) => await Recipe.findById(args.id)
  },

  Mutation: {
    createRecipe: async (root, args, context) => {
      const user = await User.findById(args.author);

      const recipe = new Recipe({
        author: user.id,
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
    }
  }
};

module.exports = recipeResolvers;
