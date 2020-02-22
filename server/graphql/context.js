const auth = require('./services/auth');
const { getUser } = require('../helpers/authHelper');
const { generateUserService } = require('./services/users');
const { generateRecipeService } = require('./services/recipes');
const { generateCategoryService } = require('./services/categories');
const { generateShoppingListService } = require('./services/shoppingLists');

const context = async ({ req }) => {
  const tokenWithBearer = req.headers.authorization || '';

  const currentUser = tokenWithBearer ? await getUser(tokenWithBearer) : null;

  return {
    currentUser,
    services: {
      auth,
      users: generateUserService(currentUser),
      recipes: generateRecipeService(currentUser),
      categories: generateCategoryService(currentUser),
      shoppingLists: generateShoppingListService(currentUser)
    }
  };
};

module.exports = context;
