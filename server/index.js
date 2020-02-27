require('dotenv').config();
const apollo = require('./config/apollo');
const winston = require('./config/winston');

apollo.listen().then(({ url }) => {
  winston.info(`🚀  Server ready at ${url}`);
});
