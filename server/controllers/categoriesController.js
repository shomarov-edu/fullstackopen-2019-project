const categoriesService = require('../services/categoriesService');

const getAll = async (request, response, next) => {
  try {
    const categories = await categoriesService.getAll(request.user.id);

    response.json(categories);
  } catch (error) {
    next(error);
  }
};

const getOne = async (request, response, next) => {
  try {
    const category = await categoriesService.getOne(request.params.id);

    response.json(category);
  } catch (error) {
    next(error);
  }
};

const create = async (request, response, next) => {
  const categoryData = request.body;

  try {
    const newCategory = await categoriesService.create(
      request.user.id,
      categoryData
    );

    response.json(newCategory);
  } catch (error) {
    next(error);
  }
};

const update = async (request, response, next) => {
  const categoryData = request.body;

  try {
    const updatedCategory = await categoriesService.update(
      request.params.id,
      categoryData
    );

    response.json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

const remove = async (request, response, next) => {
  try {
    await categoriesService.remove(request.params.id);
    response.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getOne, create, update, remove };
