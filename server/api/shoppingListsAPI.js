const shoppingListsRouter = require('express').Router()
const shoppingListsController = require('../controllers/shoppingListsController')

shoppingListsRouter.get(shoppingListsController.getAll)
shoppingListsRouter.get('/:recipeId', shoppingListsController.getOne)
shoppingListsRouter.post(shoppingListsController.create)
shoppingListsRouter.post(shoppingListsController.modify)

module.exports = shoppingListsRouter
