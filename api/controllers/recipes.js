const recipesRouter = require('express').Router()
const Recipe = require('../models/recipe')
const User = require('../models/user')

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

recipesRouter.post('/', async (request, response, next) => {
  const body = request.body

  console.log('userId', body.userId)
  const user = await User.findById(body.userId)

  const recipe = new Recipe({
    title: body.title,
    description: body.description,
    time: body.time,
    difficulty: body.difficulty,
    ingredients: body.ingredients,
    instructions: body.instructions,
    notes: body.notes,
    source: body.source,
    date: new Date(),
    user: user._id
  })

  try {
    const savedRecipe = await recipe.save()
    user.recipes = user.recipes.concat(savedRecipe._id)
    await user.save()
    response.send(savedRecipe.toJSON())
  } catch (e) {
    next(e)
  }
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
