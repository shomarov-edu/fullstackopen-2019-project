const { ApolloError } = require('apollo-server');
const logger = require('../config/winston');

const handleError = error => {
  logger.error(error);
  if (error.name === 'MongooseServerSelectionError') {
    console.log('CATCHED!');
    throw new ApolloError('Internal Server Error');
  }
};

module.exports = { handleError };
