require('dotenv').config();
const fs = require('fs');
const appRoot = require('app-root-path');
const { ApolloServer } = require('apollo-server');
const { Prisma } = require('../prisma');
const { createTestClient } = require('apollo-server-testing');
const { getUser } = require(`${appRoot}/helpers/authorizationHelper`);

const typeDefs = fs.readFileSync(`${appRoot}/schema.graphql`, 'utf8');
const resolvers = require(`${appRoot}/graphql/resolvers`);

const prisma = new Prisma({
  endpoint: 'http://prisma:4466/project/test'
});

const context = async ({ req }) => {
  const tokenWithBearer = req.headers.authorization || '';

  const currentUser = tokenWithBearer ? await getUser(tokenWithBearer) : null;

  return {
    currentUser,
    prisma
  };
};

const testClient = (typeDefs, resolvers, auth) => {
  const baseAuth = {
    req: { headers: { authorization: null } }
  };
  let currentAuth = baseAuth;

  const { query, mutate, ...others } = createTestClient(
    new ApolloServer({
      typeDefs,
      resolvers,
      context: () => context(currentAuth)
    })
  );

  const wrap = fn => ({ auth, ...args }) => {
    currentAuth = auth || baseAuth;
    return fn(args);
  };

  return { query: wrap(query), mutate: wrap(mutate), ...others };
};

const { query, mutate } = testClient(typeDefs, resolvers);

module.exports = { prisma, query, mutate };
