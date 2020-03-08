const { prisma } = require('../prisma');
const {
  AuthenticationError,
  ForbiddenError,
  UserInputError
} = require('apollo-server');
const validator = require('../utils/validator');

// TODO: Validations and error handling

const fullRecipeFragment = `
fragment FullRecipe on Recipe {
  id
  title
  author {
    username
  }
  category
  description
  cookingTime
  difficulty
  ingredients
  method
  notes
  tags
  source
  created
  updated
  published
  likedBy {
    name
    username
  }
  comments {
    id
    author {
      id
    }
    content
  }
  ratings {
    id
    rater {
      username
    }
    grade
  }
}
`;

const generateRecipeModel = currentUser => ({
  // QUERIES:

  getAll: async () => {
    const recipes = await prisma.recipes().$fragment(fullRecipeFragment);

    return recipes;
  },

  // Retrieval of full recipe delails by recipe id => moved to dataloaders

  getById: async id => await prisma.recipe(id).$fragment(fullRecipeFragment),

  // Get recipe count including private and draft recipes

  getRecipeCount: async () =>
    await prisma
      .recipesConnection()
      .aggregate()
      .count(),

  // Fetch all published recipes

  getPublishedRecipes: async () =>
    await prisma
      .recipes({
        where: { published: true }
      })
      .$fragment(fullRecipeFragment),

  // Count all PUBLISHED recipes in database

  getPublishedRecipeCount: async () =>
    await prisma
      .recipesConnection({
        where: { published: true }
      })
      .aggregate()
      .count(),

  // MUTATIONS:

  createRecipe: async input => {
    if (!currentUser) return null;

    return await prisma
      .createRecipe({
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
      })
      .$fragment(fullRecipeFragment);
  },

  updateRecipe: async input => {
    if (!currentUser) return null;

    const { id, ...recipeData } = input;

    // Check recipe existence

    const recipe = await prisma.recipe({ id }).$fragment(`
    fragment AuthorAndPublished on Recipe {
      author {
        id
      }
    }
    `);

    if (!recipe) throw new UserInputError('recipe does not exist');

    // Validate recipe author

    if (recipe.author.id !== currentUser.id)
      throw new ForbiddenError('forbidden');

    const updatedRecipe = await prisma
      .updateRecipe({
        where: { id },
        data: recipeData
      })
      .$fragment(fullRecipeFragment);

    return updatedRecipe;
  },

  togglePublishRecipe: async input => {
    if (!currentUser) return null;

    const recipe = await prisma.recipe({ id: input.id }).$fragment(`
    fragment AuthorAndPublished on Recipe {
      author {
        id
      }
      published
    }
    `);

    // Check recipe existence

    if (!recipe) throw new UserInputError('recipe does not exist');

    // Validate recipe author

    if (recipe.author.id !== currentUser.id)
      throw new ForbiddenError('forbidden');

    const updatedRecipe = await prisma
      .updateRecipe({
        where: { id: input.id },
        data: {
          published: !recipe.published
        }
      })
      .$fragment(fullRecipeFragment);

    return updatedRecipe;
  },

  commentRecipe: async input => {
    if (!currentUser) return null;

    const updatedRecipe = await prisma
      .updateRecipe({
        where: { id: input.id },
        data: {
          comments: {
            create: [
              {
                author: {
                  connect: { id: currentUser.id }
                },
                content: input.content
              }
            ]
          }
        }
      })
      .$fragment(fullRecipeFragment);

    return updatedRecipe;
  },

  updateComment: async input => {
    if (!currentUser) return null;

    const { recipeId, commentId, content } = input;

    const recipe = await prisma.recipe({ id: recipeId }).$fragment(`
    fragment Comments on Recipe {
      comments {
        id
        author {
          id
        }
        content
      }
    }
    `);

    // Check recipe existence

    if (!recipe) throw new UserInputError('recipe does not exist');

    const comment = recipe.comments.find(comment => comment.id === commentId);

    // Validate comment author

    if (!comment || comment.author.id !== currentUser.id)
      throw new ForbiddenError('forbidden');

    const updatedRecipe = await prisma
      .updateRecipe({
        where: { id: recipeId },
        data: {
          comments: {
            updateMany: [
              {
                where: { id: commentId },
                data: {
                  content: content
                }
              }
            ]
          }
        }
      })
      .$fragment(fullRecipeFragment);

    console.log(updatedRecipe.comments);

    return updatedRecipe;
  },

  deleteComment: async input => {
    if (!currentUser) return null;

    const { recipeId, commentId } = input;

    const recipe = await prisma.recipe({ id: recipeId }).$fragment(`
    fragment Comments on Recipe {
      comments {
        id
        author {
          id
        }
        content
      }
    }
    `);

    // Check recipe existence

    if (!recipe) throw new UserInputError('recipe does not exist');

    const comment = recipe.comments.find(comment => comment.id === commentId);

    if (!comment) throw new UserInputError('comment does not exist');

    // Validate comment author

    if (comment.author.id !== currentUser.id)
      throw new ForbiddenError('forbidden');

    const updatedRecipe = await prisma
      .updateRecipe({
        where: { id: recipeId },
        data: {
          comments: {
            delete: { id: commentId }
          }
        }
      })
      .$fragment(fullRecipeFragment);

    return updatedRecipe;
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
