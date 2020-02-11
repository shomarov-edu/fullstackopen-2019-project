const usersRouter = require('express').Router()
const userController = require('../controllers/usersController')

usersRouter.get('/', userController.getAll)
usersRouter.get('/:username', userController.getOne)
usersRouter.post('/', userController.create)
usersRouter.post('/:username', userController.update)
usersRouter.post('/:username', userController.deleteOne)

module.exports = usersRouter
