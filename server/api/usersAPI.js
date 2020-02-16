const jwt = require('express-jwt');
const usersRouter = require('express').Router();
const userController = require('../controllers/usersController');

usersRouter.get('/', userController.getAll);
usersRouter.get('/:username', userController.getOne);
usersRouter.post('/', userController.create);
usersRouter.post(
  '/:username',
  jwt({ secret: process.env.SECRET }),
  userController.update
);
usersRouter.delete(
  '/:username',
  jwt({ secret: process.env.SECRET }),
  userController.deleteOne
);

module.exports = usersRouter;
