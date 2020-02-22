const bcrypt = require('bcrypt');
const authHelper = require('../../helpers/authHelper');
const User = require('../../models/user');
const {
  AuthenticationError,
  ForbiddenError,
  UserInputError
} = require('apollo-server');
const errorHandler = require('../../helpers/errorHandler');

const generateUserService = currentUser => ({
  getUsers: async () => {
    try {
      return await User.find({});
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  getUser: async username => {
    try {
      return await User.findOne(username);
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  userCount: async () => {
    try {
      return await User.collection.countDocuments();
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  updateUser: async ({ password, patch }) => {
    if (!currentUser) return null;

    try {
      const user = await User.findById(user.id);

      if (user.id !== currentUser.id) throw new ForbiddenError('forbidden');

      if (!(await authHelper.comparePasswords(password, user.passwordHash))) {
        throw new AuthenticationError('invalid username or password');
      }

      return await User.findByIdAndUpdate(user.id, patch, {
        new: true
      });
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  updateUsername: async input => {
    if (!currentUser) return null;

    try {
      const user = await User.findById(user.id);

      if (user.id !== currentUser.id) throw new ForbiddenError('forbidden');

      const { password, patch } = input;

      const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

      if (!passwordCorrect)
        throw new AuthenticationError('invalid username or password');

      return await User.findByIdAndUpdate(user.id, patch, {
        new: true
      });
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  updatePassword: async input => {
    if (!currentUser) return null;

    try {
      const user = await User.findById(user.id);

      if (user.id !== currentUser.id) throw new ForbiddenError('forbidden');

      const { password, newPassword } = input;

      if (!(await bcrypt.compare(password, user.passwordHash))) {
        throw new AuthenticationError('invalid username or password');
      }

      user.passwordHash = await authHelper.encryptPassword(newPassword);

      await user.save();
      return true;
    } catch (error) {
      errorHandler.handleError(error);
      return false;
    }
  },

  followUser: async ({ userId }) => {
    if (!currentUser) return null;

    try {
      const user = await User.findById(currentUser.id);

      if (user.id !== currentUser.id) throw new ForbiddenError('forbidden');

      if (user.following.includes(userId))
        throw new UserInputError('already following');

      user.following = user.following.concat(userId);

      return await user.save();
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  deleteUser: async password => {
    if (!currentUser) return null;

    try {
      const user = await User.findById(currentUser.id);

      if (user.id !== currentUser.id) throw new ForbiddenError('forbidden');

      if (!(await bcrypt.compare(password, user.passwordHash))) {
        throw new AuthenticationError('invalid username or password');
      }

      await User.findByIdAndDelete(currentUser.id);
    } catch (error) {
      errorHandler.handleError(error);
    }
  }
});

module.exports = { generateUserService };
