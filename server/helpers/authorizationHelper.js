const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

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

//TODO: Write permissions helper functions

module.exports = {
  encryptPassword,
  comparePasswords,
  getUser
};
