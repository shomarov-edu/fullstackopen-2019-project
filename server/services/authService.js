const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const login = async credentials => {
  try {
    const user = await User.findOne({ username: credentials.username })

    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(credentials.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      const error = new Error('invalid username or password')
      error.status = 404
      throw error
    }

    const userForToken = {
      username: user.username
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    return { username: user.username, token }
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports = { login }
