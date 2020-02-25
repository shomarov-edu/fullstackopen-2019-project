require('dotenv').config();
const server = require('./config/apollo');
const logger = require('./config/winston');

server.listen().then(({ url }) => {
  logger.info(`🚀  Server ready at ${url}`);
});
