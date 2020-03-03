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

  getAll: async () => await prisma.recipes(),

  getById: async id => await prisma.recipe(id),

  getUserByRecipeId: async id => {
    const recipe = await prisma.recipe({ id });
    const recipeAuthor = await prisma.recipe({ id }).author();
    return recipeAuthor;
  },

  getRecipeCount: async () =>
    await prisma
      .recipesConnection()
      .aggregate()
      .count(),

  // MUTATIONS:

  createRecipe: async input => {
    if (!currentUser) return null;

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
    if (!currentUser) return null;
    // TODO
  },

  publishRecipe: async input => {
    if (!currentUser) return null;
    // TODO
  },

  commentRecipe: async input => {
    if (!currentUser) return null;
    // TODO
  },

  updateComment: async input => {
    if (!currentUser) return null;
    // TODO
  },

  deleteComment: async input => {
    if (!currentUser) return null;
    // TODO
  },

  likeRecipe: async input => {
    if (!currentUser) return null;
    // TODO
  },

  unlikeRecipe: async input => {
    if (!currentUser) return null;
    // TODO
  },

  rateRecipe: async input => {
    if (!currentUser) return null;
    // TODO
  },

  deleteRecipe: async input => {
    if (!currentUser) return null;
    // TODO
  }
});

module.exports = { generateRecipeModel };
