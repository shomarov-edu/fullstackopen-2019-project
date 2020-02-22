const { ApolloError } = require('apollo-server');
const logger = require('../config/winston');

const handleError = error => {
  if (error.name === 'MongooseServerSelectionError') {
    console.log('CATCHED!');
    throw new ApolloError('Internal Server Error');
  }
  logger.error(error);
};

module.exports = { handleError };
