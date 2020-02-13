const usersService = require('../services/usersService')
const validator = require('validator')

const getAll = async (request, response) => {
  try {
    const users = await usersService.getAll()
    response.json(users)
  } catch (e) {
    console.log(e)
  }
}

const getOne = async (request, response) => {
  try {
    const user = await usersService.getOne(request.params.username)
    response.json(user)
  } catch (e) {
    console.log(e)
  }
}

const create = async (request, response, next) => {
  const userData = request.body

  try {
    if (!validator.isEmail(userData.email)) {
      return response.status(400).json({ error: 'invalid email' })
    }

    if (userData.password.length < 8) {
      return response.status(400).json({ error: 'password too short' })
    }

    const user = await usersService.create(userData)

    response.json(user)
  } catch (e) {
    next(e)
  }
}

const update = async (request, response, next) => {
  if (request.params.username !== request.user.username) {
    return response.status(403).end()
  }

  try {
    const userData = request.body

    console.log(request.user)

    const user = await usersService.update(request.user.id, userData)

    response.status(200).send(user)
  } catch (e) {
    next(e)
  }
}

const deleteOne = async (request, response, next) => {
  if (request.params.username !== request.user.username) {
    return response.sendStatus(403)
  }

  try {
    await usersService.deleteOne(request.user.id)

    response.sendStatus(204)
  } catch (e) {
    next(e)
  }
}

module.exports = { getAll, getOne, create, update, deleteOne }
