const { gql } = require('apollo-server');

const shoppingListType = gql`
  type ShoppingList {
    id: ID!
    owner: User!
    title: String!
    items: [String]!
    sharedWith: [User]
  }
`;

module.exports = shoppingListType;
