const authService = require('../services/authService')

const login = async (request, response, next) => {
  const credentials = {
    username: request.body.username,
    password: request.body.password
  }

  console.log(credentials)

  try {
    const token = await authService.login(credentials)
    console.log(token)
    response.status(200).send(token)
  } catch (e) {
    next(e)
  }
}

const changePassword = async (request, response, next) => {
  console.log(request.body)
  try {
    await authService.changePassword(
      request.user.id,
      request.body.oldPassword,
      request.body.newPassword
    )
    return response.status(200).send('OK')
  } catch (e) {
    next(e)
  }
}

module.exports = { login, changePassword }
