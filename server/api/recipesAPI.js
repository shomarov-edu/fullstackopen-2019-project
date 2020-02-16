const jwt = require('express-jwt');
const recipesRouter = require('express').Router();
const recipesController = require('../controllers/recipesController');
const cors = require('cors');

recipesRouter.get('/', recipesController.getAll);
recipesRouter.get('/:recipeId', recipesController.getOne);
recipesRouter.post(
  '/',
  jwt({ secret: process.env.SECRET }),
  recipesController.create
);
recipesRouter.post(
  '/:recipeId',
  jwt({ secret: process.env.SECRET }),
  recipesController.update
);
recipesRouter.delete(
  '/:recipeId',
  jwt({ secret: process.env.SECRET }),
  recipesController.deleteOne
);

module.exports = recipesRouter;
