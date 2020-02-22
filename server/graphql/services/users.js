const bcrypt = require('bcrypt');
const authHelper = require('../../helpers/authHelper');
const User = require('../../models/user');
const { AuthenticationError, UserInputError } = require('apollo-server');
const errorHandler = require('../../helpers/errorHandler');

const generateUserService = user => ({
  getUsers: async () => {
    if (!user) throw new AuthenticationError('must authenticate');
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

  updateUser: async input => {
    if (!user) return null;

    const { password, patch } = input;

    if (!(await authHelper.comparePasswords(password, user.passwordHash))) {
      throw new AuthenticationError('invalid username or password');
    }

    try {
      return await User.findByIdAndUpdate(user.id, patch, {
        new: true
      });
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  updateUsername: async (input, user) => {
    if (!user) return null;

    const { password, patch } = input;

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!passwordCorrect)
      throw new AuthenticationError('invalid username or password');

    try {
      return await User.findByIdAndUpdate(user.id, patch, {
        new: true
      });
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  updatePassword: async (input, user) => {
    if (!user) return null;

    const { password, newPassword } = input;

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!passwordCorrect) {
      throw new AuthenticationError('invalid username or password');
    }

    const patch = {
      passwordHash: await authHelper.encryptPassword(newPassword)
    };

    try {
      await User.findByIdAndUpdate(user.id, patch, {
        new: true
      });
      return true;
    } catch (error) {
      errorHandler.handleError(error);
      return false;
    }
  },

  followUser: async (input, user) => {
    if (!user) return null;

    const { userId } = input;

    if (user.following.includes(userId))
      throw new UserInputError('already following');

    try {
      user.following = user.following.concat(userId);

      const patch = { following: user.following };

      return await User.findByIdAndUpdate(user.id, patch, {
        new: true
      });
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  deleteUser: async (password, user) => {
    if (!user) return null;

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!passwordCorrect)
      throw new AuthenticationError('invalid username or password');

    try {
      await User.findByIdAndDelete(user.id);
    } catch (error) {
      errorHandler.handleError(error);
      throw error;
    }
  }
});

module.exports = { generateUserService };
