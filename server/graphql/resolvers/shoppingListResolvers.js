const resolvers = {
  ShoppingList: {
    owner: async ({ owner }, args, { models }) =>
      await models.User.getUser(owner),

    sharedWith: async ({ shoppingListId }, args, { models }) =>
      await models.shoppingList.sharedWith(shoppingListId)
  },

  ShoppingListPayload: {
    owner: async ({ owner }, args, { models }) =>
      await models.User.getUser(owner),

    sharedWith: async ({ shoppingListId }, args, { models }) =>
      await models.shoppingList.sharedWith(shoppingListId)
  },

  Query: {
    getShoppingLists: async (root, args, { models }) =>
      await models.shoppingList.getShoppingLists(),

    getShoppingList: async (root, shoppingListId, { models }) =>
      await models.shoppingList.getShoppingList(shoppingListId)
  },

  Mutation: {
    createShoppingList: async (root, { input }, { models }) =>
      await models.shoppingList.createShoppingList(input),

    addItem: async (root, { input }, { models }) =>
      await models.shoppingList.addItem(input),

    checkUncheckItem: async (root, { input }, { models }) =>
      await models.shoppingList.checkItem(input),

    checkAllItems: async (root, { input }, { models }) =>
      await models.shoppingList.checkAllItems(input),

    deleteItem: async (root, { input }, { models }) =>
      await models.shoppingList.deleteItem(input),

    deleteShoppingList: async (root, { input }, { models }) =>
      await models.shoppingList.deleteShoppingList(input)
  }
};

module.exports = resolvers;
