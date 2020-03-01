const { prisma } = require('../prisma');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');
const encryptPassword = require('../helpers/encryptPassword');
const comparePasswords = require('../helpers/comparePasswords');
const { handleError } = require('../utils/errorHandler');

const authentication = {
  signup: async input => {
    try {
      const { password, ...userInput } = input;

      await prisma.createUser({
        ...userInput,
        passwordHash: await encryptPassword(password)
      });

      return true;
    } catch (error) {
      handleError(error);
    }
  },

  login: async input => {
    try {
      const { usernameOrEmail, password } = input;

      const user =
        (await prisma.user({ username: usernameOrEmail })) ||
        (await prisma.user({ email: usernameOrEmail }));

      const passwordCorrect =
        user === null
          ? false
          : await comparePasswords(password, user.passwordHash);

      if (!(user && passwordCorrect)) {
        throw new AuthenticationError('invalid username or password');
      }

      const userForToken = {
        id: user.id,
        username: user.username,
        roles: user.role
      };

      return {
        token: jwt.sign(userForToken, process.env.SECRET, {
          expiresIn: '7 days'
        })
      };
    } catch (error) {
      handleError(error);
    }
  }
};

module.exports = authentication;
