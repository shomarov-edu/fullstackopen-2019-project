const { AuthenticationError, ForbiddenError } = require('apollo-server');
const ShoppingList = require('../../models/shoppingList');
const User = require('../../models/user');
const errorHandler = require('../../helpers/errorHandler');

const authorizeUserForShoppingList = (currentUser, shoppingList) => {
  if (
    shoppingList.owner !== currentUser.id ||
    !shoppingList.sharedWith.includes(currentUser.id)
  ) {
    throw new ForbiddenError('forbidden');
  }
};

const generateShoppingListService = currentUser => {
  if (!currentUser) return null;

  return {
    sharedWith: async id => {
      try {
        const shoppingList = await ShoppingList.findById(id).populate(
          'sharedWith'
        );
        return shoppingList.sharedWith;
      } catch (error) {
        errorHandler.handleError(error);
      }
    },

    getShoppingLists: async input => {
      try {
        return await ShoppingList.find({});
      } catch (error) {
        errorHandler.handleError(error);
      }
    },

    getShoppingList: async id => {
      try {
        const shoppingList = await ShoppingList.findById(id);
        authorizeUserForShoppingList(currentUser, shoppingList);
        return shoppingList;
      } catch (error) {
        errorHandler.handleError(error);
      }
    },

    createShoppingList: async input => {
      try {
        const shoppingList = new ShoppingList({
          owner: currentUser.id,
          name: input.name
        });

        currentUser.shoppingLists = currentUser.shoppingLists.concat(
          shoppingList
        );

        await User.findByIdAndUpdate(
          currentUser.id,
          { shoppingLists: currentUser.shoppingLists },
          { new: true }
        );

        return await shoppingList.save();
      } catch (error) {
        errorHandler.handleError(error);
      }
    },

    addItem: async ({ shoppingListId, content }) => {
      try {
        const shoppingList = await ShoppingList.findById(shoppingListId);

        authorizeUserForShoppingList(currentUser, shoppingList);

        const newItem = { content, checked: false };

        shoppingList.items.create(newItem);

        return await shoppingList.save();
      } catch (error) {
        errorHandler.handleError(error);
      }
    },

    checkUncheckItem: async ({ shoppingListId, itemId }) => {
      try {
        const shoppingList = await ShoppingList.findById(shoppingListId);

        authorizeUserForShoppingList(currentUser, shoppingList);

        const item = shoppingList.items.id(itemId);

        item.checked = !item.checked;

        return await shoppingList.save();
      } catch (error) {
        errorHandler.handleError(error);
      }
    },

    checkAllItems: async ({ shoppingListId }) => {
      try {
        const shoppingList = await ShoppingList.findById(shoppingListId);

        authorizeUserForShoppingList(currentUser, shoppingList);

        shoppingList.items = shoppingList.items.map(
          item => (item.checked = true)
        );

        return await shoppingList.save();
      } catch (error) {
        errorHandler.handleError(error);
      }
    },

    deleteItem: async ({ shoppingListId, itemId }) => {
      try {
        const shoppingList = await ShoppingList.findById(shoppingListId);

        authorizeUserForShoppingList(currentUser, shoppingList);

        shoppingList.items.id(itemId).remove();

        return await shoppingList.save();
      } catch (error) {
        errorHandler.handleError(error);
      }
    },

    deleteShoppingList: async ({ shoppingListId }) => {
      try {
        const shoppingList = await ShoppingList.findById(shoppingListId);

        authorizeUserForShoppingList(currentUser, shoppingList);

        await shoppingList.remove();
      } catch (error) {
        errorHandler.handleError(error);
      }
    }
  };
};

module.exports = { generateShoppingListService };
