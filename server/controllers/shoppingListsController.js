const shoppingListService = require('../services/shoppingListsService');

const getAll = async (request, response, next) => {
  try {
    const shoppingLists = await shoppingListService.getAll();
    response.json(shoppingLists);
  } catch (error) {
    next(error);
  }
};

const getOne = async (request, response, next) => {
  try {
    const shoppingList = await shoppingListService.getOne(request.params.id);
    response.json(shoppingList);
  } catch (error) {
    next(error);
  }
};

const create = async (request, response, next) => {
  const shoppingListData = request.body;

  try {
    const savedShoppingList = await shoppingListService.create(
      request.user.id,
      shoppingListData
    );
    response.json(savedShoppingList);
  } catch (error) {
    next(error);
  }
};

const update = async (request, response, next) => {
  const shoppingListData = request.body;

  try {
    const updatedShoppingList = await shoppingListService.update(
      request.user.id,
      shoppingListData
    );
    response.json(updatedShoppingList);
  } catch (error) {
    next(error);
  }
};

const remove = async (request, response, next) => {
  try {
    await shoppingListService.remove(request.params.id);
    response.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getOne, create, update, remove };
