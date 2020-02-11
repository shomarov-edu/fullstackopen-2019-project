const recipesRouter = require('express').Router()
const recipesController = require('../controllers/recipesController')

recipesRouter.get('/', recipesController.getAll)
recipesRouter.get('/:recipeId', recipesController.getOne)
recipesRouter.post('/', recipesController.create)
recipesRouter.post('/:recipeId', recipesController.update)
recipesRouter.post('/:recipeId', recipesController.deleteOne)

module.exports = recipesRouter
