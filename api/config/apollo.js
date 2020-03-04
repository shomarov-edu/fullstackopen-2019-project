const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const fs = require('fs');
const appRoot = require('app-root-path');

const typeDefs = fs.readFileSync(`${appRoot}/graphql/schema.graphql`, 'utf8');
const resolvers = require('../graphql/resolvers');
const context = require('./context');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// TODO: formatError function

const apollo = new ApolloServer({
  schema,
  context
});

module.exports = apollo;
