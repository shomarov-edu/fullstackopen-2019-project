const { AuthenticationError, ForbiddenError } = require('apollo-server');
const ShoppingList = require('../../models/shoppingList');
const User = require('../../models/user');
const logger = require('../../config/winston');

const resolvers = {
  ShoppingList: {
    owner: async root => {
      try {
        return await User.findById(root.owner);
      } catch (error) {
        logger.error(error);
      }
    },

    sharedWith: async ({ id }) => {
      try {
        const shoppingList = await ShoppingList.findById(id).populate(
          'sharedWith'
        );
        return shoppingList.sharedWith;
      } catch (error) {
        logger.error(error);
      }
    }
  },

  ShoppingListPayload: {
    owner: async root => {
      try {
        return await User.findById(root.owner);
      } catch (error) {
        logger.error(error);
      }
    },

    sharedWith: async ({ id }) => {
      try {
        const shoppingList = await ShoppingList.findById(id).populate(
          'sharedWith'
        );
        return shoppingList.sharedWith;
      } catch (error) {
        logger.error(error);
      }
    }
  },

  Query: {
    getShoppingLists: async (root, args, context) =>
      await ShoppingList.find({}),
    getShoppingList: async (root, id, context) =>
      await ShoppingList.findById(id),
    getShoppingListItems: async (root, id, context) => {
      const shoppingList = await ShoppingList.findById(id);
      return shoppingList.items;
    }
  },

  Mutation: {
    createShoppingList: async (root, { input }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('must authenticate');
      }

      const shoppingList = new ShoppingList({
        owner: currentUser.id,
        name: input.name
      });

      currentUser.shoppingLists = currentUser.shoppingLists.concat(
        shoppingList
      );

      try {
        await User.findByIdAndUpdate(
          currentUser.id,
          { shoppingLists: currentUser.shoppingLists },
          { new: true }
        );

        return await shoppingList.save();
      } catch (error) {
        logger.error(error);
      }
    },

    addItem: async (root, { input }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('must authenticate');
      } else if (!currentUser.shoppingLists.find(s => s.id === input.id)) {
        throw new ForbiddenError('forbidden');
      }

      const { shoppingListId, content } = input;

      const newItem = { content, checked: false };

      try {
        const shoppingList = await ShoppingList.findById(shoppingListId);
        shoppingList.items = shoppingList.items.concat(newItem);
        return await ShoppingList.findByIdAndUpdate(
          shoppingListId,
          { items: shoppingList.items },
          { new: true }
        );
      } catch (error) {
        logger.error(error);
      }
    },

    checkItem: async (root, { input }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('must authenticate');
      } else if (!currentUser.shoppingLists.find(s => s.id === input.id)) {
        throw new ForbiddenError('forbidden');
      }
    },

    uncheckItem: async (root, { input }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('must authenticate');
      } else if (!currentUser.shoppingLists.find(s => s.id === input.id)) {
        throw new ForbiddenError('forbidden');
      }
    },

    checkAllItems: async (root, { input }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('must authenticate');
      } else if (!currentUser.shoppingLists.find(s => s.id === input.id)) {
        throw new ForbiddenError('forbidden');
      }
    },

    deleteItem: async (root, { input }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('must authenticate');
      } else if (!currentUser.shoppingLists.find(s => s.id === input.id)) {
        throw new ForbiddenError('forbidden');
      }
    },

    deleteShoppingList: async (root, { input }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('must authenticate');
      } else if (!currentUser.shoppingLists.find(s => s.id === input.id)) {
        throw new ForbiddenError('forbidden');
      }
    }
  }
};

module.exports = resolvers;
