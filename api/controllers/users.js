const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const validator = require('validator')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    if (!validator.isEmail(body.email)) {
      return response.status(400).json({ error: 'invalid email' })
    }

    if (body.password.length < 8) {
      return response.status(400).json({ error: 'password too short' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (e) {
    next(e)
  }
})

module.exports = usersRouter
