const Recipe = require('../models/recipe')
const User = require('../models/user')

const getAll = async () => {
  try {
    const allRecipes = await Recipe.find({})
      .populate('author')
      .populate({
        path: 'comments.author',
        model: 'User'
      })
    return allRecipes
  } catch (e) {
    console.log(e)
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
  }
}

const create = async (decodedToken, recipeData) => {
  try {
    const user = await User.findById(decodedToken.id)

    const recipe = new Recipe({
      author: user._id,
      title: recipeData.title,
      description: recipeData.description,
      cookTime: recipeData.time,
      difficulty: recipeData.difficulty,
      ingredients: recipeData.ingredients,
      method: recipeData.instructions,
      notes: recipeData.notes,
      tags: recipeData.tags,
      source: recipeData.source,
      date: new Date()
    })

    const savedRecipe = await recipe.save()
    user.recipes = user.recipes.concat(savedRecipe._id)
    await user.save()
    return savedRecipe
  } catch (e) {
    console.log(e)
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
      method: recipeData.instructions,
      notes: recipeData.notes,
      tags: recipeData.tags,
      source: recipeData.source,
      comments: recipeData.comments
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
  }
}

const deleteOne = async id => {
  try {
    await Recipe.findByIdAndDelete(id)
  } catch (e) {
    return e
  }
}

module.exports = { getAll, getOne, create, update, deleteOne }
