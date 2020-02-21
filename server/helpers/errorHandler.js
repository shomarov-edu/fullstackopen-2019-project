const logger = require('../config/winston');

const handleError = error => {
  logger.error(error);
};

module.exports = { handleError };
