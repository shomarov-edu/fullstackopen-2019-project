const { makeExecutableSchema, gql } = require('apollo-server');
const { graphql } = require('graphql');
const fs = require('fs');
const appRoot = require('app-root-path');
const { prisma } = require('../generated/prisma-client');
const { getUser } = require('../helpers/authorizationHelper');

const typeDefs = fs.readFileSync(`${appRoot}/schema.graphql`, 'utf8');
const resolvers = require('../resolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const query = `
  query {
    users {
      username
    }
  }
`;

test('user ', async () => {
  console.log(prisma);
  const result = await graphql(schema, query, null, { prisma });
  console.log(result);
});
