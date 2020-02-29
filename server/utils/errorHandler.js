const { ApolloError } = require('apollo-server');
const winston = require('../config/winston');

const handleError = error => {
  winston.error(error);
};

module.exports = { handleError };
