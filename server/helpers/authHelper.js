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
    return await jwt.verify(token, process.env.SECRET);
  } catch (error) {
    throw new AuthenticationError('invalid token');
  }
};

const isAdmin = (currentUser, func) => {
  console.log(currentUser);
  if (!currentUser || !currentUser.roles.includes('ADMIN'))
    throw new ForbiddenError('forbidden');

  return func;
};

module.exports = { encryptPassword, comparePasswords, getUser };
