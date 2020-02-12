const bcrypt = require('bcrypt')
const authService = require('../services/authService')
const User = require('../models/user')

const getAll = async () => {
  try {
    return await User.find({})
  } catch (e) {
    console.log(e)
  }
}

const getOne = async username => {
  try {
    return await User.findOne({ username })
  } catch (e) {
    console.log(e)
  }
}

const create = async userData => {
  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(userData.password, saltRounds)

    const user = new User({
      username: userData.username,
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      passwordHash
    })

    const savedUser = await user.save()

    return savedUser
  } catch (e) {
    return e
  }
}

const update = async (id, userData) => {
  try {
    const user = {
      username: userData.username,
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      recipes: userData.recipes,
      bookmarks: userData.bookmarks,
      following: userData.following
    }

    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true
    }).populate('recipes')

    console.log(updatedUser)

    return updatedUser
  } catch (e) {
    console.log(e)
    throw e
  }
}

const deleteOne = async id => {
  try {
    await User.findByIdAndDelete(id)
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports = { getAll, getOne, create, update, deleteOne }
