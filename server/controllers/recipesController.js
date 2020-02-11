const jwt = require('jsonwebtoken')
const recipesService = require('../services/recipesService')

const getAll = async (request, response) => {
  try {
    const allRecipes = recipesService.getAll()
    response.json(allRecipes)
  } catch (e) {
    console.log(e)
  }
}

const getOne = async (request, response, next) => {
  const id = request.params.id.toString()

  try {
    const recipe = recipesService.getOne(id)
    if (recipe) {
      response.json(recipe.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (e) {
    next(e)
  }
}

const create = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const recipeData = request.body

  try {
    const savedRecipe = await recipesService.create(decodedToken, recipeData)
    response.send(savedRecipe)
  } catch (e) {
    next(e)
  }
}

const update = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const id = request.params.id
  const recipeData = request.body

  try {
    const updatedRecipe = await recipesService.update(id, recipeData)
    if (updatedRecipe) {
      response.json(updatedRecipe.toJSON())
    } else {
      response.sendStatus(404).send()
    }
  } catch (e) {
    next(e)
  }
}

const deleteOne = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const id = request.params.id

  try {
    await recipesService.deleteOne(id)
    response.sendStatus(204).end()
  } catch (e) {
    next(e)
  }
}

module.exports = { getAll, getOne, create, update, deleteOne }
