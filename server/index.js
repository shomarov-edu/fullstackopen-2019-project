require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const db = require('./db.json')

let recipes = db.recipes

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
