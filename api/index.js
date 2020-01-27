require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const Recipe = require('./models/recipe')

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

/*//UNCOMMENT TO INIT DB
Recipe.collection.drop()

initialRecipes.forEach(async element => {
  let recipeObject = new Recipe(element)
  await recipeObject.save()
})**/

app.get('/api/recipes', async (request, response) => {
  const recipes = await Recipe.find({})
  response.json(recipes.map(recipe => recipe.toJSON()))
})

app.get('/api/recipes/:id', async (request, response, next) => {
  const id = request.params.id.toString()

  try {
    const recipe = await Recipe.findById(id)
    if (recipe) {
      response.json(recipe.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (e) {
    next(e)
  }
})

app.post('/api/recipes', async (request, response) => {
  const body = request.body
  if (!body.title) {
    return response.status(400).json({ error: 'content missing' })
  }

  const recipe = new Recipe({
    title: body.title,
    description: body.description,
    time: body.time,
    difficulty: body.difficulty,
    ingredients: body.ingredients,
    instructions: body.instructions,
    notes: body.notes,
    source: body.source,
    date: new Date()
  })

  const savedRecipe = await recipe.save()
  response.send(savedRecipe.toJSON())
})

app.put('/api/recipes/:id', async (request, response, next) => {
  const body = request.body
  const id = request.params.id

  const recipe = {
    title: body.title,
    description: body.description,
    time: body.time,
    difficulty: body.difficulty,
    ingredients: body.ingredients,
    instructions: body.instructions,
    notes: body.notes,
    source: body.source
  }

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, recipe, {
      new: true
    })
    if (updatedRecipe) {
      response.json(updatedRecipe.toJSON())
    } else {
      response.sendStatus(404).send()
    }
  } catch (e) {
    next(e)
  }
})

app.delete('/api/recipes/:id', async (request, response, next) => {
  const id = request.params.id

  try {
    await Recipe.findByIdAndDelete(id)
    response.sendStatus(204).end()
  } catch (e) {
    next(e)
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformed id' })
  }

  next(error)
}

app.use(errorHandler)

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
