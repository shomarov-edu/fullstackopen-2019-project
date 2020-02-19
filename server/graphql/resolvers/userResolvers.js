const User = require('../../models/user');
const bcrypt = require('bcrypt');
const { AuthenticationError } = require('apollo-server');
const logger = require('../../config/winston');

const encryptPassword = async password => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const resolvers = {
  Query: {
    getUsers: () => User.find({}),
    getUser: (root, args) => User.findOne({ username: args.username }),
    userCount: () => User.collection.countDocuments()
  },

  Mutation: {
    createUser: async (root, args) => {
      try {
        const { password, ...userInput } = args.input;

        const user = new User({
          ...userInput,
          passwordHash: await encryptPassword(password)
        });

        const savedUser = await user.save();

        return savedUser;
      } catch (error) {
        logger.error(error);
      }
    },

    updateUser: async (root, { input }, { currentUser }) => {
      if (!currentUser) return new AuthenticationError('must authenticate');

      const { password, patch } = input;

      const passwordCorrect = await bcrypt.compare(
        password,
        currentUser.passwordHash
      );

      if (!passwordCorrect)
        throw new AuthenticationError('invalid username or password');

      try {
        return await User.findByIdAndUpdate(currentUser.id, patch, {
          new: true
        });
      } catch (error) {
        logger.error(error);
      }
    },

    updateUsername: async (root, { input }, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError();

      const { password, patch } = input;

      const passwordCorrect = await bcrypt.compare(
        password,
        currentUser.passwordHash
      );

      if (!passwordCorrect)
        throw new AuthenticationError('invalid username or password');

      try {
        return await User.findByIdAndUpdate(currentUser.id, patch, {
          new: true
        });
      } catch (error) {
        logger.error(error);
      }
    },

    updatePassword: async (root, { input }, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError();

      const { password, newPassword } = input;

      const passwordCorrect = await bcrypt.compare(
        password,
        currentUser.passwordHash
      );

      if (!passwordCorrect) {
        throw new AuthenticationError('invalid username or password');
      }

      const patch = {
        passwordHash: await encryptPassword(newPassword)
      };

      console.log(patch);

      try {
        await User.findByIdAndUpdate(currentUser.id, patch, {
          new: true
        });
        return true;
      } catch (error) {
        logger.error(error);
        return false;
      }
    },

    deleteUser: async (root, { password }, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError();

      const passwordCorrect = await bcrypt.compare(
        password,
        currentUser.passwordHash
      );

      if (!passwordCorrect)
        throw new AuthenticationError('invalid username or password');

      try {
        await User.findByIdAndDelete(currentUser.id);
      } catch (error) {
        logger.error(error);
        throw error;
      }
    }
  }
};

module.exports = resolvers;
