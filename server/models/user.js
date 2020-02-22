const mongoose = require('mongoose');
const Category = require('./category');
const ShoppingList = require('./shoppingList');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  firstname: String,
  lastname: String,
  passwordHash: String,
  role: {
    type: String,
    required: true
  },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    }
  ],
  categories: [Category.schema],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  shoppingLists: [ShoppingList.schema]
});

module.exports = mongoose.model('User', userSchema);
