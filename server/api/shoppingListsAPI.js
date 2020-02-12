const jwt = require('express-jwt')
const shoppingListsRouter = require('express').Router()
const shoppingListsController = require('../controllers/shoppingListsController')

shoppingListsRouter.get('/', shoppingListsController.getAll)
shoppingListsRouter.get('/:shoppingListId', shoppingListsController.getOne)
shoppingListsRouter.post('/', shoppingListsController.create)
shoppingListsRouter.post('/:shoppingListId', shoppingListsController.modify)

module.exports = shoppingListsRouter
