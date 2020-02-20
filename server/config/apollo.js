const { ApolloServer } = require('apollo-server');
const schema = require('../graphql/schema');
const context = require('../graphql/context');

const server = new ApolloServer({
  schema,
  context
});

module.exports = server;
