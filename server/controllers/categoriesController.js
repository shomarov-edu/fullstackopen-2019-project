const categoriesService = require('../services/categoriesService')

const getAll = async (request, response, next) => {
  try {
    const categories = await categoriesService.getAll(request.user.id)

    response.json(categories)
  } catch (e) {
    next(e)
  }
}

const getOne = async (request, response, next) => {
  try {
    const category = await categoriesService.getOne(request.params.id)

    response.json(category)
  } catch (e) {
    next(e)
  }
}

const create = async (request, response, next) => {
  const categoryData = request.body

  try {
    const newCategory = await categoriesService.create(
      request.user.id,
      categoryData
    )

    response.json(newCategory)
  } catch (e) {
    next(e)
  }
}

const update = async (request, response, next) => {
  const categoryData = request.body

  try {
    const updatedCategory = await categoriesService.update(
      request.params.id,
      categoryData
    )

    response.json(updatedCategory)
  } catch (e) {
    next(e)
  }
}

const remove = async (request, response, next) => {
  console.log(request.params.id)
  try {
    await categoriesService.remove(request.params.id)
    response.sendStatus(204)
  } catch (e) {
    next(e)
  }
}

module.exports = { getAll, getOne, create, update, remove }
