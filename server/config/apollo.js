const { ApolloServer } = require('apollo-server');
const schema = require('../graphql/schema');
const context = require('../graphql/context');

const formatError = err => {
  // Don't give the specific errors to the client.
  if (err.message.startsWith('Database Error: ')) {
    return new Error('Internal server error');
  } else if (err.message.startsWith('Context creation failed: forbidden')) {
    return new Error('Unauthorized');
  } else if (err.message.startsWith('Internal Server Error')) {
    return new Error('Internal Server Error');
  }

  // Otherwise return the original error.  The error can also
  // be manipulated in other ways, so long as it's returned.
  return err;
};

const server = new ApolloServer({
  schema,
  context,
  formatError
});

module.exports = server;
