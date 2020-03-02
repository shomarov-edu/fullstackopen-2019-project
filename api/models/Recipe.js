const { prisma } = require('../prisma');
const {
  AuthenticationError,
  ForbiddenError,
  UserInputError
} = require('apollo-server');
const validator = require('../utils/validator');

// TODO: Validations and error handling

const generateRecipeModel = currentUser => ({
  // QUERIES:

  getAll: async () => {
    return await prisma.recipes();
  },

  getById: async id => {
    return await prisma.recipe(id);
  },

  getRecipeCount: async () => {
    await prisma
      .recipesConnection()
      .aggregate()
      .count();
  },

  // MUTATIONS:

  createRecipe: async input => {
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
  },

  updateRecipe: async input => {
    // TODO
  },

  publishRecipe: async input => {
    // TODO
  },

  commentRecipe: async input => {
    // TODO
  },

  updateComment: async input => {
    // TODO
  },

  deleteComment: async input => {
    // TODO
  },

  likeRecipe: async input => {
    // TODO
  },

  unlikeRecipe: async input => {
    // TODO
  },

  rateRecipe: async input => {
    // TODO
  },

  deleteRecipe: async input => {
    // TODO
  }
});

module.exports = { generateRecipeModel };
