const { ApolloError } = require('apollo-server');
const winston = require('../config/winston');

const handleError = error => {
  winston.error(error);
  if (error.name === 'MongooseServerSelectionError') {
    console.log('CATCHED!');
    throw new ApolloError('Internal Server Error');
  }
};

module.exports = { handleError };
