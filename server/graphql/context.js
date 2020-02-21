const auth = require('./services/auth');
const { getUser } = require('../helpers/authHelper');
const users = require('./services/users');
const recipes = require('./services/recipes');
const categories = require('./services/categories');
const shoppingLists = require('./services/shoppingLists');

const context = async ({ req }) => {
  const tokenWithBearer = req.headers.authorization || '';

  const user = tokenWithBearer ? await getUser(tokenWithBearer) : null;

  return {
    user,
    services: {
      auth,
      users: users.generateUserService(),
      recipes: recipes.generateRecipeService(),
      categories,
      shoppingLists
    }
  };
};

module.exports = context;
