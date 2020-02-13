const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const encryptPassword = async password => {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

const comparePasswords = async (password, hash) => {
  try {
    const passwordCorrect = await bcrypt.compare(password, hash)
    console.log(passwordCorrect)
    return passwordCorrect
  } catch (e) {
    console.log(e)
    throw e
  }
}

const login = async credentials => {
  try {
    const user = await User.findOne({ username: credentials.username })

    const passwordCorrect =
      user === null
        ? false
        : await comparePasswords(credentials.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      throw new Error('invalid username or password')
    }

    const userForToken = {
      id: user.id,
      username: user.username
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    return { id: user.id, username: user.username, token }
  } catch (e) {
    console.log(e)
    throw e
  }
}

const changePassword = async (id, oldPassword, newPassword) => {
  try {
    const user = await User.findById(id)
    console.log(user)

    console.log(oldPassword)
    console.log(user.passwordHash)

    const passwordCorrect =
      user === null
        ? false
        : await comparePasswords(oldPassword, user.passwordHash)

    if (!(user && passwordCorrect)) {
      throw new Error('wrong password')
    }

    user.passwordHash = await encryptPassword(newPassword)

    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true
    }).populate('recipes')
    console.log(updatedUser)
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports = { encryptPassword, comparePasswords, login, changePassword }
