const mongoose = require('mongoose');
const User = require('./user');
const { handleError } = require('../helpers/errorHandler');
const {
  AuthenticationError,
  ForbiddenError,
  UserInputError
} = require('apollo-server');

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    required: true
  },
  added: Date
});

const recipeSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cookTime: Number,
  difficulty: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  method: {
    type: [String],
    required: true
  },
  notes: [String],
  tags: [String],
  source: String,
  created: {
    type: Date,
    required: true
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true
    }
  ],
  ratings: [
    {
      rater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
      },
      score: {
        type: Number,
        min: 1,
        max: 5
      }
    }
  ],
  comments: [commentSchema]
});

recipeSchema.statics.generateRecipeModel = function(currentUser) {
  return {
    getRecipes: async () => {
      try {
        return await this.find({});
      } catch (error) {
        handleError(error);
      }
    },

    getRecipe: async id => {
      try {
        return await this.findById(id);
      } catch (error) {
        handleError(error);
      }
    },

    recipeCount: async () => {
      try {
        return await this.collection.countDocuments();
      } catch (error) {
        handleError(error);
      }
    },

    createRecipe: async input => {
      if (!currentUser) return null;

      try {
        const user = await User.findById(currentUser.id);

        const recipe = new this({
          author: user.id,
          created: new Date(),
          ...input
        });

        user.recipes = user.recipes.concat(recipe.id);
        await user.save();
        return await recipe.save();
      } catch (error) {
        handleError(error);
      }
    },

    updateRecipe: async ({ id, patch }) => {
      if (!currentUser) return null;

      try {
        const recipe = await this.findById(id);

        if (recipe.author !== currentUser.id)
          throw new ForbiddenError('forbidden');

        return await this.findByIdAndUpdate(id, patch, { new: true });
      } catch (error) {
        handleError(error);
      }
    },

    commentRecipe: async ({ recipeId, content }) => {
      if (!currentUser) return null;

      try {
        const recipe = await this.findById(recipeId);

        const comment = { author: currentUser.id, content, date: new Date() };

        recipe.comments.create(comment);

        return await recipe.save();
      } catch (error) {
        handleError(error);
      }
    },

    updateComment: async ({ recipeId, commentId, content }) => {
      if (!currentUser) return null;

      try {
        const recipe = await this.findById(recipeId);

        const comment = recipe.comments.id(commentId);

        if (comment.author !== currentUser.id)
          throw new ForbiddenError('forbidden');

        comment.content = content;

        return await recipe.save();
      } catch (error) {
        handleError(error);
      }
    },

    deleteComment: async ({ recipeId, commentId }) => {
      if (!currentUser) return null;

      try {
        const recipe = await this.findById(recipeId);

        recipe.comments.id(commentId).remove();

        return await recipe.save();
      } catch (error) {
        handleError(error);
      }
    },

    likeRecipe: async ({ recipeId }) => {
      if (!currentUser) return null;

      try {
        const recipe = await this.findById(recipeId);

        if (recipe.likes.includes(currentUser.id))
          throw new UserInputError('operation not permitted');

        const patch = { likes: recipe.likes.concat(currentUser.id) };

        return await this.findByIdAndUpdate(recipeId, patch, { new: true });
      } catch (error) {
        handleError(error);
      }
    },

    unlikeRecipe: async ({ recipeId }) => {
      if (!currentUser) return null;

      try {
        const recipe = await this.findById(recipeId);

        if (!recipe.likes.includes(currentUser.id))
          throw new UserInputError('operation not permitted');

        const patch = {
          likes: recipe.likes.filter(like => like.user !== currentUser.id)
        };

        return await this.findByIdAndUpdate(recipeId, patch, { new: true });
      } catch (error) {
        handleError(error);
      }
    },

    rateRecipe: async ({ recipeId, grade }) => {
      if (!currentUser) return null;

      try {
        const recipe = await this.findById(recipeId);

        const rating = {
          user: currentUser.id,
          grade
        };

        const updatedRatings = recipe.ratings
          .filter(rating => rating.user !== currentUser.id)
          .concat(rating);

        const patch = { ratings: updatedRatings };
        return await this.findByIdAndUpdate(recipeId, patch, { new: true });
      } catch (error) {
        handleError(error);
      }
    },

    deleteRecipe: async recipeId => {
      if (!currentUser) return null;

      try {
        const recipe = await this.findById(recipeId);

        if (!recipe.author !== currentUser.id)
          throw new ForbiddenError('forbidden');

        await this.findByIdAndRemove(recipeId);
        return true;
      } catch (error) {
        handleError(error);
        return false;
      }
    }
  };
};

module.exports = mongoose.model('Recipe', recipeSchema);
