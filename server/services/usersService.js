const bcrypt = require('bcrypt');
const User = require('../models/user');
const AppError = require('../utils/AppError');

const getAll = async () => {
  try {
    return await User.find({});
  } catch (error) {
    console.log(error);
  }
};

const getOne = async username => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new AppError('another error', 808, 'further explanation');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const create = async userData => {
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(userData.password, saltRounds);

    const user = new User({
      username: userData.username,
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      passwordHash
    });

    const savedUser = await user.save();

    return savedUser;
  } catch (error) {
    return error;
  }
};

const update = async (id, userData) => {
  try {
    const user = {
      username: userData.username,
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      recipes: userData.recipes,
      bookmarks: userData.bookmarks,
      following: userData.following
    };

    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true
    }).populate('recipes');

    return updatedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteOne = async id => {
  try {
    await User.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { getAll, getOne, create, update, deleteOne };
