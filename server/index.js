require('dotenv').config();
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const schema = require('./graphql/schema');

console.log('connecting to', process.env.MONGODB_URI);

try {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
  console.log('connected to MongoDB');
} catch (error) {
  console.log('error connecting to MongoDB:', error.message);
}

mongoose.connection.on('error', error => {
  console.log(error);
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

var glob = require('glob'),
  path = require('path');

glob.sync('./typeDefs/*.js').forEach(function(file) {
  console.log(file);
  require(path.resolve(file));
});
