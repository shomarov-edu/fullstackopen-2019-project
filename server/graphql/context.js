const authorization = require('./authorization');
const { getUser } = require('../helpers/authorizationHelper');
const User = require('../models/user');
const Recipe = require('../models/recipe');
const ShoppingList = require('../models/shoppingList');

const context = async ({ req }) => {
  const tokenWithBearer = req.headers.authorization || '';

  const currentUser = tokenWithBearer ? await getUser(tokenWithBearer) : null;

  return {
    currentUser,
    authorization,
    models: {
      User: User.generateUserModel(currentUser),
      Recipe: Recipe.generateRecipeModel(currentUser),
      ShoppingList: ShoppingList.generateShoppingListModel(currentUser)
    }
  };
};

module.exports = context;
