const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const fs = require('fs');
const appRoot = require('app-root-path');
const { prisma } = require('../generated/prisma-client/');
const { getUser } = require('../helpers/authorizationHelper');

const typeDefs = fs.readFileSync(`${appRoot}/schema.graphql`, 'utf8');
const resolvers = require('../resolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const context = async ({ req }) => {
  const tokenWithBearer = req.headers.authorization || '';

  const currentUser = tokenWithBearer ? await getUser(tokenWithBearer) : null;

  return {
    currentUser,
    prisma
  };
};

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
