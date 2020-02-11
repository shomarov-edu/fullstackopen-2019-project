const categoriesRouter = require('express').Router()
const categoriesController = require('../controllers/categoriesController')

categoriesRouter.get(categoriesController.getAll)
categoriesRouter.get('/:recipeId', categoriesController.getOne)
categoriesRouter.post(categoriesController.create)
categoriesRouter.post(categoriesController.modify)

module.exports = categoriesRouter
