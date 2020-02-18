const { gql } = require('apollo-server');

const userType = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    firstname: String!
    lastname: String!
    passwordHash: String!
  }

  extend type Query {
    userCount: Int!
    allUsers: [User!]!
    findUser(username: String!): User
  }

  extend type Mutation {
    createUser(
      username: String!
      email: String!
      firstname: String!
      lastname: String!
      password: String!
    ): User

    updateUser(
      username: String
      email: String
      firstname: String
      lastname: String
    ): User

    deleteUser(password: String!): Boolean!
  }
`;

module.exports = userType;
