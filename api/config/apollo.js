const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const auth = require('../services/authentication');
const { generateUserModel } = require('../models/User');
const { generateRecipeModel } = require('../models/Recipe');
const fs = require('fs');
const appRoot = require('app-root-path');
const getUser = require('../helpers/getUser');

const typeDefs = fs.readFileSync(`${appRoot}/graphql/schema.graphql`, 'utf8');
const resolvers = require('../graphql/resolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const context = async ({ req }) => {
  const tokenWithBearer = req.headers.authorization || '';

  const currentUser = tokenWithBearer ? await getUser(tokenWithBearer) : null;

  return {
    auth,
    currentUser,
    models: {
      User: generateUserModel(currentUser),
      Recipe: generateRecipeModel(currentUser)
    }
  };
};

const apollo = new ApolloServer({
  schema,
  context
});

module.exports = apollo;
