const { gql } = require('apollo-server');
const authType = require('./authType');
const categoryType = require('./categoryType');
const recipeType = require('./recipeType');
const shoppingListType = require('./shoppingListType');
const userType = require('./userType');

const root = gql`
  type Query
  type Mutation
`;

module.exports = [
  root,
  authType,
  categoryType,
  recipeType,
  shoppingListType,
  userType
];
