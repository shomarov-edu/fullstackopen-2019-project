const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const authRouter = require('./api/authAPI')
const usersRouter = require('./api/usersAPI')
const recipesRouter = require('./api/recipesAPI')
const categoriesRouter = require('./api/categoriesAPI')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

app.use(cors())

console.log('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(middleware.restrictMethods)

app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/recipes', recipesRouter)
app.use('/api/categories', categoriesRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
