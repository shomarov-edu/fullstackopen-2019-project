const { gql } = require('apollo-server');

const authType = gql`
  type Token {
    value: String!
  }
`;

module.exports = authType;
