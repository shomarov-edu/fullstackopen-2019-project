const resolvers = {
  ShoppingList: {
    owner: async ({ owner }, args, { services }) =>
      await services.users.getUser(owner),

    sharedWith: async ({ shoppingListId }, args, { services }) =>
      await services.shoppingListService.sharedWith(shoppingListId)
  },

  ShoppingListPayload: {
    owner: async ({ owner }, args, { services }) =>
      await services.users.getUser(owner),

    sharedWith: async ({ shoppingListId }, args, { services }) =>
      await services.shoppingListService.sharedWith(shoppingListId)
  },

  Query: {
    getShoppingLists: async (root, args, { services }) =>
      await services.shoppingListService.getShoppingLists(),

    getShoppingList: async (root, shoppingListId, { services }) =>
      await services.shoppingListService.getShoppingList(shoppingListId)
  },

  Mutation: {
    createShoppingList: async (root, { input }, { services }) =>
      await services.shoppingListService.createShoppingList(input),

    addItem: async (root, { input }, { services }) =>
      await services.shoppingListService.addItem(input),

    checkUncheckItem: async (root, { input }, { services }) =>
      await services.shoppingListService.checkItem(input),

    checkAllItems: async (root, { input }, { services }) =>
      await services.shoppingListService.checkAllItems(input),

    deleteItem: async (root, { input }, { services }) =>
      await services.shoppingListService.deleteItem(input),

    deleteShoppingList: async (root, { input }, { services }) =>
      await services.shoppingListService.deleteShoppingList(input)
  }
};

module.exports = resolvers;
