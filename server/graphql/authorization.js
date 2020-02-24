const {
  encryptPassword,
  comparePasswords
} = require('../helpers/authorizationHelper');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { UserInputError } = require('apollo-server');
const { handleError } = require('../helpers/errorHandler');

const auth = {
  signup: async input => {
    try {
      const { password, ...userInput } = input;

      const user = new User({
        ...userInput,
        passwordHash: await encryptPassword(password)
      });

      return await user.save();
    } catch (error) {
      handleError(error);
    }
  },

  login: async ({ username, password }) => {
    try {
      const user = await User.findOne({ username });

      const passwordCorrect =
        user === null
          ? false
          : await comparePasswords(password, user.passwordHash);

      if (!(user && passwordCorrect)) {
        throw new UserInputError('invalid username or password');
      }

      const userForToken = {
        id: user.id,
        username: user.username,
        roles: user.role
      };

      return { token: await jwt.sign(userForToken, process.env.SECRET) };
    } catch (error) {
      handleError(error);
    }
  }
};

module.exports = auth;
