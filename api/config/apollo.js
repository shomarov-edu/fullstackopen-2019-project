const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const fs = require('fs');
const appRoot = require('app-root-path');

const typeDefs = fs.readFileSync(`${appRoot}/graphql/schema.graphql`, 'utf8');
const resolvers = require('../graphql/resolvers');
const context = require('./context');

const formatError = error => {
  console.log(error);
  return error;
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  formatError
});

const apollo = new ApolloServer({
  cors: true,
  schema,
  context
});

module.exports = apollo;
