const Category = require('../models/category')
const User = require('../models/user')

const getAll = async userId => {
  try {
    return await Category.find({ user: userId }).populate('recipes')
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getOne = async id => {
  try {
    return await Category.findById(id).populate('recipes')
  } catch (e) {
    console.log(e)
    throw e
  }
}

const create = async (userId, categoryData) => {
  try {
    const user = await User.findById(userId)

    const category = new Category({ ...categoryData, user: userId })

    const savedCategory = await category.save().populate('recipes')
    user.categories = user.categories.concat(savedCategory._id)
    await user.save()
    return savedCategory
  } catch (e) {
    console.log(e)
    throw e
  }
}

const update = async (id, categoryData) => {
  try {
    const category = {
      title: categoryData.title,
      recipes: categoryData.recipes
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, category, {
      new: true
    }).populate('recipes')
    return updatedCategory
  } catch (e) {
    console.log(e)
    throw e
  }
}

const remove = async id => {
  try {
    await Category.findByIdAndRemove(id)
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports = { getAll, getOne, create, update, remove }
