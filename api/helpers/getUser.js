const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

const getUser = async tokenWithBearer => {
  try {
    const token = tokenWithBearer.substring(7);
    return jwt.verify(token, process.env.SECRET);
  } catch (error) {
    console.log(error);
    throw new AuthenticationError('invalid token');
  }
};

module.exports = getUser;
