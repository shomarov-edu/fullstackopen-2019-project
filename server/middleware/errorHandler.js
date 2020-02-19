const logger = require('../utils/winston');

const errorHandler = (error, request, response, next) => {
  logger.error(error);
  logger.warn(error);
  logger.info(error);
  logger.http(error);
  logger.verbose(error);
  logger.debug(error);
  logger.silly(error);
  logger.silly('silly');

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformed id' });
  } else if (error.httpStatusCode) {
    logger.http(error);
    return response
      .status(error.httpStatusCode)
      .send({ error: error.description });
  }
  next(error);
};

module.exports = errorHandler;
