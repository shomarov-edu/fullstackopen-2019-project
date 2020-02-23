require('dotenv').config();
const mongoose = require('mongoose');
const options = require('./config/mongoose');
const server = require('./config/apollo');
const { handleError } = require('./helpers/errorHandler');
const logger = require('./config/winston');

logger.info('connecting to', process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI, options)
  .catch(error => handleError(error));

mongoose.connection.on('error', error => {
  logger.error(error);
});

server.listen().then(({ url }) => {
  logger.info(`🚀  Server ready at ${url}`);
});
