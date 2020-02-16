const Category = require('../models/category');
const User = require('../models/user');

const getAll = async userId => {
  try {
    return await Category.find({ user: userId }).populate('recipes');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getOne = async id => {
  try {
    return await Category.findById(id).populate('recipes');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const create = async (userId, categoryData) => {
  try {
    const user = await User.findById(userId);

    const category = new Category({ ...categoryData, user: userId });

    const savedCategory = await category.save().populate('recipes');
    user.categories = user.categories.concat(savedCategory._id);
    await user.save();
    return savedCategory;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const update = async (id, categoryData) => {
  try {
    const category = {
      title: categoryData.title,
      recipes: categoryData.recipes
    };

    const updatedCategory = await Category.findByIdAndUpdate(id, category, {
      new: true
    }).populate('recipes');
    return updatedCategory;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const remove = async id => {
  try {
    await Category.findByIdAndRemove(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { getAll, getOne, create, update, remove };
