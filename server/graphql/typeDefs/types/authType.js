const { gql } = require('apollo-server');

// TODO: logout mutation

const authType = gql`
  type Token {
    token: String!
  }

  extend type Query {
    currentUser: User
  }

  extend type Mutation {
    login(input: LoginInput!): Token
  }

  input LoginInput {
    username: String!
    password: String!
  }
`;

module.exports = authType;
