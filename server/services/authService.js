const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AppError = require('../helpers/AppError');
const logger = require('../utils/winston');

const encryptPassword = async password => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const comparePasswords = async (password, hash) => {
  try {
    const passwordCorrect = await bcrypt.compare(password, hash);
    return passwordCorrect;
  } catch (error) {
    console.log(error);
  }
};

const login = async credentials => {
  logger.log('http', 'test');
  let user;

  try {
    user = await User.findOne({ username: credentials.username });
  } catch (error) {
    logger.error(error);
  }

  try {
    const passwordCorrect =
      user === null
        ? false
        : await comparePasswords(credentials.password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      throw new AppError(401, 'invalid username or password');
    }

    const userForToken = {
      id: user.id,
      username: user.username
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    return { id: user.id, username: user.username, token };
  } catch (error) {
    logger.log('http', error);
    throw error;
  }
};

const changePassword = async (id, oldPassword, newPassword) => {
  try {
    const user = await User.findById(id);

    const passwordCorrect =
      user === null
        ? false
        : await comparePasswords(oldPassword, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return new Error(401, 'invalid username or password');
    }

    user.passwordHash = await encryptPassword(newPassword);

    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true
    }).populate('recipes');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { encryptPassword, comparePasswords, login, changePassword };
