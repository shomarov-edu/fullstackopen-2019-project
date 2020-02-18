const { gql } = require('apollo-server');

const root = gql`
  type Query
  type Mutation
`;

module.exports = root;
