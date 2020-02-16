require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./api/authAPI');
const usersRouter = require('./api/usersAPI');
const recipesRouter = require('./api/recipesAPI');
const categoriesRouter = require('./api/categoriesAPI');
const errorHandler = require('./middleware/errorHandler');
const middleware = require('./middleware/middleware');
const mongoose = require('mongoose');
const morganMiddleware = require('./utils/morgan');
const chalk = require('chalk');

console.log(chalk.blue('Hello world!'));

app.use(cors());

console.log('connecting to', process.env.MONGODB_URI);

try {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  console.log('connected to MongoDB');
} catch (error) {
  console.log('error connecting to MongoDB:', error.message);
}

mongoose.connection.on('error', error => {
  console.log(error);
});

app.use(morganMiddleware);

app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api/categories', categoriesRouter);

app.use(errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
