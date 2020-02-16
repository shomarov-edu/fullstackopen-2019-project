const authService = require('../services/authService');

const login = async (request, response, next) => {
  const credentials = {
    username: request.body.username,
    password: request.body.password
  };

  try {
    const token = await authService.login(credentials);
    response.status(200).send(token);
  } catch (error) {
    next(error);
  }
};

const changePassword = async (request, response, next) => {
  try {
    await authService.changePassword(
      request.user.id,
      request.body.oldPassword,
      request.body.newPassword
    );
    return response.status(200).send('OK');
  } catch (error) {
    next(error);
  }
};

module.exports = { login, changePassword };
