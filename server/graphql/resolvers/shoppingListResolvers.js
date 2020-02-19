const ShoppingList = require('../../models/shoppingList');

const resolvers = {
  Query: {
    getShoppingLists: async (root, args, context) => ShoppingList.find({}),
    getShoppingList: async (root, id, context) => ShoppingList.findById(id)
  },

  Mutation: {
    createShoppingList: async (root, args, context) => {},
    addItem: async (root, args, context) => {},
    checkItem: async (root, args, context) => {},
    uncheckItem: async (root, args, context) => {},
    checkAllItems: async (root, args, context) => {},
    deleteItem: async (root, args, context) => {},
    deleteShoppingList: async (root, args, context) => {}
  }
};
