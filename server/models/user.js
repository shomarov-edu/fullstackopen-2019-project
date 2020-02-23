const mongoose = require('mongoose');
const ShoppingList = require('./shoppingList');
const {
  encryptPassword,
  comparePasswords
} = require('../helpers/authorizationHelper');
const { handleError } = require('../helpers/errorHandler');
const {
  AuthenticationError,
  ForbiddenError,
  UserInputError
} = require('apollo-server');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    }
  ]
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  firstname: String,
  lastname: String,
  passwordHash: String,
  role: {
    type: String,
    enum: ['USER', 'MODERATOR', 'ADMIN'],
    default: 'USER',
    required: true
  },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    }
  ],
  categories: [categorySchema],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'this'
    }
  ],
  shoppingLists: [ShoppingList.schema]
});

userSchema.statics.generateUserModel = function(currentUser) {
  return {
    getUsers: async () => {
      try {
        return await this.find({});
      } catch (error) {
        handleError(error);
      }
    },

    getUser: async username => {
      try {
        return await this.findOne({ username });
      } catch (error) {
        handleError(error);
      }
    },

    userCount: async () => {
      try {
        return await this.collection.countDocuments();
      } catch (error) {
        handleError(error);
      }
    },

    updateUser: async ({ password, patch }) => {
      if (!currentUser) return null;

      try {
        const user = await this.findById(user.id);

        if (user.id !== currentUser.id) throw new ForbiddenError('forbidden');

        if (!(await comparePasswords(password, user.passwordHash))) {
          throw new AuthenticationError('invalid username or password');
        }

        return await this.findByIdAndUpdate(user.id, patch, {
          new: true
        });
      } catch (error) {
        handleError(error);
      }
    },

    updateUsername: async input => {
      if (!currentUser) return null;

      try {
        const user = await this.findById(user.id);

        if (user.id !== currentUser.id) throw new ForbiddenError('forbidden');

        const { password, patch } = input;

        const passwordCorrect = await comparePasswords(
          password,
          user.passwordHash
        );

        if (!passwordCorrect)
          throw new AuthenticationError('invalid username or password');

        return await this.findByIdAndUpdate(user.id, patch, {
          new: true
        });
      } catch (error) {
        handleError(error);
      }
    },

    updatePassword: async input => {
      if (!currentUser) return null;

      try {
        const user = await this.findById(user.id);

        if (user.id !== currentUser.id) throw new ForbiddenError('forbidden');

        const { password, newPassword } = input;

        if (!(await comparePasswords(password, user.passwordHash))) {
          throw new AuthenticationError('invalid username or password');
        }

        user.passwordHash = await encryptPassword(newPassword);

        await user.save();
        return true;
      } catch (error) {
        handleError(error);
        return false;
      }
    },

    followUser: async ({ userId }) => {
      if (!currentUser) return null;

      try {
        const user = await this.findById(currentUser.id);

        if (user.id !== currentUser.id) throw new ForbiddenError('forbidden');

        if (user.following.includes(userId))
          throw new UserInputError('already following');

        user.following = user.following.concat(userId);

        return await user.save();
      } catch (error) {
        handleError(error);
      }
    },

    deleteUser: async password => {
      if (!currentUser) return null;

      try {
        const user = await this.findById(currentUser.id);

        if (user.id !== currentUser.id) throw new ForbiddenError('forbidden');

        if (!(await comparePasswords(password, user.passwordHash))) {
          throw new AuthenticationError('invalid username or password');
        }

        await this.findByIdAndDelete(currentUser.id);
      } catch (error) {
        handleError(error);
      }
    },

    getCategories: async () => {
      try {
        const user = await this.findById(currentUser.id);
        return user.categories;
      } catch (error) {
        handleError(error);
      }
    },

    getCategory: async categoryId => {
      try {
        return await this.findById(categoryId).populate('recipes');
      } catch (error) {
        handleError(error);
      }
    },

    getCategoryRecipes: async categoryId => {
      try {
        const category = await this.findById(categoryId).populate('recipes');
        return category.recipes;
      } catch (error) {
        handleError(error);
      }
    },

    createCategory: async input => {
      try {
        const user = await this.findById(currentUser.id);

        const category = new this({
          currentUser: currentUser.id,
          name: input.name
        });

        user.categories.create(category);

        return await user.save();
      } catch (error) {
        handleError(error);
      }
    },

    renameCategory: async ({ categoryId, name }) => {
      if (!currentUser.categories.includes(categoryId)) {
        throw new ForbiddenError('forbidden');
      }

      try {
        return this.findByIdAndUpdate(categoryId, { name }, { new: true });
      } catch (error) {
        handleError(error);
      }
    },

    addRecipeToCategory: async ({ categoryId, recipeId }) => {
      if (!currentUser.categories.includes(categoryId)) {
        throw new ForbiddenError('forbidden');
      }

      try {
        const user = await this.findById(currentUser.id);

        const category = await user.categories.id(categoryId);

        if (!category) throw new UserInputError('category not found');

        category.recipes = category.recipes.concat(recipeId);

        return await user.save();
      } catch (error) {
        handleError(error);
      }
    },

    removeRecipeToCategory: async ({ categoryId, recipeId }) => {
      if (!currentUser.categories.includes(categoryId)) {
        throw new ForbiddenError('forbidden');
      }

      try {
        const user = await this.findById(currentUser.id);

        const category = await user.categories.id(categoryId);

        category.recipes = category.recipes.filter(
          recipe => recipe.id !== recipeId
        );

        return await user.save();
      } catch (error) {
        handleError(error);
      }
    },

    deleteCategory: async ({ categoryId }) => {
      try {
        const user = await this.findById(currentUser.id);

        user.categories.id(categoryId).remove();

        return await user.save();
      } catch (error) {
        handleError(error);
      }
    }
  };
};

module.exports = mongoose.model('User', userSchema);
