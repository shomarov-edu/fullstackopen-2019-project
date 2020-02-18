const User = require('../../models/user');
const bcrypt = require('bcrypt');
const { AuthenticationError } = require('apollo-server');

const resolvers = {
  Query: {
    userCount: () => User.collection.countDocuments(),
    allUsers: () => User.find({}),
    findUser: (root, args) => User.findOne({ username: args.username })
  },

  Mutation: {
    createUser: async (root, args) => {
      try {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(args.password, saltRounds);

        const user = new User({
          username: args.username,
          firstname: args.firstname,
          lastname: args.lastname,
          email: args.email,
          passwordHash
        });

        const savedUser = await user.save();

        return savedUser;
      } catch (error) {
        return error;
      }
    },
    updateUser: async (root, args, context) => {
      try {
        const user = {
          username: args.username,
          firstname: args.firstname,
          lastname: args.lastname,
          email: args.email,
          recipes: args.recipes,
          bookmarks: args.bookmarks,
          following: args.following
        };

        const updatedUser = await User.findByIdAndUpdate(
          context.user.id,
          user,
          {
            new: true
          }
        ).populate('recipes');

        return updatedUser;
      } catch (error) {
        console.log(error);
      }
    },
    deleteUser: async (root, args, context) => {
      if (!context.currentuser) throw new AuthenticationError();
      try {
        await User.findByIdAndDelete(context.user.id);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
};

module.exports = resolvers;
