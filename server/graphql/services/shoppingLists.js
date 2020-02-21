const ShoppingList = require('../../models/shoppingList');
const User = require('../../models/user');
const errorHandler = require('../../helpers/errorHandler');

const getByUserId = async id => {
  try {
    const user = await User.findById(id).populate('shoppingLists');
    return user.shoppingLists;
  } catch (error) {
    errorHandler.handleError(error);
  }
};

module.exports = { getByUserId };
