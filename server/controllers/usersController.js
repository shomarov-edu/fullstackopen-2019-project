const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const usersService = require('../services/usersService')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const baseUrl = '/api/users'

const getAll = async (request, response) => {
  try {
    const users = usersService.getAll()
    response.json(users)
  } catch (e) {
    console.log(e)
  }
}

const getOne = async (request, response) => {
  try {
    const user = usersService.getOne(request.params.username)

    response.json(user)
  } catch (e) {
    console.log(e)
  }
}

const create = async (request, response, next) => {
  try {
    const { userData } = request.body

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

const update = async (request, response, next) => {}

const deleteOne = async (request, response, next) => {}

module.exports = { getAll, getOne, create, update, deleteOne }
