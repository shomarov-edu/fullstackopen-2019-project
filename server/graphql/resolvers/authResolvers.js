const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const User = require('../../models/user');
const logger = require('../../config/winston');

const resolvers = {
  Query: {
    currentUser: (root, args, { currentUser }) => currentUser
  },

  Mutation: {
    login: async (root, { input }) => {
      const { username, password } = input;

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
        username: user.username
      };

      const token = jwt.sign(userForToken, process.env.SECRET);

      return { value: token };
    }
  }
};

module.exports = resolvers;
