const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError, ForbiddenError } = require('apollo-server');

const encryptPassword = async password => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const comparePasswords = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};

const getUser = async tokenWithBearer => {
  try {
    const token = tokenWithBearer.substring(7);
    return jwt.verify(token, process.env.SECRET);
  } catch (error) {
    throw new AuthenticationError('invalid token');
  }
};

const isAuthenticated = (currentUser, func) => {
  if (!currentUser) throw new ForbiddenError('forbidden');

  return func;
};

const isAdmin = (currentUser, func) => {
  if (!currentUser || !currentUser.role === 'ADMIN')
    throw new ForbiddenError('forbidden');

  return func;
};

const isModerator = (currentUser, func) => {
  if (!currentUser || !currentUser.role === 'MODERATOR')
    throw new ForbiddenError('forbidden');

  return func;
};

const authorizeUserForShoppingList = (currentUser, shoppingList) => {
  if (
    shoppingList.owner !== currentUser.id ||
    !shoppingList.sharedWith.includes(currentUser.id)
  ) {
    throw new ForbiddenError('forbidden');
  }
};

//TODO: Write permissions helper functions

const isRecipeAuthor = () => {};
const isCommentAuthor = () => {};
const isShoppingListOwner = () => {};
const haveShoppingListPermissions = () => {};

module.exports = {
  encryptPassword,
  comparePasswords,
  getUser,
  isAuthenticated,
  isAdmin,
  isModerator,
  authorizeUserForShoppingList
};
