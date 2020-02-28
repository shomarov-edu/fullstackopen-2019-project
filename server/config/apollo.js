const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const { prisma } = require('../prisma');
const fs = require('fs');
const appRoot = require('app-root-path');
const { getUser } = require('../helpers/authorizationHelper');

const typeDefs = fs.readFileSync(`${appRoot}/schema.graphql`, 'utf8');
const resolvers = require('../graphql/resolvers');

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

const apollo = new ApolloServer({
  schema,
  context
});

module.exports = apollo;
