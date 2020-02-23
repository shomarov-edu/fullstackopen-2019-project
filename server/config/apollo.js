const { ApolloServer } = require('apollo-server');
const schema = require('../graphql/schema');
const context = require('../graphql/context');

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
