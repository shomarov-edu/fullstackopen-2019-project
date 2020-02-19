const { makeExecutableSchema } = require('apollo-server');
const appRoot = require('app-root-path');

var glob = require('glob');

const typeDefs = glob
  .sync(`${appRoot}/graphql/typeDefs/**/*.js`)
  .map(file => require(file));

const resolvers = glob
  .sync(`${appRoot}/graphql/resolvers/*.js`)
  .map(file => require(file));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = schema;
