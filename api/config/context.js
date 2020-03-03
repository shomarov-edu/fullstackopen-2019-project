const auth = require('../services/authentication');
const { generateUserModel } = require('../models/User');
const { generateRecipeModel } = require('../models/Recipe');
const loaders = require('./loaders');
const getUser = require('../helpers/getUser');

const context = async ({ req }) => {
  const tokenWithBearer = req.headers.authorization || '';

  const currentUser = tokenWithBearer ? await getUser(tokenWithBearer) : null;

  return {
    auth,
    currentUser,
    models: {
      User: generateUserModel(currentUser),
      Recipe: generateRecipeModel(currentUser)
    },
    loaders: loaders()
  };
};

module.exports = context;
