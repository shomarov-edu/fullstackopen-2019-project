const recipesRouter = require('express').Router()
const Recipe = require('../models/recipe')

recipesRouter.get('/', async (request, response) => {
  const recipes = await Recipe.find({})
  response.json(recipes.map(recipe => recipe.toJSON()))
})

recipesRouter.get('/:id', async (request, response, next) => {
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

recipesRouter.post('/', async (request, response) => {
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

recipesRouter.put('/:id', async (request, response, next) => {
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

recipesRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id

  try {
    await Recipe.findByIdAndDelete(id)
    response.sendStatus(204).end()
  } catch (e) {
    next(e)
  }
})

module.exports = recipesRouter
