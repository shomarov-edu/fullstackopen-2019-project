const jwt = require('express-jwt')
const authRouter = require('express').Router()
const authController = require('../controllers/authController')

authRouter.post('/login', authController.login)
authRouter.post(
  '/password',
  jwt({ secret: process.env.SECRET }),
  authController.changePassword
)

// TODO: logout

module.exports = authRouter
