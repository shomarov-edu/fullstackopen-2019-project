require('dotenv').config();
const fs = require('fs');
const appRoot = require('app-root-path');
const { ApolloServer } = require('apollo-server');
const { prisma } = require('../../prisma');
const { createTestClient } = require('apollo-server-testing');

const typeDefs = fs.readFileSync(`${appRoot}/graphql/schema.graphql`, 'utf8');
const resolvers = require(`${appRoot}/graphql/resolvers`);
const context = require('./context');

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
