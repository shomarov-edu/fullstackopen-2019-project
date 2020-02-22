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
    getShoppingListItems(input: ID!): [Item]
  }

  extend type Mutation {
    createShoppingList(input: CreateShoppingListInput): ShoppingListPayload
    addItem(input: AddNewItemInput): ShoppingListPayload
    checkUncheckItem(input: CheckItemInput): ShoppingListPayload
    checkAllItems(input: CheckAllItemsInput): ShoppingListPayload
    deleteItem(input: DeleteItemInput): ShoppingListPayload
    shareShoppingList(input: ShareShoppingListInput): ShoppingListPayload
    deleteShoppingList(input: DeleteShoppingListInput): Boolean
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
    username: String!
  }

  type ShareShoppingListPayload {
    id: ID!
    owner: User!
    name: String!
    items: [Item]!
    sharedWith: [User!]!
  }

  input AddNewItemInput {
    shoppingListId: ID!
    content: String!
  }

  input CheckItemInput {
    itemId: ID!
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
