const mongoose = require('mongoose');
const User = require('./user');
const { handleError } = require('../helpers/errorHandler');
const {
  authorizeUserForShoppingList
} = require('../helpers/authorizationHelper');
const { AuthenticationError, ForbiddenError } = require('apollo-server');

const shoppingListSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  items: [
    {
      content: String,
      checked: Boolean
    }
  ],
  sharedWith: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

shoppingListSchema.statics.generateShoppingListModel = function(currentUser) {
  if (!currentUser) return null;
  return {
    sharedWith: async id => {
      try {
        const shoppingList = await this.findById(id);
        return shoppingList.sharedWith;
      } catch (error) {
        handleError(error);
      }
    },

    getShoppingLists: async input => {
      try {
        return await this.find({});
      } catch (error) {
        handleError(error);
      }
    },

    getShoppingList: async id => {
      try {
        const shoppingList = await this.findById(id);
        authorizeUserForShoppingList(currentUser, shoppingList);
        return shoppingList;
      } catch (error) {
        handleError(error);
      }
    },

    createShoppingList: async input => {
      try {
        const shoppingList = new this({
          owner: currentUser.id,
          name: input.name
        });

        const user = await User.findById(currentUser.id);

        user.shoppingLists = user.shoppingLists.concat(shoppingList);

        await user.save();

        return await shoppingList.save();
      } catch (error) {
        handleError(error);
      }
    },

    addItem: async ({ shoppingListId, content }) => {
      try {
        const shoppingList = await this.findById(shoppingListId);

        authorizeUserForShoppingList(currentUser, shoppingList);

        const newItem = { content, checked: false };

        shoppingList.items.create(newItem);

        return await shoppingList.save();
      } catch (error) {
        handleError(error);
      }
    },

    checkUncheckItem: async ({ shoppingListId, itemId }) => {
      try {
        const shoppingList = await this.findById(shoppingListId);

        authorizeUserForShoppingList(currentUser, shoppingList);

        const item = shoppingList.items.id(itemId);

        item.checked = !item.checked;

        return await shoppingList.save();
      } catch (error) {
        handleError(error);
      }
    },

    checkAllItems: async ({ shoppingListId }) => {
      try {
        const shoppingList = await this.findById(shoppingListId);

        authorizeUserForShoppingList(currentUser, shoppingList);

        shoppingList.items = shoppingList.items.map(
          item => (item.checked = true)
        );

        return await shoppingList.save();
      } catch (error) {
        handleError(error);
      }
    },

    deleteItem: async ({ shoppingListId, itemId }) => {
      try {
        const shoppingList = await this.findById(shoppingListId);

        authorizeUserForShoppingList(currentUser, shoppingList);

        shoppingList.items.id(itemId).remove();

        return await shoppingList.save();
      } catch (error) {
        handleError(error);
      }
    },

    deleteShoppingList: async ({ shoppingListId }) => {
      try {
        const shoppingList = await this.findById(shoppingListId);

        authorizeUserForShoppingList(currentUser, shoppingList);

        await shoppingList.remove();
      } catch (error) {
        handleError(error);
      }
    }
  };
};

module.exports = mongoose.model('ShoppingList', shoppingListSchema);
