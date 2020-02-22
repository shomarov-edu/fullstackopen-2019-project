const authHelper = require('../../helpers/authHelper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const User = require('../../models/user');
const errorHandler = require('../../helpers/errorHandler');

const auth = {
  signup: async input => {
    try {
      const { password, ...userInput } = input;

      const user = new User({
        ...userInput,
        passwordHash: await authHelper.encryptPassword(password),
        role: 'USER'
      });

      return await user.save();
    } catch (error) {
      errorHandler.handleError(error);
    }
  },

  login: async ({ username, password }) => {
    try {
      console.log(username, password);
      const user = await User.findOne({ username });

      const passwordCorrect =
        user === null
          ? false
          : await bcrypt.compare(password, user.passwordHash);

      if (!(user && passwordCorrect)) {
        throw new UserInputError('invalid username or password');
      }

      const userForToken = {
        id: user.id,
        username: user.username,
        roles: user.roles
      };

      return { token: await jwt.sign(userForToken, process.env.SECRET) };
    } catch (error) {
      errorHandler.handleError(error);
    }
  }
};

module.exports = auth;
