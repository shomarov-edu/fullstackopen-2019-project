const authService = require('../services/authService')

const login = async (request, response, next) => {
  const credentials = {
    username: request.body.username,
    password: request.body.password
  }

  try {
    const token = await authService.login(credentials)
    response.status(200).send(token)
  } catch (e) {
    next(e)
  }
}

module.exports = { login }
