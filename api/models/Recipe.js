const { prisma } = require('../prisma');
const {
  AuthenticationError,
  ForbiddenError,
  UserInputError
} = require('apollo-server');
const { userDetails, recipeDetails } = require('../graphql/fragments');
// TODO: Validations and error handling

const generateRecipeModel = currentUser => ({
  // QUERIES:

  getAll: async () => {
    const recipes = await prisma.recipes().$fragment(recipeDetails);

    return recipes;
  },

  // Fetch all recipes of specified user
  getByUserId: async userId =>
    await prisma
      .recipes({
        where: {
          author: {
            id: userId
          }
        }
      })
      .$fragment(recipeDetails),

  // Retrieval of full recipe delails by recipe id => moved to dataloaders
  getById: async id => await prisma.recipe(id).$fragment(recipeDetails),

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
      .$fragment(recipeDetails),

  // Count all PUBLISHED recipes in database
  getPublishedRecipeCount: async () =>
    await prisma
      .recipesConnection({
        where: { published: true }
      })
      .aggregate()
      .count(),

  getUnpublishedRecipes: async () =>
    await prisma
      .recipes({
        where: { published: false }
      })
      .$fragment(recipeDetails),

  // Count all PUBLISHED recipes in database
  getUnpublishedRecipeCount: async () =>
    await prisma
      .recipesConnection({
        where: { published: false }
      })
      .aggregate()
      .count(),

  getCommentsByRecipeId: async id => {
    const comments = await prisma.recipe({ id }).comments();
    comments;
    return comments;
  },

  // MUTATIONS:

  createRecipe: async input => {
    if (!currentUser) return null;

    if (input.title === '') {
      throw new UserInputError('Title must not be empty', {
        invalidArgs: input.title
      });
    }

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
      .$fragment(recipeDetails);
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

    const data = {
      category: input.category,
      title: input.title,
      description: input.description,
      cookingTime: input.cookingTime,
      difficulty: input.difficulty,
      ingredients: { set: input.ingredients },
      method: { set: input.method },
      notes: { set: input.notes || null },
      tags: { set: input.tags || null }
    };

    const updatedRecipe = await prisma
      .updateRecipe({
        where: { id },
        data
      })
      .$fragment(recipeDetails);

    return updatedRecipe;
  },

  publishRecipe: async input => {
    if (!currentUser) return null;

    const { recipeId } = input;

    const recipe = await prisma.recipe({ id: recipeId }).$fragment(`
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
        where: { id: recipeId },
        data: {
          published: true
        }
      })
      .$fragment(recipeDetails);

    return updatedRecipe;
  },

  unpublishRecipe: async input => {
    if (!currentUser) return null;

    const { recipeId } = input;

    const recipe = await prisma.recipe({ id: recipeId }).$fragment(`
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
        where: { id: recipeId },
        data: {
          published: false
        }
      })
      .$fragment(recipeDetails);

    return updatedRecipe;
  },

  commentRecipe: async input => {
    if (!currentUser) return null;

    const { recipeId, content } = input;

    const updatedRecipe = await prisma
      .updateRecipe({
        where: { id: recipeId },
        data: {
          comments: {
            create: [
              {
                author: {
                  connect: { id: currentUser.id }
                },
                content
              }
            ]
          }
        }
      })
      .$fragment(recipeDetails);

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
      .$fragment(recipeDetails);

    updatedRecipe.comments;

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
      .$fragment(recipeDetails);

    return updatedRecipe;
  },

  likeRecipe: async input => {
    if (!currentUser) return null;

    const { recipeId } = input;

    const updatedUser = await prisma
      .updateUser({
        where: { id: currentUser.id },
        data: {
          likedRecipes: {
            connect: { id: recipeId }
          }
        }
      })
      .$fragment(userDetails);

    return updatedUser;
  },

  unlikeRecipe: async input => {
    if (!currentUser) return null;

    const { recipeId } = input;

    const updatedUser = await prisma
      .updateUser({
        where: { id: currentUser.id },
        data: {
          likedRecipes: {
            disconnect: { id: recipeId }
          }
        }
      })
      .$fragment(userDetails);

    return updatedUser;
  },

  rateRecipe: async input => {
    if (!currentUser) return null;

    const { recipeId, grade } = input;

    // Check recipe existence

    const recipe = await prisma.recipe({ id: recipeId }).$fragment(`
    fragment Ratings on Recipe {
      id
      ratings {
        user
        grade
      }
    }
    `);

    if (!recipe) throw new UserInputError('recipe does not exist');

    // Update rating if current user already rated

    if (recipe.ratings.some(rating => rating.user === currentUser.id)) {
      return await prisma
        .updateRecipe({
          where: { id: recipeId },
          data: {
            ratings: {
              updateMany: [
                {
                  where: {
                    user: currentUser.id
                  },
                  data: {
                    user: currentUser.id,
                    grade
                  }
                }
              ]
            }
          }
        })
        .$fragment(recipeDetails);
    }

    return await prisma
      .updateRecipe({
        where: { id: recipeId },
        data: {
          ratings: {
            create: [
              {
                user: currentUser.id,
                grade
              }
            ]
          }
        }
      })
      .$fragment(recipeDetails);
  },

  deleteRecipe: async input => {
    if (!currentUser) return null;

    const { recipeId } = input;

    // Check recipe existence

    const recipe = await prisma.recipe({ id: recipeId }).$fragment(`
    fragment IdAndAuthor on Recipe {
      id
      author {
        id
      }
    }
    `);

    if (!recipe) throw new UserInputError('recipe does not exist');

    // Validate recipe author

    if (recipe.author.id !== currentUser.id)
      throw new ForbiddenError('forbidden');

    try {
      await prisma.deleteRecipe({
        id: recipeId
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
});

module.exports = { generateRecipeModel };
