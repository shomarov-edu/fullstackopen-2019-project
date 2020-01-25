require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const data = require('./db.json')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  // eslint-disable-next-line no-unused-vars
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const requestLogger = (request, response, next) => {
  console.log('---')
  console.log('Method: ', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('---')
  next()
}

app.use(cors())
app.use(bodyParser.json())
app.use(requestLogger)

let recipes = data.recipes

app.get('/api/recipes', (request, response) => {
  response.json(recipes)
})

app.get('/api/recipes/:id', (request, response) => {
  const id = Number(request.params.id)
  const recipe = recipes.find(r => r.id === id)
  if (!recipe) {
    return response.status(404).json({ error: 'not found' })
  }
  response.json(recipe)
})

app.post('/api/recipes', (request, response) => {
  if (!request.body.title) {
    return response.status(400).json({ error: 'content missing' })
  }

  const recipe = request.body
  recipes = recipes.concat(recipe)
  response.json(recipe)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
