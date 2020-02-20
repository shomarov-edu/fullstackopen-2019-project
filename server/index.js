require('dotenv').config();
const mongoose = require('mongoose');
const options = require('./config/mongoose');
const server = require('./config/apollo');

const logger = require('./config/winston');

logger.info('connecting to', process.env.MONGODB_URI);

try {
  mongoose.connect(process.env.MONGODB_URI, options);
  console.log('connected to MongoDB');
} catch (error) {
  console.log('error connecting to MongoDB:', error.message);
}

mongoose.connection.on('error', error => {
  console.log(error);
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
