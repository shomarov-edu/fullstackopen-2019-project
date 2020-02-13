const ShoppingList = require('../models/shoppingList')
const User = require('../models/user')

const getAll = async () => {
  try {
    return await ShoppingList.find({}).populate('owner')
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getOne = async id => {
  try {
    return await ShoppingList.findById(id).populate('owner')
  } catch (e) {
    console.log(e)
    throw e
  }
}

const create = async (userId, shoppingListData) => {
  try {
    const user = await User.findById(userId)

    const shoppingList = new ShoppingList({
      ...shoppingListData,
      owner: userId
    })

    const savedShoppingList = await shoppingList.save().populate('owner')

    user.shoppingLists = user.shoppingLists.concat(savedShoppingList._id)

    await user.save()
    return savedShoppingList
  } catch (e) {
    console.log(e)
    throw e
  }
}

const update = async (id, shoppingListData) => {
  try {
    const shoppingList = {
      items: shoppingListData.items
    }

    const updatedShoppingList = await ShoppingList.findByIdAndUpdate(
      id,
      shoppingList,
      { new: true }
    ).populate('owner')

    return updatedShoppingList
  } catch (e) {
    console.log(e)
    throw e
  }
}

const remove = async id => {
  try {
    await ShoppingList.findByIdAndRemove(id)
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports = { getAll, getOne, create, update, remove }
