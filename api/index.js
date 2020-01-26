require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const Recipe = require('./models/recipe')
const initialRecipes = require('./recipes')

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

Recipe.collection.drop()

initialRecipes.forEach(async element => {
  let recipeObject = new Recipe(element)
  await recipeObject.save()
})

app.get('/api/recipes', async (request, response) => {
  const recipes = await Recipe.find({})
  console.log(recipes)
  response.json(recipes.map(recipe => recipe.toJSON()))
})

app.get('/api/recipes/:id', async (request, response) => {
  const id = Number(request.params.id)
  const recipe = await Recipe.findById(id)
  response.json(recipe)
})

app.post('/api/recipes', (request, response) => {
  if (!request.body.title) {
    return response.status(400).json({ error: 'content missing' })
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
