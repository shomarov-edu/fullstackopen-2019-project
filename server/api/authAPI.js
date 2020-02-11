const authRouter = require('express').Router()
const authController = require('../controllers/authController')

authRouter.post('/login', authController.login)

// TODO: logout

module.exports = authRouter
