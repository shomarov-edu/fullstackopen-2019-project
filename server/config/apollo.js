const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const fs = require('fs');
const appRoot = require('app-root-path');
const resolvers = require('../graphql/resolvers');
const context = require('../graphql/context');

const typeDefs = fs.readFileSync(`${appRoot}/graphql/schema.graphql`, 'utf8');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const formatError = error => {
  // Don't give the specific errors to the client.
  if (error.message.startsWith('Database Error: ')) {
    return new Error('Internal server error');
  } else if (error.message.startsWith('Context creation failed: forbidden')) {
    return new Error('Unauthorized');
  }

  // Otherwise return the original error.  The error can also
  // be manipulated in other ways, so long as it's returned.
  return error;
};

const server = new ApolloServer({
  schema,
  context,
  formatError
});

module.exports = server;
