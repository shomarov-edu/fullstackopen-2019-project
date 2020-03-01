const { prisma } = require('../prisma');
const { AuthenticationError, UserInputError } = require('apollo-server');
const comparePasswords = require('../helpers/comparePasswords');
const encryptPassword = require('../helpers/encryptPassword');
const validator = require('../utils/validator');
const { handleError } = require('../utils/errorHandler');

// TODO: Validations and error handling

const generateRecipeModel = currentUser => ({
  // QUERIES:

  getAll: async () => {
    try {
      return await prisma.recipes();
    } catch (error) {
      handleError(error);
    }
  },

  getById: async id => {
    try {
      return await prisma.recipe(id);
    } catch (error) {
      handleError(error);
    }
  },

  getRecipeCount: async () => {
    try {
      await prisma
        .recipesConnection()
        .aggregate()
        .count();
    } catch (error) {
      handleError(error);
    }
  },

  // MUTATIONS:

  createRecipe: async input => {
    try {
      return await prisma.createRecipe({
        author: {
          connect: { id: currentUser.id }
        },
        category: input.category,
        title: input.title,
        description: input.description,
        cookingTime: input.cookingTime,
        difficulty: input.difficulty,
        ingredients: { set: input.ingredients },
        method: { set: input.method },
        notes: { set: input.notes || null },
        tags: { set: input.tags || null }
      });
    } catch (error) {
      handleError(error);
    }
  },

  updateRecipe: async input => {
    try {
      // TODO
    } catch (error) {
      handleError(error);
    }
  },

  publishRecipe: async input => {
    try {
      // TODO
    } catch (error) {
      handleError(error);
    }
  },

  commentRecipe: async input => {
    try {
      // TODO
    } catch (error) {
      handleError(error);
    }
  },

  updateComment: async input => {
    try {
      // TODO
    } catch (error) {
      handleError(error);
    }
  },

  deleteComment: async input => {
    try {
      // TODO
    } catch (error) {
      handleError(error);
    }
  },

  likeRecipe: async input => {
    try {
      // TODO
    } catch (error) {
      handleError(error);
    }
  },

  unlikeRecipe: async input => {
    try {
      // TODO
    } catch (error) {
      handleError(error);
    }
  },

  rateRecipe: async input => {
    try {
      // TODO
    } catch (error) {
      handleError(error);
    }
  },

  deleteRecipe: async input => {
    try {
      // TODO
    } catch (error) {
      handleError(error);
    }
  }
});

module.exports = { generateRecipeModel };
