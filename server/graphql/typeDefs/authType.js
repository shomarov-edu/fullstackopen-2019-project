const { gql } = require('apollo-server');

// TODO: logout mutation

const authType = gql`
  type Token {
    token: String!
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    signup(input: CreateUserInput!): UserPayload
    login(input: LoginInput!): Token
  }

  input CreateUserInput {
    firstname: String!
    lastname: String!
    email: String!
    username: String!
    password: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }
`;

module.exports = authType;
