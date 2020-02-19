const { gql } = require('apollo-server');

const categoryType = gql`
  type Category {
    id: ID!
    user: User!
    title: String!
    recipes: [Recipe]!
  }

  extend type Query {
    getCategories: [Category]!
    getCategory(id: String): Category
  }

  extend type Mutation {
    createCategory(user: ID!, title: String!): Category
    updateCategory(title: String!): Category
    deleteCategory(id: ID!): Boolean
  }
`;

module.exports = categoryType;
