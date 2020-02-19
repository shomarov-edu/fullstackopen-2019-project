const { gql } = require('apollo-server');

const shoppingListType = gql`
  type ShoppingList {
    id: ID!
    owner: User!
    name: String!
    items: [Item]!
    sharedWith: [User]!
  }

  type Item {
    id: ID!
    content: String!
    checked: Boolean!
  }

  extend type Query {
    getShoppingLists: [ShoppingList]!
    getShoppingList(input: ID!): ShoppingList
  }

  extend type Mutation {
    createShoppingList(input: CreateShoppingListInput): ShoppingListPayload
    addItem(input: AddNewItemInput): ShoppingListPayload!
    checkItem(input: CheckItemInput): ShoppingListPayload!
    uncheckItem(input: UncheckItemInput): ShoppingListPayload!
    checkAllItems(input: CheckAllItemsInput): ShoppingListPayload!
    shareShoppingList(input: ShareShoppingListInput): ShareShoppingListPayload!
    deleteItem(input: DeleteItemInput): ShoppingListPayload!
    deleteShoppingList(input: DeleteShoppingListInput): Boolean!
  }

  input CreateShoppingListInput {
    name: String!
  }

  type ShoppingListPayload {
    id: ID!
    owner: User!
    name: String!
    items: [Item]!
    sharedWith: [User]!
  }

  input ShareShoppingListInput {
    user: ID!
  }

  type ShareShoppingListPayload {
    id: ID!
    owner: User!
    name: String!
    items: [Item]!
    sharedWith: [User!]!
  }

  input AddNewItemInput {
    content: String!
  }

  input CheckItemInput {
    item: ID!
  }

  input UncheckItemInput {
    item: ID!
  }

  input CheckAllItemsInput {
    items: [ID!]!
  }

  input DeleteItemInput {
    item: ID!
  }

  input DeleteShoppingListInput {
    id: ID!
  }
`;

module.exports = shoppingListType;
