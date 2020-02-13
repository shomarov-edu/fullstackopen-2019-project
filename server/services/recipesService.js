const Recipe = require('../models/recipe')
const User = require('../models/user')

const getAll = async () => {
  try {
    return await Recipe.find({})
      .populate('author')
      .populate({
        path: 'comments.author',
        model: 'User'
      })
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getOne = async id => {
  try {
    const recipe = await Recipe.findById(id)
      .populate('User')
      .populate({
        path: 'comments.author',
        model: 'User'
      })

    return recipe
  } catch (e) {
    console.log(e)
    throw e
  }
}

const create = async (auth, recipeData) => {
  try {
    const user = await User.findById(auth.id)

    console.log(auth)

    const recipe = new Recipe({
      author: user._id,
      title: recipeData.title,
      description: recipeData.description,
      cookTime: recipeData.time,
      difficulty: recipeData.difficulty,
      ingredients: recipeData.ingredients,
      method: recipeData.method,
      notes: recipeData.notes,
      tags: recipeData.tags,
      source: recipeData.source,
      date: new Date()
    })

    const savedRecipe = await recipe.save().populate('author')
    console.log(savedRecipe)
    user.recipes = user.recipes.concat(savedRecipe._id)
    await user.save()
    return savedRecipe
  } catch (e) {
    console.log(e)
    throw e
  }
}

const update = async (id, recipeData) => {
  try {
    const recipe = {
      title: recipeData.title,
      description: recipeData.description,
      cookTime: recipeData.time,
      difficulty: recipeData.difficulty,
      ingredients: recipeData.ingredients,
      method: recipeData.method,
      notes: recipeData.notes,
      tags: recipeData.tags,
      source: recipeData.source,
      comments: recipeData.comments,
      likes: recipe.likes,
      ratings: recipe.ratings
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(id, recipe, {
      new: true
    })
      .populate('User')
      .populate({
        path: 'comments.author',
        model: 'User'
      })

    return updatedRecipe
  } catch (e) {
    console.log(e)
    throw e
  }
}

const deleteOne = async id => {
  try {
    await Recipe.findByIdAndDelete(id)
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports = { getAll, getOne, create, update, deleteOne }
