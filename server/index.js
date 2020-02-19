require('dotenv').config();
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const schema = require('./graphql/schema');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

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

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
