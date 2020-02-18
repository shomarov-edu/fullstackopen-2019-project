const { makeExecutableSchema } = require('apollo-server');
const jwt = require('jsonwebtoken');
const appRoot = require('app-root-path');
const User = require('../models/user');

var glob = require('glob');

const typeDefs = glob
  .sync(`${appRoot}/graphql/typeDefs/**/*.js`)
  .map(file => require(file));

const resolvers = glob
  .sync(`${appRoot}/graphql/resolvers/*.js`)
  .map(file => require(file));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  }
});

module.exports = schema;
