const Recipe = require('../models/recipe')
const recipesService = require('../services/recipesService')

const getAll = async (request, response) => {
  try {
    const allRecipes = await recipesService.getAll()
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
  const recipeData = request.body

  try {
    const savedRecipe = await recipesService.create(request.user, recipeData)
    response.send(savedRecipe)
  } catch (e) {
    next(e)
  }
}

const update = async (request, response, next) => {
  const id = request.params.id
  const recipeData = request.body

  try {
    const recipe = await Recipe.findById(request.id)

    if (recipe.author.toString() !== request.user.id) {
      return response.status(403).end()
    }

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
  const id = request.params.id

  try {
    const recipe = await Recipe.findById(request.id)

    if (recipe.author.toString() !== request.user.id) {
      return response.status(403).end()
    }

    await recipesService.deleteOne(id)
    response.sendStatus(204).end()
  } catch (e) {
    next(e)
  }
}

module.exports = { getAll, getOne, create, update, deleteOne }
