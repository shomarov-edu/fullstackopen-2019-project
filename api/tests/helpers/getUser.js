const jwt = require('jsonwebtoken');

const getUser = async token => {
  return jwt.verify(token, process.env.SECRET);
};

module.exports = getUser;
