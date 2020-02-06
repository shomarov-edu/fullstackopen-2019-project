const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const baseUrl = '/api/users'

usersRouter.get(baseUrl, async (request, response) => {
  const users = await User.find({}).populate('recipes')
  response.json(users.map(user => user.toJSON()))
})

usersRouter.get(`${baseUrl}/:username`, async (request, response) => {
  console.log('request received')
  const user = await User.findOne({ username: request.params.username })
  response.json(user.toJSON())
})

usersRouter.post(baseUrl, async (request, response, next) => {
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
      username: body.username,
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

usersRouter.post('/auth/login', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })

  console.log(user)
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response.status(200).send({
    username: user.username,
    id: user._id,
    token
  })
})

module.exports = usersRouter
