const { gql } = require('apollo-server');

const userType = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    firstname: String!
    lastname: String!
    passwordHash: String!
    recipes: [Recipe]!
    categories: [Category]!
    likes: [Recipe]!
    following: [User]!
    shoppingLists: [ShoppingList]!
  }

  extend type Query {
    getUsers: [User!]!
    getUser(username: String!): User
    userCount: Int!
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): UserPayload
    updateUser(input: UpdateUserInput!): UserPayload
    updateUsername(input: UpdateUsernameInput!): UserPayload
    updatePassword(input: UpdatePasswordInput!): Boolean
    followUser(input: FollowUserInput!): UserPayload
    deleteUser(password: String!): Boolean
  }

  input CreateUserInput {
    firstname: String!
    lastname: String!
    email: String!
    username: String!
    password: String!
  }

  type UserPayload {
    id: ID!
    username: String!
    email: String!
    firstname: String!
    lastname: String!
  }

  input UserInput {
    firstname: String
    lastname: String
    email: String
  }

  input UpdateUserInput {
    password: String!
    patch: UserInput!
  }

  input UpdateUsernameInput {
    password: String!
    username: String!
  }

  input UpdatePasswordInput {
    password: String!
    newPassword: String!
  }

  input FollowUserInput {
    user: ID!
  }
`;

module.exports = userType;
