const jwt = require('express-jwt');
const categoriesRouter = require('express').Router();
const categoriesController = require('../controllers/categoriesController');

categoriesRouter.get(
  '/',
  jwt({ secret: process.env.SECRET }),
  categoriesController.getAll
);
categoriesRouter.get(
  '/:id',
  jwt({ secret: process.env.SECRET }),
  categoriesController.getOne
);
categoriesRouter.post(
  '/',
  jwt({ secret: process.env.SECRET }),
  categoriesController.create
);
categoriesRouter.post(
  '/',
  jwt({ secret: process.env.SECRET }),
  categoriesController.update
);
categoriesRouter.delete(
  '/:id',
  jwt({ secret: process.env.SECRET }),
  categoriesController.remove
);

module.exports = categoriesRouter;
