const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const fs = require('fs');
const appRoot = require('app-root-path');
const { prisma } = require('../generated/prisma-client/');
const { getUser } = require('../helpers/authorizationHelper');
const winston = require('../config/winston');

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
  winston.error(error);
};

const apollo = new ApolloServer({
  schema,
  context,
  formatError
});

module.exports = apollo;
