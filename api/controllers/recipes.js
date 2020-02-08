const recipesRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Recipe = require('../models/recipe')
const User = require('../models/user')

recipesRouter.get('/', async (request, response) => {
  const recipes = await Recipe.find({})
    .populate('User')
    .populate({
      path: 'comments.author',
      model: 'User'
    })
  response.json(recipes.map(recipe => recipe.toJSON()))
})

recipesRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id.toString()

  try {
    const recipe = await Recipe.findById(id)
      .populate('User')
      .populate({
        path: 'comments.author',
        model: 'User'
      })
    if (recipe) {
      response.json(recipe.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (e) {
    next(e)
  }
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

recipesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, process.env.SECRET)

  try {
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

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
      author: user._id
    })

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

  const oldRecipe = await Recipe.findById(id)
  console.log(oldRecipe.comments)
  console.log(body.comments)

  const recipe = {
    title: body.title,
    description: body.description,
    time: body.time,
    difficulty: body.difficulty,
    ingredients: body.ingredients,
    instructions: body.instructions,
    notes: body.notes,
    source: body.source,
    comments: body.comments
  }

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, recipe, {
      new: true
    })
      .populate('User')
      .populate({
        path: 'comments.author',
        model: 'User'
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
